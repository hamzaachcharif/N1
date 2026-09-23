import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { getSql } from "@/lib/db";
import { isValidPhone } from "@/lib/format";
import { dispatchShipment } from "@/lib/server/shipping";
import { assertStudioKey, readSettings } from "@/lib/server/settings";
import type { OrderStatus, PublicOrder, StudioOrder } from "@/lib/types";

const itemSchema = z.object({
  variantId: z.number().int().positive(),
  qty: z.number().int().min(1).max(8),
});

const placeSchema = z.object({
  name: z.string().trim().min(2).max(80),
  phone: z.string().trim().min(8).max(20),
  city: z.string().trim().min(2).max(80),
  commune: z.string().trim().max(80).optional().default(""),
  address: z.string().trim().min(6).max(200),
  notes: z.string().trim().max(240).optional().default(""),
  items: z.array(itemSchema).min(1).max(20),
});

function publicId(): string {
  const a = Math.random().toString(36).slice(2, 6).toUpperCase();
  const b = Date.now().toString(36).slice(-4).toUpperCase();
  return `SLN-${a}${b}`;
}

type VariantJoin = {
  id: number;
  product_id: number;
  color: string;
  size: string;
  sku: string;
  stock: number;
  product_name: string;
  price: number;
  image: string;
};

export const placeOrder = createServerFn({ method: "POST" })
  .validator((data: unknown) => {
    const parsed = placeSchema.safeParse(data);
    if (!parsed.success) throw new Error("Please complete the delivery details.");
    if (!isValidPhone(parsed.data.phone)) {
      throw new Error("Enter a valid phone number for the courier.");
    }
    return parsed.data;
  })
  .handler(async ({ data }) => {
    const sql = await getSql();
    const ids = data.items.map((i) => i.variantId);
    const placeholders = ids.map((_, i) => `$${i + 1}`).join(", ");
    const variants = await sql.query<VariantJoin>(
      `select v.id, v.product_id, v.color, v.size, v.sku, v.stock,
              p.name as product_name, p.price, p.image
         from variants v
         join products p on p.id = v.product_id
        where v.id in (${placeholders})`,
      ids,
    );

    const byId = new Map(variants.map((v) => [v.id, v]));
    const lines: { variant: VariantJoin; qty: number }[] = [];
    for (const item of data.items) {
      const variant = byId.get(item.variantId);
      if (!variant) throw new Error("A piece in your bag is no longer available.");
      if (variant.stock < item.qty) {
        throw new Error(
          `${variant.product_name} in ${variant.color} / ${variant.size} has only ${variant.stock} left.`,
        );
      }
      lines.push({ variant, qty: item.qty });
    }

    const total = lines.reduce((n, l) => n + Number(l.variant.price) * l.qty, 0);
    const id = publicId();
    const phone = data.phone.replace(/[^\d+]/g, "");

    for (const line of lines) {
      const updated = await sql`
        update variants
           set stock = stock - ${line.qty}
         where id = ${line.variant.id} and stock >= ${line.qty}
         returning id
      `;
      if (!updated[0]) {
        throw new Error(
          `${line.variant.product_name} in ${line.variant.color} / ${line.variant.size} just sold out.`,
        );
      }
    }

    const inserted = await sql<{ id: number }>`
      insert into orders (
        public_id, customer_name, phone, city, commune, address, notes, status, total, carrier
      ) values (
        ${id}, ${data.name}, ${phone}, ${data.city}, ${data.commune ?? ""},
        ${data.address}, ${data.notes ?? ""}, 'new', ${total}, 'demo'
      )
      returning id
    `;
    const orderPk = inserted[0]?.id;
    if (!orderPk) throw new Error("Could not record the order.");

    for (const line of lines) {
      await sql`
        insert into order_items (
          order_id, variant_id, product_name, color, size, qty, unit_price, image
        ) values (
          ${orderPk}, ${line.variant.id}, ${line.variant.product_name},
          ${line.variant.color}, ${line.variant.size}, ${line.qty},
          ${Number(line.variant.price)}, ${line.variant.image}
        )
      `;
    }

    const settings = await readSettings();
    const shipment = await dispatchShipment(
      {
        publicId: id,
        customerName: data.name,
        phone,
        city: data.city,
        commune: data.commune ?? "",
        address: data.address,
        notes: data.notes ?? "",
        total,
        items: lines.map((l) => ({
          name: l.variant.product_name,
          color: l.variant.color,
          size: l.variant.size,
          qty: l.qty,
          unitPrice: Number(l.variant.price),
          sku: l.variant.sku,
        })),
      },
      settings,
    );

    const status: OrderStatus = shipment.ok ? "dispatched" : "new";
    await sql`
      update orders
         set status = ${status},
             carrier = ${shipment.carrier},
             carrier_ref = ${shipment.ref},
             carrier_error = ${shipment.error}
       where id = ${orderPk}
    `;

    return {
      publicId: id,
      total,
      status,
      carrier: shipment.carrier,
      dispatched: shipment.ok,
    };
  });

