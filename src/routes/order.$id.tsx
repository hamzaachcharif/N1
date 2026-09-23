import { createFileRoute, Link } from "@tanstack/react-router";
import { getPublicOrder } from "@/lib/server/orders";
import { formatPrice } from "@/lib/format";

export const Route = createFileRoute("/order/$id")({
  loader: async ({ params }) => getPublicOrder({ data: { publicId: params.id } }),
  component: OrderPage,
});

const STATUS: Record<string, string> = {
  new: "Received — waiting for the courier pickup",
  dispatched: "Handed to the delivery partner",
  delivered: "Delivered",
  cancelled: "Cancelled",
  failed: "Held — the atelier will retry dispatch",
};

function OrderPage() {
  const order = Route.useLoaderData();

  if (!order) {
    return (
      <div className="mx-auto max-w-lg px-4 py-24 text-center">
        <h1 className="font-display text-4xl">Order not found</h1>
        <Link to="/shop" className="mt-6 inline-block text-sm underline underline-offset-4">
          Return to the shop
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6">
      <p className="text-[11px] uppercase tracking-[0.22em] text-muted">Confirmation</p>
      <h1 className="mt-2 font-display text-5xl">It is on its way to the rack.</h1>
      <p className="mt-4 text-sm text-muted">
        Keep this number. The courier will call the phone you left.
      </p>
      <p className="mt-6 font-display text-3xl tracking-[0.08em]">{order.publicId}</p>
      <p className="mt-2 text-sm text-ink">{STATUS[order.status] ?? order.status}</p>
      <p className="mt-1 text-sm text-muted">
        {order.city} · {formatPrice(order.total)} due on delivery
      </p>

      <ul className="mt-10 space-y-4 border-t border-line pt-8">
        {order.items.map((item, i) => (
          <li key={`${item.name}-${i}`} className="flex gap-4">
            {item.image ? (
              <img src={item.image} alt="" className="h-20 w-14 object-cover bg-paper" />
            ) : null}
            <div className="flex-1">
              <p className="font-display text-xl">{item.name}</p>
              <p className="text-xs text-muted">
                {item.color} · {item.size} · ×{item.qty}
              </p>
            </div>
            <p className="text-sm tabular-nums">{formatPrice(item.unitPrice * item.qty)}</p>
          </li>
        ))}
      </ul>

      <Link
        to="/shop"
        className="mt-12 inline-flex h-11 items-center border border-ink px-6 text-sm"
      >
        Continue browsing
      </Link>
    </div>
  );
}
