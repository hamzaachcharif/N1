import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/cart";
import { formatPrice } from "@/lib/format";
import { getProduct, listProducts } from "@/lib/server/catalog";
import { SIZES } from "@/lib/types";
import { cn } from "@/lib/utils";
import { ProductCard } from "@/components/product/card";

export const Route = createFileRoute("/shop/$slug")({
  loader: async ({ params }) => {
    const [product, all] = await Promise.all([
      getProduct({ data: { slug: params.slug } }),
      listProducts(),
    ]);
    if (!product) throw notFound();
    const related = all.filter((p) => p.slug !== product.slug).slice(0, 4);
    return { product, related };
  },
  component: ProductPage,
});

function ProductPage() {
  const { product, related } = Route.useLoaderData();
  const add = useCart((s) => s.add);
  const colors = product.colors;
  const [color, setColor] = useState(colors[0]?.name ?? "");
  const [size, setSize] = useState<string>("M");

  const variant = useMemo(
    () => product.variants.find((v) => v.color === color && v.size === size),
    [product.variants, color, size],
  );

  const sizeStock = (s: string) =>
    product.variants.find((v) => v.color === color && v.size === s)?.stock ?? 0;

  function onAdd() {
    if (!variant) return;
    if (variant.stock <= 0) {
      toast.error("This size is gone.");
      return;
    }
    add({
      variantId: variant.id,
      productId: product.id,
      slug: product.slug,
      name: product.name,
      image: product.image,
      color: variant.color,
      size: variant.size,
      price: product.price,
    });
    toast.success("Added to your bag");
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <p className="text-[11px] uppercase tracking-[0.2em] text-muted">
        <Link to="/shop" className="hover:text-ink">
          Shop
        </Link>
        <span className="px-2">/</span>
        {product.collection}
      </p>

      <div className="mt-6 grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <div className="aspect-[2/3] overflow-hidden bg-paper md:aspect-[4/5]">
            <img
              src={product.image}
              alt={product.name}
              className="h-full w-full object-cover object-top"
            />
          </div>
        </div>

        <div className="lg:col-span-5 lg:pt-6">
          <h1 className="font-display text-4xl md:text-5xl">{product.name}</h1>
          <p className="mt-2 text-sm text-muted">{product.tagline}</p>
          <p className="mt-4 text-lg tabular-nums">{formatPrice(product.price)}</p>
          <p className="mt-1 text-xs text-subtle">Pay on delivery · no card</p>

          <div className="mt-8">
            <p className="text-[11px] uppercase tracking-[0.18em] text-muted">
              Colour · {color}
            </p>
            <div className="mt-3 flex gap-2">
              {colors.map((c) => (
                <button
                  key={c.name}
                  type="button"
                  aria-label={c.name}
                  onClick={() => setColor(c.name)}
                  className={cn(
                    "size-9 rounded-full border transition-transform duration-150",
                    color === c.name ? "border-ink scale-100" : "border-line",
                  )}
                  style={{ background: c.hex }}
                />
              ))}
            </div>
          </div>

          <div className="mt-8">
            <p className="text-[11px] uppercase tracking-[0.18em] text-muted">Size</p>
            <div className="mt-3 grid grid-cols-5 gap-2">
              {SIZES.map((s) => {
                const stock = sizeStock(s);
                const gone = stock <= 0;
                return (
                  <button
                    key={s}
                    type="button"
                    disabled={gone}
                    onClick={() => setSize(s)}
                    className={cn(
                      "h-11 text-sm border transition-colors",
                      gone && "opacity-30 line-through",
                      size === s && !gone
                        ? "border-ink bg-ink text-foam"
                        : "border-line text-ink hover:border-ink",
                    )}
                  >
                    {s}
                  </button>
                );
              })}
            </div>
            <p className="mt-2 text-xs text-subtle">
              {variant
                ? variant.stock > 0
                  ? `${variant.stock} in the atelier`
                  : "Sold out in this colour"
                : "Choose a size"}
            </p>
          </div>

          <Button
            block
            className="mt-8"
            disabled={!variant || variant.stock <= 0}
            onClick={onAdd}
          >
            Add to bag
          </Button>
          <Link
            to="/checkout"
            className="mt-3 flex h-11 items-center justify-center border border-line text-sm text-ink hover:border-ink"
          >
            Checkout — pay on delivery
          </Link>

          <p className="mt-10 text-sm leading-relaxed text-muted">{product.description}</p>
          <p className="mt-6 text-xs uppercase tracking-[0.16em] text-subtle">Care</p>
          <p className="mt-2 text-sm text-muted">{product.care}</p>
        </div>
      </div>

      {related.length > 0 ? (
        <section className="mt-24">
          <h2 className="font-display text-3xl">Worn with</h2>
          <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}
