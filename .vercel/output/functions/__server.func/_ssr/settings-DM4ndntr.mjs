import { n as getSql } from "./db-yHMdolxU.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/settings-DM4ndntr.js
var DEFAULTS = {
	studioKey: "atelier",
	carrierMode: "demo",
	carrierUrl: "",
	carrierApiId: "",
	carrierToken: "",
	fromCity: "Alger",
	whatsapp: "",
	instagram: "",
	brandName: "SOLENE"
};
function asMode(value) {
	if (value === "webhook" || value === "yalidine" || value === "demo") return value;
	return "demo";
}
async function readSettings() {
	const rows = await (await getSql())`select key, value from settings`;
	const map = Object.fromEntries(rows.map((r) => [r.key, r.value]));
	return {
		studioKey: map.studio_key ?? DEFAULTS.studioKey,
		carrierMode: asMode(map.carrier_mode ?? "demo"),
		carrierUrl: map.carrier_url ?? "",
		carrierApiId: map.carrier_api_id ?? "",
		carrierToken: map.carrier_token ?? "",
		fromCity: map.from_city ?? DEFAULTS.fromCity,
		whatsapp: map.whatsapp ?? "",
		instagram: map.instagram ?? "",
		brandName: map.brand_name ?? DEFAULTS.brandName
	};
}
async function writeSettings(patch) {
	const next = {
		...await readSettings(),
		...patch
	};
	const sql = await getSql();
	const entries = [
		["studio_key", next.studioKey],
		["carrier_mode", next.carrierMode],
		["carrier_url", next.carrierUrl],
		["carrier_api_id", next.carrierApiId],
		["carrier_token", next.carrierToken],
		["from_city", next.fromCity],
		["whatsapp", next.whatsapp],
		["instagram", next.instagram],
		["brand_name", next.brandName]
	];
	for (const [key, value] of entries) await sql`
      insert into settings (key, value) values (${key}, ${value})
      on conflict (key) do update set value = excluded.value
    `;
	return next;
}
function assertStudioKey(provided, expected) {
	if (!provided || provided !== expected) throw new Error("Studio access denied.");
}
//#endregion
export { readSettings as n, writeSettings as r, assertStudioKey as t };