export const getPublicOrder = createServerFn({ method: "GET" })
  .validator(z.object({ publicId: z.string().min(4) }))
  .handler(async ({ data }): Promise<PublicOrder | null> => {
    const sql = await getSql();
    const rows = await sql<{
      public_id: string;
      status: string;
      total: number;
      city: string;
      created_at: string;
    }>`
      select public_id, status, total, city, created_at
      from orders
      where public_id = ${data.publicId}
      limit 1
    `;
    const order = rows[0];
    if (!order) return null;
    const items = await sql<{
      product_name: string;
      color: string;
      size: string;
      qty: number;
      unit_price: number;
      image: string;
    }>`
      select i.product_name, i.color, i.size, i.qty, i.unit_price, i.image
      from order_items i
      join orders o on o.id = i.order_id
      where o.public_id = ${data.publicId}
    `;
    return {
      publicId: order.public_id,
      status: order.status as OrderStatus,
      total: Number(order.total),
      city: order.city,
      createdAt: String(order.created_at),
      items: items.map((i) => ({
        name: i.product_name,
        color: i.color,
        size: i.size,
        qty: Number(i.qty),
        unitPrice: Number(i.unit_price),
        image: i.image,
      })),
    };
  });

type OrderRow = {
  id: number;
  public_id: string;
  customer_name: string;
  phone: string;
  city: string;
  commune: string;
  address: string;
  notes: string;
  status: string;
  total: number;
  carrier: string;
  carrier_ref: string | null;
  carrier_error: string | null;
  created_at: string;
};

function toStudioOrder(
  row: OrderRow,
  items: StudioOrder["items"],
): StudioOrder {
  return {
    id: row.id,
    publicId: row.public_id,
    customerName: row.customer_name,
    phone: row.phone,
    city: row.city,
    commune: row.commune,
    address: row.address,
    notes: row.notes,
    status: row.status as OrderStatus,
    total: Number(row.total),
    carrier: row.carrier,
    carrierRef: row.carrier_ref,
    carrierError: row.carrier_error,
    createdAt: String(row.created_at),
    items,
  };
}

export const listStudioOrders = createServerFn({ method: "POST" })
  .validator(z.object({ studioKey: z.string() }))
  .handler(async ({ data }): Promise<StudioOrder[]> => {
    const settings = await readSettings();
    assertStudioKey(data.studioKey, settings.studioKey);
    const sql = await getSql();
    const rows = await sql<OrderRow>`
      select id, public_id, customer_name, phone, city, commune, address, notes,
             status, total, carrier, carrier_ref, carrier_error, created_at
      from orders
      order by created_at desc
      limit 80
    `;
    if (rows.length === 0) return [];
    const ids = rows.map((r) => r.id);
    const placeholders = ids.map((_, i) => `$${i + 1}`).join(", ");
    const items = await sql.query<{
      order_id: number;
      product_name: string;
      color: string;
      size: string;
      qty: number;
      unit_price: number;
      image: string;
    }>(
      `select order_id, product_name, color, size, qty, unit_price, image
         from order_items
        where order_id in (${placeholders})`,
      ids,
    );
    const byOrder = new Map<number, StudioOrder["items"]>();
    for (const item of items) {
      const list = byOrder.get(item.order_id) ?? [];
      list.push({
        name: item.product_name,
        color: item.color,
        size: item.size,
        qty: Number(item.qty),
        unitPrice: Number(item.unit_price),
        image: item.image,
      });
      byOrder.set(item.order_id, list);
    }
    return rows.map((row) => toStudioOrder(row, byOrder.get(row.id) ?? []));
  });

export const retryDispatch = createServerFn({ method: "POST" })
  .validator(z.object({ studioKey: z.string(), publicId: z.string() }))
  .handler(async ({ data }) => {
    const settings = await readSettings();
    assertStudioKey(data.studioKey, settings.studioKey);
    const sql = await getSql();
    const rows = await sql<OrderRow>`
      select id, public_id, customer_name, phone, city, commune, address, notes,
             status, total, carrier, carrier_ref, carrier_error, created_at
      from orders where public_id = ${data.publicId} limit 1
    `;
    const order = rows[0];
    if (!order) throw new Error("Order not found.");
    const items = await sql<{
      product_name: string;
      color: string;
      size: string;
      qty: number;
      unit_price: number;
    }>`
      select product_name, color, size, qty, unit_price
      from order_items where order_id = ${order.id}
    `;
    const shipment = await dispatchShipment(
      {
        publicId: order.public_id,
        customerName: order.customer_name,
        phone: order.phone,
        city: order.city,
        commune: order.commune,
        address: order.address,
        notes: order.notes,
        total: Number(order.total),
        items: items.map((i) => ({
          name: i.product_name,
          color: i.color,
          size: i.size,
          qty: Number(i.qty),
          unitPrice: Number(i.unit_price),
        })),
      },
      settings,
    );
    const status: OrderStatus = shipment.ok ? "dispatched" : "failed";
    await sql`
      update orders
         set status = ${status},
             carrier = ${shipment.carrier},
             carrier_ref = ${shipment.ref},
             carrier_error = ${shipment.error}
       where id = ${order.id}
    `;
    return shipment;
  });

export const setOrderStatus = createServerFn({ method: "POST" })
  .validator(
    z.object({
      studioKey: z.string(),
      publicId: z.string(),
      status: z.enum(["new", "dispatched", "delivered", "cancelled", "failed"]),
    }),
  )
  .handler(async ({ data }) => {
    const settings = await readSettings();
    assertStudioKey(data.studioKey, settings.studioKey);
    const sql = await getSql();
    if (data.status === "cancelled") {
      const items = await sql<{ variant_id: number; qty: number }>`
        select i.variant_id, i.qty
        from order_items i
        join orders o on o.id = i.order_id
        where o.public_id = ${data.publicId} and o.status <> 'cancelled'
      `;
      for (const item of items) {
        await sql`update variants set stock = stock + ${item.qty} where id = ${item.variant_id}`;
      }
    }
    await sql`
      update orders set status = ${data.status} where public_id = ${data.publicId}
    `;
    return { ok: true };
  });
