import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ProductCard } from "@/components/product/card";
import { listProducts } from "@/lib/server/catalog";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/shop/")({
  loader: () => listProducts(),
  component: ShopPage,
});

function ShopPage() {
  const products = Route.useLoaderData();
  const collections = useMemo(() => {
    const set = new Set(products.map((p) => p.collection));
    return ["All", ...set];
  }, [products]);
  const [filter, setFilter] = useState("All");
  const visible = filter === "All" ? products : products.filter((p) => p.collection === filter);

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <p className="text-[11px] uppercase tracking-[0.22em] text-muted">Collection</p>
      <h1 className="mt-2 font-display text-5xl md:text-6xl">The new season</h1>
      <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted">
        Eight pieces. Linen, silk, and tailoring. Choose a size and a colour —
        we hold what is on the rack, nothing more.
      </p>

      <div className="mt-8 flex flex-wrap gap-2">
        {collections.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setFilter(c)}
            className={cn(
              "h-10 px-4 text-[11px] uppercase tracking-[0.16em] border transition-colors",
              filter === c
                ? "border-ink bg-ink text-foam"
                : "border-line bg-transparent text-muted hover:border-ink hover:text-ink",
            )}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-12 md:grid-cols-3 md:gap-x-6">
        {visible.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}
