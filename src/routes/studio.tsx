import { createFileRoute, Link } from "@tanstack/react-router";
import { type FormEvent, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Field, Input, NativeSelect } from "@/components/ui/field";
import { formatPrice } from "@/lib/format";
import { listStudioOrders, retryDispatch, setOrderStatus } from "@/lib/server/orders";
import {
  adjustStock,
  getStudioSettings,
  listInventory,
  saveStudioSettings,
  unlockStudio,
} from "@/lib/server/studio";
import { SIZES, type StudioOrder } from "@/lib/types";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/studio")({
  component: StudioPage,
});

const KEY_STORAGE = "solene-studio-key";

type Tab = "orders" | "stock" | "carrier";

function StudioPage() {
  const [key, setKey] = useState("");
  const [draft, setDraft] = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const [tab, setTab] = useState<Tab>("orders");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    const stored = sessionStorage.getItem(KEY_STORAGE);
    if (!stored) return;
    void unlockStudio({ data: { studioKey: stored } })
      .then(() => {
        setKey(stored);
        setUnlocked(true);
      })
      .catch(() => {
        sessionStorage.removeItem(KEY_STORAGE);
      });
  }, []);

  async function unlock(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    try {
      await unlockStudio({ data: { studioKey: draft } });
      sessionStorage.setItem(KEY_STORAGE, draft);
      setKey(draft);
      setUnlocked(true);
    } catch {
      toast.error("That code is not the ledger.");
    } finally {
      setBusy(false);
    }
  }

  if (!unlocked) {
    return (
      <div className="flex min-h-dvh flex-col items-center justify-center bg-canvas px-4">
        <Link to="/" className="font-display text-2xl tracking-[0.18em]">
          SOLÈNE
        </Link>
        <h1 className="mt-10 font-display text-4xl">Atelier ledger</h1>
        <p className="mt-2 max-w-sm text-center text-sm text-muted">
          Inventory, orders, and the delivery partner. Preview code:{" "}
          <span className="text-ink">atelier</span>
        </p>
        <form onSubmit={unlock} className="mt-8 w-full max-w-xs space-y-4">
          <Field label="Ledger code">
            <Input
              type="password"
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              autoFocus
            />
          </Field>
          <Button type="submit" block disabled={busy}>
            Enter
          </Button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-dvh bg-canvas text-ink">
      <header className="border-b border-line">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
          <div>
            <p className="font-display text-xl tracking-[0.14em]">SOLÈNE</p>
            <p className="text-xs uppercase tracking-[0.18em] text-muted">Atelier ledger</p>
          </div>
          <Link to="/" className="text-xs uppercase tracking-[0.16em] text-muted hover:text-ink">
            View the house
          </Link>
        </div>
        <div className="mx-auto flex max-w-6xl gap-2 px-4 pb-3 sm:px-6">
          {(
            [
              ["orders", "Orders"],
              ["stock", "Inventory"],
              ["carrier", "Delivery partner"],
            ] as const
          ).map(([id, label]) => (
            <button
              key={id}
              type="button"
              onClick={() => setTab(id)}
              className={cn(
                "h-10 px-4 text-xs uppercase tracking-[0.16em] border",
                tab === id ? "border-ink bg-ink text-foam" : "border-line text-muted",
              )}
            >
              {label}
            </button>
          ))}
        </div>
      </header>
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        {tab === "orders" ? <OrdersPanel studioKey={key} /> : null}
        {tab === "stock" ? <StockPanel studioKey={key} /> : null}
        {tab === "carrier" ? <CarrierPanel studioKey={key} /> : null}
      </div>
    </div>
  );
}

