import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { type FormEvent, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Field, Input, NativeSelect, Textarea } from "@/components/ui/field";
import { CITIES } from "@/lib/cities";
import { cartTotal, useCart } from "@/lib/cart";
import { formatPrice } from "@/lib/format";
import { placeOrder } from "@/lib/server/orders";

export const Route = createFileRoute("/checkout")({
  component: CheckoutPage,
});

function CheckoutPage() {
  const navigate = useNavigate();
  const items = useCart((s) => s.items);
  const clear = useCart((s) => s.clear);
  const total = cartTotal(items);
  const [pending, setPending] = useState(false);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    city: "Alger",
    cityOther: "",
    commune: "",
    address: "",
    notes: "",
  });

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (items.length === 0) return;
    const city = form.city === "Other" ? form.cityOther.trim() : form.city;
    if (city.length < 2) {
      toast.error("Enter a city for the courier.");
      return;
    }
    setPending(true);
    try {
      const result = await placeOrder({
        data: {
          name: form.name,
          phone: form.phone,
          city,
          commune: form.commune,
          address: form.address,
          notes: form.notes,
          items: items.map((i) => ({ variantId: i.variantId, qty: i.qty })),
        },
      });
      clear();
      toast.success("Order received");
      await navigate({ to: "/order/$id", params: { id: result.publicId } });
    } catch (err) {
      const message = err instanceof Error ? err.message : "Could not place the order.";
      toast.error(message);
    } finally {
      setPending(false);
    }
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto flex min-h-[60dvh] max-w-xl flex-col items-center justify-center px-4 text-center">
        <h1 className="font-display text-4xl">Nothing to pack</h1>
        <p className="mt-3 text-sm text-muted">Add a piece, then we will take the rest.</p>
        <Link
          to="/shop"
          className="mt-8 inline-flex h-11 items-center bg-ink px-6 text-sm text-foam"
        >
          Shop the collection
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto grid max-w-6xl gap-12 px-4 py-12 sm:px-6 lg:grid-cols-12">
      <div className="lg:col-span-7">
        <p className="text-xs uppercase tracking-[0.22em] text-muted">Checkout</p>
        <h1 className="mt-2 font-display text-4xl md:text-5xl">Pay on delivery</h1>
        <p className="mt-3 max-w-md text-sm text-muted">
          A courier brings the order. You pay them. We never take a card.
        </p>

        <form onSubmit={onSubmit} className="mt-10 space-y-5">
          <Field label="Full name">
            <Input
              required
              autoComplete="name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </Field>
          <Field label="Phone" hint="The number the courier will call.">
            <Input
              required
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              placeholder="05 xx xx xx xx"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
            />
          </Field>
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="City / Wilaya">
              <NativeSelect
                required
                value={form.city}
                onChange={(e) => setForm({ ...form, city: e.target.value })}
              >
                {CITIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
                <option value="Other">Other city</option>
              </NativeSelect>
            </Field>
            <Field label="Commune" hint="Optional, helps the driver.">
              <Input
                value={form.commune}
                onChange={(e) => setForm({ ...form, commune: e.target.value })}
              />
            </Field>
          </div>
          {form.city === "Other" ? (
            <Field label="City name">
              <Input
                required
                value={form.cityOther}
                onChange={(e) => setForm({ ...form, cityOther: e.target.value })}
              />
            </Field>
          ) : null}
          <Field label="Address">
            <Input
              required
              autoComplete="street-address"
              placeholder="Street, building, floor"
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
            />
          </Field>
          <Field label="Note for the courier" hint="Gate codes, landmarks, timing.">
            <Textarea
              value={form.notes}
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
            />
          </Field>
          <Button type="submit" block disabled={pending}>
            {pending ? "Sending to the atelier…" : `Place order · ${formatPrice(total)}`}
          </Button>
        </form>
      </div>

      <aside className="lg:col-span-5">
        <div className="border border-line bg-paper p-6">
          <p className="text-xs uppercase tracking-[0.2em] text-muted">Your bag</p>
          <ul className="mt-5 space-y-4">
            {items.map((item) => (
              <li key={item.variantId} className="flex gap-3">
                <img
                  src={item.image}
                  alt=""
                  className="h-20 w-14 object-cover bg-canvas"
                />
                <div className="min-w-0 flex-1">
                  <p className="font-display text-lg leading-tight">{item.name}</p>
                  <p className="text-xs text-muted">
                    {item.color} · {item.size} · ×{item.qty}
                  </p>
                </div>
                <p className="text-sm tabular-nums">{formatPrice(item.price * item.qty)}</p>
              </li>
            ))}
          </ul>
          <div className="mt-6 flex items-center justify-between border-t border-line pt-4 text-sm">
            <span>Due to the courier</span>
            <span className="tabular-nums">{formatPrice(total)}</span>
          </div>
        </div>
      </aside>
    </div>
  );
}
