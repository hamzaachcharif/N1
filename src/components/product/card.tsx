import { Link } from "@tanstack/react-router";
import type { Product } from "@/lib/types";
import { formatPrice } from "@/lib/format";

export function ProductCard({ product }: { product: Product }) {
  const soldOut = product.totalStock <= 0;
  return (
    <Link
      to="/shop/$slug"
      params={{ slug: product.slug }}
      className="group block"
    >
      <div className="relative aspect-[2/3] overflow-hidden bg-paper">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
        />
        {soldOut ? (
          <span className="absolute left-3 top-3 bg-paper/90 px-2 py-1 text-[10px] uppercase tracking-[0.16em] text-ink">
            Waitlist
          </span>
        ) : null}
      </div>
      <div className="mt-3">
        <p className="font-display text-xl leading-tight">{product.name}</p>
        <div className="mt-1 flex items-baseline justify-between gap-2">
          <p className="text-xs text-muted">{product.collection}</p>
          <p className="shrink-0 text-sm tabular-nums whitespace-nowrap">{formatPrice(product.price)}</p>
        </div>
      </div>
      <div className="mt-2 flex gap-1.5">
        {product.colors.map((c) => (
          <span
            key={c.name}
            title={c.name}
            className="size-2.5 rounded-full border border-line-strong"
            style={{ background: c.hex }}
          />
        ))}
      </div>
    </Link>
  );
}
