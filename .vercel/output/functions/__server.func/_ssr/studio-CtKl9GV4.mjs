import { t as createServerFn } from "./ssr.mjs";
import { a as object, i as number, o as string, t as _enum } from "../_libs/zod.mjs";
import { n as getSql, t as createServerRpc } from "./db-yHMdolxU.mjs";
import { n as readSettings, r as writeSettings, t as assertStudioKey } from "./settings-DM4ndntr.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/studio-CtKl9GV4.js
var unlockStudio_createServerFn_handler = createServerRpc({
	id: "2b5324f8a8fd685b00a21598f9100f38cb7a9d9c4b6237b27edca5a85ef3cd7f",
	name: "unlockStudio",
	filename: "src/lib/server/studio.ts"
}, (opts) => unlockStudio.__executeServer(opts));
var unlockStudio = createServerFn({ method: "POST" }).validator(object({ studioKey: string() })).handler(unlockStudio_createServerFn_handler, async ({ data }) => {
	const settings = await readSettings();
	assertStudioKey(data.studioKey, settings.studioKey);
	return { ok: true };
});
var getStudioSettings_createServerFn_handler = createServerRpc({
	id: "7cdbeeb035a832ca5f926f33625f23feb791ee03462a031e03f3263f563c5d7a",
	name: "getStudioSettings",
	filename: "src/lib/server/studio.ts"
}, (opts) => getStudioSettings.__executeServer(opts));
var getStudioSettings = createServerFn({ method: "POST" }).validator(object({ studioKey: string() })).handler(getStudioSettings_createServerFn_handler, async ({ data }) => {
	const settings = await readSettings();
	assertStudioKey(data.studioKey, settings.studioKey);
	return {
		studioKeySet: true,
		carrierMode: settings.carrierMode,
		carrierUrl: settings.carrierUrl,
		carrierApiId: settings.carrierApiId,
		carrierToken: settings.carrierToken ? "••••••••" : "",
		fromCity: settings.fromCity,
		whatsapp: settings.whatsapp,
		instagram: settings.instagram,
		brandName: settings.brandName
	};
});
var saveStudioSettings_createServerFn_handler = createServerRpc({
	id: "07a2708e1d066bf79e606c09f2a1d9a4efbd1f8b438d956e4f2413ddc70f1512",
	name: "saveStudioSettings",
	filename: "src/lib/server/studio.ts"
}, (opts) => saveStudioSettings.__executeServer(opts));
var saveStudioSettings = createServerFn({ method: "POST" }).validator(object({
	studioKey: string(),
	carrierMode: _enum([
		"demo",
		"webhook",
		"yalidine"
	]),
	carrierUrl: string().max(400),
	carrierApiId: string().max(200),
	carrierToken: string().max(400),
	fromCity: string().max(80),
	whatsapp: string().max(30),
	instagram: string().max(80)
})).handler(saveStudioSettings_createServerFn_handler, async ({ data }) => {
	const settings = await readSettings();
	assertStudioKey(data.studioKey, settings.studioKey);
	const patch = {
		carrierMode: data.carrierMode,
		carrierUrl: data.carrierUrl.trim(),
		carrierApiId: data.carrierApiId.trim(),
		fromCity: data.fromCity.trim() || "Alger",
		whatsapp: data.whatsapp.trim(),
		instagram: data.instagram.trim().replace(/^@/, "")
	};
	if (data.carrierToken && !data.carrierToken.includes("•")) patch.carrierToken = data.carrierToken.trim();
	await writeSettings(patch);
	return { ok: true };
});
var listInventory_createServerFn_handler = createServerRpc({
	id: "84de6174686c4ea0bd6fea33de4a6bb3bda45aa902b8a4ab17cb1abefb4ffed6",
	name: "listInventory",
	filename: "src/lib/server/studio.ts"
}, (opts) => listInventory.__executeServer(opts));
var listInventory = createServerFn({ method: "POST" }).validator(object({ studioKey: string() })).handler(listInventory_createServerFn_handler, async ({ data }) => {
	const settings = await readSettings();
	assertStudioKey(data.studioKey, settings.studioKey);
	return (await (await getSql())`
      select v.id, v.product_id, p.slug, p.name, p.image,
             v.color, v.color_hex, v.size, v.sku, v.stock
      from variants v
      join products p on p.id = v.product_id
      order by p.sort_order, v.color, v.id
    `).map((r) => ({
		id: r.id,
		productId: r.product_id,
		slug: r.slug,
		name: r.name,
		image: r.image,
		color: r.color,
		colorHex: r.color_hex,
		size: r.size,
		sku: r.sku,
		stock: Number(r.stock)
	}));
});
var adjustStock_createServerFn_handler = createServerRpc({
	id: "751b74598b32c006aecfa33ceb98922554712970c93cdbb52c56a30904919b8a",
	name: "adjustStock",
	filename: "src/lib/server/studio.ts"
}, (opts) => adjustStock.__executeServer(opts));
var adjustStock = createServerFn({ method: "POST" }).validator(object({
	studioKey: string(),
	variantId: number().int().positive(),
	stock: number().int().min(0).max(999)
})).handler(adjustStock_createServerFn_handler, async ({ data }) => {
	const settings = await readSettings();
	assertStudioKey(data.studioKey, settings.studioKey);
	await (await getSql())`update variants set stock = ${data.stock} where id = ${data.variantId}`;
	return {
		ok: true,
		stock: data.stock
	};
});
//#endregion
export { adjustStock_createServerFn_handler, getStudioSettings_createServerFn_handler, listInventory_createServerFn_handler, saveStudioSettings_createServerFn_handler, unlockStudio_createServerFn_handler };