function OrdersPanel({ studioKey }: { studioKey: string }) {
  const [orders, setOrders] = useState<StudioOrder[] | null>(null);

  async function load() {
    const rows = await listStudioOrders({ data: { studioKey } });
    setOrders(rows);
  }

  useEffect(() => {
    void load().catch((err) => toast.error(String(err)));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [studioKey]);

  if (!orders) return <p className="text-sm text-muted">Loading the book…</p>;
  if (orders.length === 0) {
    return <p className="text-sm text-muted">No orders yet. The first one will land here.</p>;
  }

  return (
    <div className="space-y-4">
      {orders.map((order) => (
        <article key={order.publicId} className="border border-line bg-paper p-5">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="font-display text-2xl">{order.publicId}</p>
              <p className="mt-1 text-sm text-muted">
                {order.city}
                {order.commune ? ` · ${order.commune}` : ""} · {formatPrice(order.total)}
              </p>
              <p className="mt-1 text-sm">
                {order.customerName} · {order.phone}
              </p>
              <p className="mt-1 text-xs text-subtle">{order.address}</p>
            </div>
            <span className="text-xs uppercase tracking-[0.16em] text-muted">{order.status}</span>
          </div>
          <ul className="mt-4 text-sm text-muted">
            {order.items.map((item, i) => (
              <li key={`${item.name}-${i}`}>
                {item.name} · {item.color} / {item.size} ×{item.qty}
              </li>
            ))}
          </ul>
          {order.carrierRef ? (
            <p className="mt-3 text-xs text-ok">Carrier ref {order.carrierRef}</p>
          ) : null}
          {order.carrierError ? (
            <p className="mt-3 text-xs text-danger">{order.carrierError}</p>
          ) : null}
          <div className="mt-4 flex flex-wrap gap-2">
            <Button
              variant="outline"
              onClick={async () => {
                try {
                  const result = await retryDispatch({
                    data: { studioKey, publicId: order.publicId },
                  });
                  if (result.ok) toast.success("Sent to the partner");
                  else toast.error(result.error ?? "Dispatch failed");
                  await load();
                } catch (err) {
                  toast.error(err instanceof Error ? err.message : "Failed");
                }
              }}
            >
              Send to partner
            </Button>
            <Button
              variant="ghost"
              onClick={async () => {
                await setOrderStatus({
                  data: { studioKey, publicId: order.publicId, status: "delivered" },
                });
                await load();
              }}
            >
              Mark delivered
            </Button>
            <Button
              variant="ghost"
              onClick={async () => {
                await setOrderStatus({
                  data: { studioKey, publicId: order.publicId, status: "cancelled" },
                });
                toast.success("Cancelled — stock returned");
                await load();
              }}
            >
              Cancel & restock
            </Button>
          </div>
        </article>
      ))}
    </div>
  );
}

function StockPanel({ studioKey }: { studioKey: string }) {
  const [rows, setRows] = useState<
    | {
        id: number;
        name: string;
        image: string;
        color: string;
        colorHex: string;
        size: string;
        sku: string;
        stock: number;
      }[]
    | null
  >(null);

  useEffect(() => {
    void listInventory({ data: { studioKey } })
      .then(setRows)
      .catch((err) => toast.error(String(err)));
  }, [studioKey]);

  const grouped = useMemo(() => {
    if (!rows) return [];
    const map = new Map<string, NonNullable<typeof rows>>();
    for (const row of rows) {
      const list = map.get(row.name) ?? [];
      list.push(row);
      map.set(row.name, list);
    }
    return [...map.entries()];
  }, [rows]);

  if (!rows) return <p className="text-sm text-muted">Counting the rack…</p>;

  return (
    <div className="space-y-10">
      {grouped.map(([name, variants]) => (
        <section key={name}>
          <div className="mb-4 flex items-center gap-3">
            <img src={variants[0]?.image} alt="" className="h-14 w-10 object-cover bg-paper" />
            <h2 className="font-display text-2xl">{name}</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[520px] text-left text-sm">
              <thead>
                <tr className="text-xs uppercase tracking-[0.16em] text-muted">
                  <th className="pb-2 font-medium">Colour</th>
                  {SIZES.map((s) => (
                    <th key={s} className="pb-2 font-medium">
                      {s}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[...new Set(variants.map((v) => v.color))].map((color) => (
                  <tr key={color} className="border-t border-line">
                    <td className="py-3">
                      <span className="inline-flex items-center gap-2">
                        <span
                          className="size-3 rounded-full border border-line"
                          style={{
                            background: variants.find((v) => v.color === color)?.colorHex,
                          }}
                        />
                        {color}
                      </span>
                    </td>
                    {SIZES.map((size) => {
                      const v = variants.find((x) => x.color === color && x.size === size);
                      if (!v) return <td key={size} />;
                      return (
                        <td key={size} className="py-3">
                          <input
                            type="number"
                            min={0}
                            max={999}
                            defaultValue={v.stock}
                            className={cn(
                              "h-11 w-16 border bg-paper px-2 tabular-nums outline-none",
                              v.stock === 0 ? "border-danger/40 text-danger" : "border-line",
                            )}
                            onBlur={async (e) => {
                              const stock = Math.max(0, Number(e.target.value) || 0);
                              await adjustStock({
                                data: { studioKey, variantId: v.id, stock },
                              });
                              toast.success(`${v.sku} → ${stock}`);
                            }}
                          />
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      ))}
    </div>
  );
}

function CarrierPanel({ studioKey }: { studioKey: string }) {
  const [form, setForm] = useState({
    carrierMode: "demo" as "demo" | "webhook" | "yalidine",
    carrierUrl: "",
    carrierApiId: "",
    carrierToken: "",
    fromCity: "Alger",
    whatsapp: "",
    instagram: "",
  });
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    void getStudioSettings({ data: { studioKey } })
      .then((s) => {
        setForm({
          carrierMode: s.carrierMode,
          carrierUrl: s.carrierUrl,
          carrierApiId: s.carrierApiId,
          carrierToken: s.carrierToken,
          fromCity: s.fromCity,
          whatsapp: s.whatsapp,
          instagram: s.instagram,
        });
        setLoaded(true);
      })
      .catch((err) => toast.error(String(err)));
  }, [studioKey]);

  if (!loaded) return <p className="text-sm text-muted">Opening the partner file…</p>;

  return (
    <form
      className="max-w-xl space-y-5"
      onSubmit={async (e) => {
        e.preventDefault();
        await saveStudioSettings({ data: { studioKey, ...form } });
        toast.success("Partner settings saved");
      }}
    >
      <p className="text-sm leading-relaxed text-muted">
        You do not need Shopify payments or shipping. Pick how each new order is handed to
        the company that delivers and collects cash for you.
      </p>
      <Field label="Mode">
        <NativeSelect
          value={form.carrierMode}
          onChange={(e) =>
            setForm({ ...form, carrierMode: e.target.value as typeof form.carrierMode })
          }
        >
          <option value="demo">Demo — keep orders here only</option>
          <option value="yalidine">Yalidine (Algeria)</option>
          <option value="webhook">Custom webhook / any API</option>
        </NativeSelect>
      </Field>
      {form.carrierMode === "yalidine" ? (
        <>
          <Field label="Yalidine API ID">
            <Input
              value={form.carrierApiId}
              onChange={(e) => setForm({ ...form, carrierApiId: e.target.value })}
            />
          </Field>
          <Field label="Yalidine API token" hint="Leave the dots to keep the saved token.">
            <Input
              value={form.carrierToken}
              onChange={(e) => setForm({ ...form, carrierToken: e.target.value })}
            />
          </Field>
          <Field label="From wilaya">
            <Input
              value={form.fromCity}
              onChange={(e) => setForm({ ...form, fromCity: e.target.value })}
            />
          </Field>
        </>
      ) : null}
      {form.carrierMode === "webhook" ? (
        <>
          <Field label="Webhook URL" hint="We POST JSON: customer, city, items, cod_amount.">
            <Input
              value={form.carrierUrl}
              onChange={(e) => setForm({ ...form, carrierUrl: e.target.value })}
              placeholder="https://partner.example.com/orders"
            />
          </Field>
          <Field label="Bearer token (optional)">
            <Input
              value={form.carrierToken}
              onChange={(e) => setForm({ ...form, carrierToken: e.target.value })}
            />
          </Field>
        </>
      ) : null}
      <Field label="WhatsApp (optional)" hint="Shown later as a second order path.">
        <Input
          value={form.whatsapp}
          onChange={(e) => setForm({ ...form, whatsapp: e.target.value })}
          placeholder="2135xxxxxxxx"
        />
      </Field>
      <Field label="Instagram handle">
        <Input
          value={form.instagram}
          onChange={(e) => setForm({ ...form, instagram: e.target.value })}
          placeholder="solene.atelier"
        />
      </Field>
      <Button type="submit">Save partner</Button>
    </form>
  );
}
