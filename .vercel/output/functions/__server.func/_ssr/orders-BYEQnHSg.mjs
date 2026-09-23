import { n as isValidPhone } from "./format-SqI2yd4S.mjs";
import { t as createServerFn } from "./ssr.mjs";
import { a as object, i as number, n as array, o as string, t as _enum } from "../_libs/zod.mjs";
import { n as getSql, t as createServerRpc } from "./db-yHMdolxU.mjs";
import { n as readSettings, t as assertStudioKey } from "./settings-DM4ndntr.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/orders-BYEQnHSg.js
function splitName(full) {
	const parts = full.trim().split(/\s+/);
	if (parts.length === 1) return {
		firstname: parts[0] ?? "Client",
		familyname: parts[0] ?? "Client"
	};
	return {
		firstname: parts[0] ?? "Client",
		familyname: parts.slice(1).join(" ")
	};
}
function productList(items) {
	return items.map((i) => `${i.name} ${i.color}/${i.size} x${i.qty}`).join(" | ").slice(0, 240);
}
function webhookPayload(input) {
	return {
		order_id: input.publicId,
		customer: {
			name: input.customerName,
			phone: input.phone,
			city: input.city,
			commune: input.commune,
			address: input.address
		},
		notes: input.notes,
		cod_amount: input.total,
		currency: "DZD",
		items: input.items
	};
}
async function dispatchShipment(input, settings) {
	const mode = settings.carrierMode;
	if (mode === "demo") return {
		ok: true,
		carrier: "demo",
		ref: `DEMO-${input.publicId.replace("SLN-", "")}`,
		error: null
	};
	try {
		if (mode === "webhook") {
			if (!settings.carrierUrl) return {
				ok: false,
				carrier: mode,
				ref: null,
				error: "No webhook URL configured."
			};
			const headers = { "Content-Type": "application/json" };
			if (settings.carrierToken) headers.Authorization = `Bearer ${settings.carrierToken}`;
			const res = await fetch(settings.carrierUrl, {
				method: "POST",
				headers,
				body: JSON.stringify(webhookPayload(input)),
				signal: AbortSignal.timeout(15e3)
			});
			const text = await res.text();
			if (!res.ok) return {
				ok: false,
				carrier: mode,
				ref: null,
				error: `Webhook ${res.status}: ${text.slice(0, 280)}`
			};
			let ref = null;
			try {
				const json = JSON.parse(text);
				ref = json.ref ?? json.tracking ?? json.id ?? null;
			} catch {
				ref = text.slice(0, 80) || input.publicId;
			}
			return {
				ok: true,
				carrier: mode,
				ref,
				error: null
			};
		}
		if (mode === "yalidine") {
			if (!settings.carrierApiId || !settings.carrierToken) return {
				ok: false,
				carrier: mode,
				ref: null,
				error: "Yalidine API ID and token are required."
			};
			const { firstname, familyname } = splitName(input.customerName);
			const url = settings.carrierUrl || "https://api.yalidine.app/v1/parcels/";
			const body = [{
				order_id: input.publicId,
				from_wilaya_name: settings.fromCity || "Alger",
				firstname,
				familyname,
				contact_phone: input.phone.replace(/\D/g, ""),
				address: input.address,
				to_commune_name: input.commune || input.city,
				to_wilaya_name: input.city,
				product_list: productList(input.items),
				price: input.total,
				freeshipping: 0,
				is_stopdesk: 0,
				has_exchange: 0
			}];
			const res = await fetch(url, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					"X-API-ID": settings.carrierApiId,
					"X-API-TOKEN": settings.carrierToken
				},
				body: JSON.stringify(body),
				signal: AbortSignal.timeout(15e3)
			});
			const text = await res.text();
			if (!res.ok) return {
				ok: false,
				carrier: mode,
				ref: null,
				error: `Yalidine ${res.status}: ${text.slice(0, 280)}`
			};
			let ref = input.publicId;
			try {
				const json = JSON.parse(text);
				if (json && typeof json === "object") {
					const first = Object.values(json)[0];
					if (first && typeof first === "object" && "tracking" in first) ref = String(first.tracking);
				}
			} catch {}
			return {
				ok: true,
				carrier: mode,
				ref,
				error: null
			};
		}
	} catch (err) {
		return {
			ok: false,
			carrier: mode,
			ref: null,
			error: err instanceof Error ? err.message : "Carrier request failed."
		};
	}
	return {
		ok: false,
		carrier: mode,
		ref: null,
		error: "Unknown carrier mode."
	};
}
var itemSchema = object({
	variantId: number().int().positive(),
	qty: number().int().min(1).max(8)
});
var placeSchema = object({
	name: string().trim().min(2).max(80),
	phone: string().trim().min(8).max(20),
	city: string().trim().min(2).max(80),
	commune: string().trim().max(80).optional().default(""),
	address: string().trim().min(6).max(200),
	notes: string().trim().max(240).optional().default(""),
	items: array(itemSchema).min(1).max(20)
});
function publicId() {
	return `SLN-${Math.random().toString(36).slice(2, 6).toUpperCase()}${Date.now().toString(36).slice(-4).toUpperCase()}`;
}
var placeOrder_createServerFn_handler = createServerRpc({
	id: "eff383686543aaf1d3781cf0aaa6a0b80974ddd9537d83f9cfc933b88b01f00f",
	name: "placeOrder",
	filename: "src/lib/server/orders.ts"
}, (opts) => placeOrder.__executeServer(opts));
var placeOrder = createServerFn({ method: "POST" }).validator((data) => {
	const parsed = placeSchema.safeParse(data);
	if (!parsed.success) throw new Error("Please complete the delivery details.");
	if (!isValidPhone(parsed.data.phone)) throw new Error("Enter a valid phone number for the courier.");
	return parsed.data;
}).handler(placeOrder_createServerFn_handler, async ({ data }) => {
	const sql = await getSql();
	const ids = data.items.map((i) => i.variantId);
	const placeholders = ids.map((_, i) => `$${i + 1}`).join(", ");
	const variants = await sql.query(`select v.id, v.product_id, v.color, v.size, v.sku, v.stock,
              p.name as product_name, p.price, p.image
         from variants v
         join products p on p.id = v.product_id
        where v.id in (${placeholders})`, ids);
	const byId = new Map(variants.map((v) => [v.id, v]));
	const lines = [];
	for (const item of data.items) {
		const variant = byId.get(item.variantId);
		if (!variant) throw new Error("A piece in your bag is no longer available.");
		if (variant.stock < item.qty) throw new Error(`${variant.product_name} in ${variant.color} / ${variant.size} has only ${variant.stock} left.`);
		lines.push({
			variant,
			qty: item.qty
		});
	}
	const total = lines.reduce((n, l) => n + Number(l.variant.price) * l.qty, 0);
	const id = publicId();
	const phone = data.phone.replace(/[^\d+]/g, "");
	for (const line of lines) if (!(await sql`
        update variants
           set stock = stock - ${line.qty}
         where id = ${line.variant.id} and stock >= ${line.qty}
         returning id
      `)[0]) throw new Error(`${line.variant.product_name} in ${line.variant.color} / ${line.variant.size} just sold out.`);
	const orderPk = (await sql`
      insert into orders (
        public_id, customer_name, phone, city, commune, address, notes, status, total, carrier
      ) values (
        ${id}, ${data.name}, ${phone}, ${data.city}, ${data.commune ?? ""},
        ${data.address}, ${data.notes ?? ""}, 'new', ${total}, 'demo'
      )
      returning id
    `)[0]?.id;
	if (!orderPk) throw new Error("Could not record the order.");
	for (const line of lines) await sql`
        insert into order_items (
          order_id, variant_id, product_name, color, size, qty, unit_price, image
        ) values (
          ${orderPk}, ${line.variant.id}, ${line.variant.product_name},
          ${line.variant.color}, ${line.variant.size}, ${line.qty},
          ${Number(line.variant.price)}, ${line.variant.image}
        )
      `;
	const settings = await readSettings();
	const shipment = await dispatchShipment({
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
			sku: l.variant.sku
		}))
	}, settings);
	const status = shipment.ok ? "dispatched" : "new";
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
		dispatched: shipment.ok
	};
});
var getPublicOrder_createServerFn_handler = createServerRpc({
	id: "4c661bf1adc35a644d49683c3f5c7c55911475bb103b3c6b8eb953d29d587d4c",
	name: "getPublicOrder",
	filename: "src/lib/server/orders.ts"
}, (opts) => getPublicOrder.__executeServer(opts));
var getPublicOrder = createServerFn({ method: "GET" }).validator(object({ publicId: string().min(4) })).handler(getPublicOrder_createServerFn_handler, async ({ data }) => {
	const sql = await getSql();
	const order = (await sql`
      select public_id, status, total, city, created_at
      from orders
      where public_id = ${data.publicId}
      limit 1
    `)[0];
	if (!order) return null;
	const items = await sql`
      select i.product_name, i.color, i.size, i.qty, i.unit_price, i.image
      from order_items i
      join orders o on o.id = i.order_id
      where o.public_id = ${data.publicId}
    `;
	return {
		publicId: order.public_id,
		status: order.status,
		total: Number(order.total),
		city: order.city,
		createdAt: String(order.created_at),
		items: items.map((i) => ({
			name: i.product_name,
			color: i.color,
			size: i.size,
			qty: Number(i.qty),
			unitPrice: Number(i.unit_price),
			image: i.image
		}))
	};
});
function toStudioOrder(row, items) {
	return {
		id: row.id,
		publicId: row.public_id,
		customerName: row.customer_name,
		phone: row.phone,
		city: row.city,
		commune: row.commune,
		address: row.address,
		notes: row.notes,
		status: row.status,
		total: Number(row.total),
		carrier: row.carrier,
		carrierRef: row.carrier_ref,
		carrierError: row.carrier_error,
		createdAt: String(row.created_at),
		items
	};
}
var listStudioOrders_createServerFn_handler = createServerRpc({
	id: "da48fafc470f0a0b7bf4ce174c209e391ba8929139947da4bbd1e02dadea1687",
	name: "listStudioOrders",
	filename: "src/lib/server/orders.ts"
}, (opts) => listStudioOrders.__executeServer(opts));
var listStudioOrders = createServerFn({ method: "POST" }).validator(object({ studioKey: string() })).handler(listStudioOrders_createServerFn_handler, async ({ data }) => {
	const settings = await readSettings();
	assertStudioKey(data.studioKey, settings.studioKey);
	const sql = await getSql();
	const rows = await sql`
      select id, public_id, customer_name, phone, city, commune, address, notes,
             status, total, carrier, carrier_ref, carrier_error, created_at
      from orders
      order by created_at desc
      limit 80
    `;
	if (rows.length === 0) return [];
	const ids = rows.map((r) => r.id);
	const placeholders = ids.map((_, i) => `$${i + 1}`).join(", ");
	const items = await sql.query(`select order_id, product_name, color, size, qty, unit_price, image
         from order_items
        where order_id in (${placeholders})`, ids);
	const byOrder = /* @__PURE__ */ new Map();
	for (const item of items) {
		const list = byOrder.get(item.order_id) ?? [];
		list.push({
			name: item.product_name,
			color: item.color,
			size: item.size,
			qty: Number(item.qty),
			unitPrice: Number(item.unit_price),
			image: item.image
		});
		byOrder.set(item.order_id, list);
	}
	return rows.map((row) => toStudioOrder(row, byOrder.get(row.id) ?? []));
});
var retryDispatch_createServerFn_handler = createServerRpc({
	id: "58fdb3cf41d60dd3d49fe51603a5da607132d1e46db6965a10e33989283f9d58",
	name: "retryDispatch",
	filename: "src/lib/server/orders.ts"
}, (opts) => retryDispatch.__executeServer(opts));
var retryDispatch = createServerFn({ method: "POST" }).validator(object({
	studioKey: string(),
	publicId: string()
})).handler(retryDispatch_createServerFn_handler, async ({ data }) => {
	const settings = await readSettings();
	assertStudioKey(data.studioKey, settings.studioKey);
	const sql = await getSql();
	const order = (await sql`
      select id, public_id, customer_name, phone, city, commune, address, notes,
             status, total, carrier, carrier_ref, carrier_error, created_at
      from orders where public_id = ${data.publicId} limit 1
    `)[0];
	if (!order) throw new Error("Order not found.");
	const items = await sql`
      select product_name, color, size, qty, unit_price
      from order_items where order_id = ${order.id}
    `;
	const shipment = await dispatchShipment({
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
			unitPrice: Number(i.unit_price)
		}))
	}, settings);
	await sql`
      update orders
         set status = ${shipment.ok ? "dispatched" : "failed"},
             carrier = ${shipment.carrier},
             carrier_ref = ${shipment.ref},
             carrier_error = ${shipment.error}
       where id = ${order.id}
    `;
	return shipment;
});
var setOrderStatus_createServerFn_handler = createServerRpc({
	id: "5d43cd48ea10e76b50e9db85a285d0f6c281ec9368424b9c0818238a0f33dd84",
	name: "setOrderStatus",
	filename: "src/lib/server/orders.ts"
}, (opts) => setOrderStatus.__executeServer(opts));
var setOrderStatus = createServerFn({ method: "POST" }).validator(object({
	studioKey: string(),
	publicId: string(),
	status: _enum([
		"new",
		"dispatched",
		"delivered",
		"cancelled",
		"failed"
	])
})).handler(setOrderStatus_createServerFn_handler, async ({ data }) => {
	const settings = await readSettings();
	assertStudioKey(data.studioKey, settings.studioKey);
	const sql = await getSql();
	if (data.status === "cancelled") {
		const items = await sql`
        select i.variant_id, i.qty
        from order_items i
        join orders o on o.id = i.order_id
        where o.public_id = ${data.publicId} and o.status <> 'cancelled'
      `;
		for (const item of items) await sql`update variants set stock = stock + ${item.qty} where id = ${item.variant_id}`;
	}
	await sql`
      update orders set status = ${data.status} where public_id = ${data.publicId}
    `;
	return { ok: true };
});
//#endregion
export { getPublicOrder_createServerFn_handler, listStudioOrders_createServerFn_handler, placeOrder_createServerFn_handler, retryDispatch_createServerFn_handler, setOrderStatus_createServerFn_handler };
