import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { getSql } from "@/lib/db";
import type { Colorway, Product, Variant } from "@/lib/types";

type ProductRow = {
  id: number;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  care: string;
  price: number;
  image: string;
  collection: string;
  featured: boolean;
};

type VariantRow = {
  id: number;
  product_id: number;
  color: string;
  color_hex: string;
  size: string;
  sku: string;
  stock: number;
};

function assemble(products: ProductRow[], variants: VariantRow[]): Product[] {
  const byProduct = new Map<number, Variant[]>();
  for (const row of variants) {
    const list = byProduct.get(row.product_id) ?? [];
    list.push({
      id: row.id,
      productId: row.product_id,
      color: row.color,
      colorHex: row.color_hex,
      size: row.size,
      sku: row.sku,
      stock: Number(row.stock),
    });
    byProduct.set(row.product_id, list);
  }

  return products.map((p) => {
    const vars = byProduct.get(p.id) ?? [];
    const colorMap = new Map<string, Colorway>();
    for (const v of vars) {
      if (!colorMap.has(v.color)) colorMap.set(v.color, { name: v.color, hex: v.colorHex });
    }
    return {
      id: p.id,
      slug: p.slug,
      name: p.name,
      tagline: p.tagline,
      description: p.description,
      care: p.care,
      price: Number(p.price),
      image: p.image,
      collection: p.collection,
      featured: Boolean(p.featured),
      colors: [...colorMap.values()],
      variants: vars,
      totalStock: vars.reduce((n, v) => n + v.stock, 0),
    };
  });
}

export const listProducts = createServerFn({ method: "GET" }).handler(async () => {
  const sql = await getSql();
  const products = await sql<ProductRow>`
    select id, slug, name, tagline, description, care, price, image, collection, featured
    from products
    order by sort_order, id
  `;
  const variants = await sql<VariantRow>`
    select id, product_id, color, color_hex, size, sku, stock
    from variants
    order by id
  `;
  return assemble(products, variants);
});

export const getProduct = createServerFn({ method: "GET" })
  .validator(z.object({ slug: z.string().min(1) }))
  .handler(async ({ data }) => {
    const sql = await getSql();
    const products = await sql<ProductRow>`
      select id, slug, name, tagline, description, care, price, image, collection, featured
      from products
      where slug = ${data.slug}
      limit 1
    `;
    if (!products[0]) return null;
    const variants = await sql<VariantRow>`
      select id, product_id, color, color_hex, size, sku, stock
      from variants
      where product_id = ${products[0].id}
      order by id
    `;
    return assemble(products, variants)[0] ?? null;
  });
