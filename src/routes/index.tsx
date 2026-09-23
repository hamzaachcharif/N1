import { createFileRoute, Link } from "@tanstack/react-router";
import { ProductCard } from "@/components/product/card";
import { listProducts } from "@/lib/server/catalog";
import { formatPrice } from "@/lib/format";

export const Route = createFileRoute("/")({
  loader: () => listProducts(),
  component: Home,
});

function Home() {
  const products = Route.useLoaderData();
  const featured = products.filter((p) => p.featured).slice(0, 4);
  const rest = products.filter((p) => !p.featured).slice(0, 4);

  return (
    <div>
      <section className="relative min-h-[88dvh] overflow-hidden bg-ink">
        <img
          src="/products/hero.jpg"
          alt="Woman in an ivory linen dress walking through a sunlit courtyard"
          className="absolute inset-0 h-full w-full object-cover object-[center_20%]"
        />
        <div className="absolute inset-0 bg-ink/35" />
        <div className="relative mx-auto flex min-h-[88dvh] max-w-6xl flex-col justify-end px-4 pb-16 pt-28 sm:px-6 md:pb-20">
          <div className="stagger-in max-w-xl text-foam">
            <p className="text-[11px] uppercase tracking-[0.28em]">Spring at the atelier</p>
            <h1 className="mt-4 font-display text-5xl leading-[0.95] tracking-tight md:text-7xl">
              Cut for the heat.
              <br />
              Made to last.
            </h1>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-foam/80">
              A small collection of linen, silk and tailoring. Pay when it arrives —
              paiement à la livraison. No card. No account.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/shop"
                className="inline-flex h-11 items-center bg-foam px-6 text-sm font-medium text-ink transition-transform duration-150 active:scale-[0.96]"
              >
                Shop the collection
              </Link>
              <Link
                to="/lookbook"
                className="inline-flex h-11 items-center border border-foam/50 px-6 text-sm text-foam transition-colors hover:bg-foam/10"
              >
                Lookbook
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-[11px] uppercase tracking-[0.22em] text-muted">The edit</p>
            <h2 className="mt-2 font-display text-4xl md:text-5xl">Worn first</h2>
          </div>
          <Link
            to="/shop"
            className="hidden text-[11px] uppercase tracking-[0.2em] text-muted underline-offset-4 hover:text-ink hover:underline sm:inline"
          >
            All pieces
          </Link>
        </div>
        <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-4 md:gap-x-6">
          {featured.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      <section className="border-y border-line bg-paper">
        <div className="mx-auto grid max-w-6xl md:grid-cols-2">
          <div className="relative min-h-[420px] md:min-h-[560px]">
            <img
              src="/products/silk-slip.jpg"
              alt="The silk midi"
              className="absolute inset-0 h-full w-full object-cover object-top"
            />
          </div>
          <div className="flex flex-col justify-center px-6 py-16 md:px-16">
            <p className="text-[11px] uppercase tracking-[0.22em] text-muted">How it works</p>
            <h2 className="mt-3 font-display text-4xl md:text-5xl">
              Order. We pack. You pay the courier.
            </h2>
            <ol className="mt-8 space-y-5 text-sm leading-relaxed text-muted">
              <li>
                <span className="text-ink">01 — Choose size and colour.</span>
                <br />
                Stock updates as pieces sell, so what you see is what we have.
              </li>
              <li>
                <span className="text-ink">02 — Leave a phone and a city.</span>
                <br />
                A delivery partner collects the order from us and brings it to your door.
              </li>
              <li>
                <span className="text-ink">03 — Pay on delivery.</span>
                <br />
                Cash to the courier. They settle with the atelier on their cycle.
                {featured[0] ? ` Pieces from ${formatPrice(featured[0].price)}.` : null}
              </li>
            </ol>
            <Link
              to="/shop"
              className="mt-10 inline-flex h-11 w-fit items-center bg-ink px-6 text-sm text-foam transition-transform duration-150 active:scale-[0.96]"
            >
              Start an order
            </Link>
          </div>
        </div>
      </section>

      {rest.length > 0 ? (
        <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <h2 className="font-display text-4xl">Also in the atelier</h2>
          <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-4 md:gap-x-6">
            {rest.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      ) : null}

      <section className="mx-auto max-w-6xl px-4 pb-8 sm:px-6">
        <div className="grid gap-px bg-line md:grid-cols-3">
          {[
            { title: "Pay on delivery", body: "No card, no prepaid apps. The courier collects." },
            { title: "Sizes that are real", body: "If a size is gone, it is gone. We do not oversell." },
            { title: "Packed by us", body: "Every piece leaves the atelier folded, not stuffed." },
          ].map((item) => (
            <div key={item.title} className="bg-canvas px-6 py-10">
              <p className="font-display text-2xl">{item.title}</p>
              <p className="mt-2 text-sm text-muted">{item.body}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
