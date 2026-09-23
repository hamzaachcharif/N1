import { Link } from "@tanstack/react-router";
import { Minus, Plus, X } from "lucide-react";
import { cartCount, cartTotal, useCart } from "@/lib/cart";
import { formatPrice } from "@/lib/format";

export function CartDrawer() {
  const { items, open, setOpen, setQty, remove } = useCart();
  const count = cartCount(items);
  const total = cartTotal(items);

  return (
    <>
      <button
        type="button"
        className={`fixed inset-0 z-50 bg-ink/30 transition-opacity duration-250 ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={() => setOpen(false)}
        aria-label="Close bag"
        tabIndex={open ? 0 : -1}
      />
      <aside
        className={`fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col bg-paper shadow-xl transition-transform duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
        aria-hidden={!open}
        aria-label="Shopping bag"
      >
        <div className="flex h-16 items-center justify-between border-b border-line px-5">
          <p className="text-xs uppercase tracking-[0.2em]">
            Bag {count > 0 ? `· ${count}` : ""}
          </p>
          <button
            type="button"
            className="flex size-11 items-center justify-center"
            onClick={() => setOpen(false)}
            aria-label="Close bag"
          >
            <X className="size-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-6">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <p className="font-display text-3xl">Your bag is empty</p>
              <p className="mt-2 text-sm text-muted">The new season is waiting.</p>
              <Link
                to="/shop"
                onClick={() => setOpen(false)}
                className="mt-8 inline-flex h-11 items-center bg-ink px-6 text-sm font-medium text-foam transition-transform duration-150 active:scale-[0.96]"
              >
                Shop the collection
              </Link>
            </div>
          ) : (
            <ul className="space-y-6">
              {items.map((item) => (
                <li key={item.variantId} className="flex gap-4">
                  <Link
                    to="/shop/$slug"
                    params={{ slug: item.slug }}
                    onClick={() => setOpen(false)}
                    className="block h-28 w-20 shrink-0 overflow-hidden bg-canvas"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-full w-full object-cover"
                    />
                  </Link>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="font-display text-lg leading-tight">{item.name}</p>
                        <p className="mt-1 text-xs text-muted">
                          {item.color} · {item.size}
                        </p>
                      </div>
                      <p className="text-sm tabular-nums">{formatPrice(item.price)}</p>
                    </div>
                    <div className="mt-3 flex items-center justify-between">
                      <div className="inline-flex items-center border border-line">
                        <button
                          type="button"
                          className="flex size-9 items-center justify-center"
                          onClick={() => setQty(item.variantId, item.qty - 1)}
                          aria-label="Decrease"
                        >
                          <Minus className="size-3.5" />
                        </button>
                        <span className="w-6 text-center text-sm tabular-nums">{item.qty}</span>
                        <button
                          type="button"
                          className="flex size-11 items-center justify-center sm:size-9"
                          onClick={() => setQty(item.variantId, item.qty + 1)}
                          aria-label="Increase"
                        >
                          <Plus className="size-3.5" />
                        </button>
                      </div>
                      <button
                        type="button"
                        className="text-xs uppercase tracking-[0.16em] text-subtle hover:text-ink"
                        onClick={() => remove(item.variantId)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {items.length > 0 ? (
          <div className="border-t border-line p-5">
            <div className="mb-4 flex items-center justify-between text-sm">
              <span className="text-muted">Pay on delivery</span>
              <span className="tabular-nums">{formatPrice(total)}</span>
            </div>
            <Link
              to="/checkout"
              onClick={() => setOpen(false)}
              className="flex h-11 w-full items-center justify-center bg-ink text-sm font-medium text-foam transition-transform duration-150 active:scale-[0.96]"
            >
              Checkout
            </Link>
            <p className="mt-3 text-center text-xs text-subtle">
              The courier collects. No card required.
            </p>
          </div>
        ) : null}
      </aside>
    </>
  );
}
