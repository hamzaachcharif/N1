import { Link } from "@tanstack/react-router";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-line bg-canvas">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-3">
        <div>
          <p className="font-display text-2xl tracking-[0.16em]">SOLÈNE</p>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted">
            Quiet luxury for warm cities. Pieces cut to last a season — and the next.
            Pay when it arrives.
          </p>
        </div>
        <div>
          <p className="text-[11px] uppercase tracking-[0.2em] text-muted">Atelier</p>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <Link to="/shop" className="hover:underline underline-offset-4">
                The collection
              </Link>
            </li>
            <li>
              <Link to="/lookbook" className="hover:underline underline-offset-4">
                Lookbook
              </Link>
            </li>
            <li>
              <Link to="/checkout" className="hover:underline underline-offset-4">
                Checkout
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="text-[11px] uppercase tracking-[0.2em] text-muted">Delivery</p>
          <p className="mt-4 text-sm leading-relaxed text-muted">
            Cash on delivery. Your courier collects, we pack, a partner ships. No card.
            No account.
          </p>
          <Link
            to="/studio"
            className="mt-6 inline-flex text-[11px] uppercase tracking-[0.18em] text-subtle hover:text-ink"
          >
            Atelier ledger
          </Link>
        </div>
      </div>
      <div className="border-t border-line">
        <p className="mx-auto max-w-6xl px-4 py-5 text-[11px] uppercase tracking-[0.16em] text-subtle sm:px-6">
          Paiement à la livraison · Packed by hand
        </p>
      </div>
    </footer>
  );
}
