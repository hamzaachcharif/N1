import { t as createServerFn } from "./ssr.mjs";
import { a as object, o as string } from "../_libs/zod.mjs";
import { n as getSql, t as createServerRpc } from "./db-yHMdolxU.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/catalog-B54RMqwd.js
function assemble(products, variants) {
	const byProduct = /* @__PURE__ */ new Map();
	for (const row of variants) {
		const list = byProduct.get(row.product_id) ?? [];
		list.push({
			id: row.id,
			productId: row.product_id,
			color: row.color,
			colorHex: row.color_hex,
			size: row.size,
			sku: row.sku,
			stock: Number(row.stock)
		});
		byProduct.set(row.product_id, list);
	}
	return products.map((p) => {
		const vars = byProduct.get(p.id) ?? [];
		const colorMap = /* @__PURE__ */ new Map();
		for (const v of vars) if (!colorMap.has(v.color)) colorMap.set(v.color, {
			name: v.color,
			hex: v.colorHex
		});
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
			totalStock: vars.reduce((n, v) => n + v.stock, 0)
		};
	});
}
var listProducts_createServerFn_handler = createServerRpc({
	id: "2f3cb902609e50ac96044f7e96228fa2f59f70d4c357ba5479010af2a225aea2",
	name: "listProducts",
	filename: "src/lib/server/catalog.ts"
}, (opts) => listProducts.__executeServer(opts));
var listProducts = createServerFn({ method: "GET" }).handler(listProducts_createServerFn_handler, async () => {
	const sql = await getSql();
	return assemble(await sql`
    select id, slug, name, tagline, description, care, price, image, collection, featured
    from products
    order by sort_order, id
  `, await sql`
    select id, product_id, color, color_hex, size, sku, stock
    from variants
    order by id
  `);
});
var getProduct_createServerFn_handler = createServerRpc({
	id: "156b687369b554bbe5eac173a37fb87e373f38706d45f3e72a364fbc9126b6f3",
	name: "getProduct",
	filename: "src/lib/server/catalog.ts"
}, (opts) => getProduct.__executeServer(opts));
var getProduct = createServerFn({ method: "GET" }).validator(object({ slug: string().min(1) })).handler(getProduct_createServerFn_handler, async ({ data }) => {
	const sql = await getSql();
	const products = await sql`
      select id, slug, name, tagline, description, care, price, image, collection, featured
      from products
      where slug = ${data.slug}
      limit 1
    `;
	if (!products[0]) return null;
	return assemble(products, await sql`
      select id, product_id, color, color_hex, size, sku, stock
      from variants
      where product_id = ${products[0].id}
      order by id
    `)[0] ?? null;
});
//#endregion
export { getProduct_createServerFn_handler, listProducts_createServerFn_handler };
