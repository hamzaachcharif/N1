import { n as TSS_SERVER_FUNCTION } from "./ssr.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/db-yHMdolxU.js
var createServerRpc = (serverFnMeta, splitImportFn) => {
	const url = "/_serverFn/" + serverFnMeta.id;
	return Object.assign(splitImportFn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var _0002_boutique_default = "create table if not exists products (\n  id          serial primary key,\n  slug        text not null unique,\n  name        text not null,\n  tagline     text not null,\n  description text not null,\n  care        text not null,\n  price       int not null,\n  image       text not null,\n  collection  text not null,\n  featured    boolean not null default false,\n  sort_order  int not null default 0\n);\n\ncreate table if not exists variants (\n  id         serial primary key,\n  product_id int not null references products(id) on delete cascade,\n  color      text not null,\n  color_hex  text not null,\n  size       text not null,\n  sku        text not null unique,\n  stock      int not null default 0,\n  unique (product_id, color, size)\n);\n\ncreate index if not exists variants_product_id_idx on variants (product_id);\n\ncreate table if not exists orders (\n  id            serial primary key,\n  public_id     text not null unique,\n  customer_name text not null,\n  phone         text not null,\n  city          text not null,\n  commune       text not null default '',\n  address       text not null,\n  notes         text not null default '',\n  status        text not null default 'new',\n  total         int not null,\n  carrier       text not null default 'demo',\n  carrier_ref   text,\n  carrier_error text,\n  created_at    timestamptz not null default now()\n);\n\ncreate index if not exists orders_created_at_idx on orders (created_at desc);\ncreate index if not exists orders_status_idx on orders (status);\n\ncreate table if not exists order_items (\n  id           serial primary key,\n  order_id     int not null references orders(id) on delete cascade,\n  variant_id   int not null,\n  product_name text not null,\n  color        text not null,\n  size         text not null,\n  qty          int not null,\n  unit_price   int not null,\n  image        text not null default ''\n);\n\ncreate table if not exists settings (\n  key   text primary key,\n  value text not null\n);\n\ninsert into products (slug, name, tagline, description, care, price, image, collection, featured, sort_order) values\n(\n  'column-dress',\n  'The Column Dress',\n  'Washed linen, a straight line that moves.',\n  'Cut on the grain in washed European linen. A column that skims rather than clings, with a self-belt you can drop. The dress that starts a season.',\n  'Cold wash. Hang to dry. Press on linen heat. Linen eases with wear — that is the point.',\n  8900,\n  '/products/linen-dress.jpg',\n  'Dresses',\n  true,\n  1\n),\n(\n  'silk-midi',\n  'The Silk Midi',\n  'Bias-cut silk. Evening without the effort.',\n  'A bias-cut silk midi that falls close through the body and eases at the hem. Thin straps, a clean neckline, no hardware. Meant for warm nights and long tables.',\n  'Dry clean, or a cool hand wash in silk soap. Roll in a towel. Never wring.',\n  6400,\n  '/products/silk-slip.jpg',\n  'Dresses',\n  true,\n  2\n),\n(\n  'wide-trouser',\n  'The Wide Trouser',\n  'High rise. Long drape. No stiffness.',\n  'A high-rise wide-leg trouser in a sand wool-blend. Pressed once at the atelier, then left to live. Pockets that actually work. The pair you reach for first.',\n  'Dry clean. Hang. A light steam restores the line.',\n  5200,\n  '/products/wide-trousers.jpg',\n  'Tailoring',\n  true,\n  3\n),\n(\n  'soft-cardigan',\n  'The Soft Cardigan',\n  'Heavy cotton-cashmere. Meant to be lived in.',\n  'An oversized cardigan in a cotton-cashmere blend with real weight. Deep pockets, a rib that holds, sleeves long enough to cover the hands. The layer between seasons.',\n  'Hand wash cold. Dry flat. Do not tumble.',\n  7800,\n  '/products/cardigan.jpg',\n  'Knits',\n  false,\n  4\n),\n(\n  'wrap-blouse',\n  'The Wrap Blouse',\n  'A true wrap. Ties at the waist.',\n  'Fluid viscose with a real wrap front — not a faux placket. Ties once at the waist and falls clean through the hip. Wear it closed, or a little less.',\n  'Cold wash in a bag. Hang. A cool iron on the reverse.',\n  4600,\n  '/products/wrap-blouse.jpg',\n  'Blouses',\n  false,\n  5\n),\n(\n  'structured-blazer',\n  'The Structured Blazer',\n  'Soft shoulder. Sharp lapel.',\n  'A camel wool-blend blazer with a soft shoulder and a lapel that holds. One button, two pockets, a lining that slides. The piece that finishes an outfit without announcing itself.',\n  'Dry clean. Hang on a shaped hanger. Steam the sleeve.',\n  11200,\n  '/products/blazer.jpg',\n  'Tailoring',\n  false,\n  6\n),\n(\n  'midi-skirt',\n  'The Midi Skirt',\n  'Bias silk-blend, a hidden zip.',\n  'A midi skirt cut on the bias in an olive silk-blend. It moves when you walk and sits quiet when you sit. Hidden side zip, clean waist, no slit theatre.',\n  'Dry clean or cool hand wash. Hang. Do not wring.',\n  4900,\n  '/products/midi-skirt.jpg',\n  'Skirts',\n  false,\n  7\n),\n(\n  'soft-coat',\n  'The Soft Coat',\n  'Unstructured. Mid-weight. For evenings that start in daylight.',\n  'An oatmeal coat with almost no construction — just cloth, a collar, and a line. Mid-weight enough for spring nights, long enough to cover a dress. The last thing you put on.',\n  'Dry clean. Brush. Hang. Do not crush in a bag.',\n  14800,\n  '/products/soft-coat.jpg',\n  'Outerwear',\n  true,\n  8\n);\n\ninsert into variants (product_id, color, color_hex, size, sku, stock)\nselect\n  p.id,\n  c.color,\n  c.color_hex,\n  s.size,\n  p.slug || '-' || regexp_replace(lower(c.color), '[^a-z0-9]+', '', 'g') || '-' || lower(s.size),\n  case\n    when s.size = 'XL' then 0\n    when s.size = 'XS' then 3\n    when s.size = 'S' then 7\n    when s.size = 'M' then 11\n    else 6\n  end\nfrom products p\njoin (\n  values\n    ('column-dress', 'Ivory', '#E8DFD2'),\n    ('column-dress', 'Sand', '#C4B49A'),\n    ('silk-midi', 'Champagne', '#D9C7A8'),\n    ('silk-midi', 'Ink', '#2A2622'),\n    ('wide-trouser', 'Sand', '#C4B49A'),\n    ('wide-trouser', 'Ink', '#2A2622'),\n    ('soft-cardigan', 'Cream', '#EDE6DC'),\n    ('soft-cardigan', 'Taupe', '#9C8B78'),\n    ('wrap-blouse', 'Ivory', '#E8DFD2'),\n    ('wrap-blouse', 'Blush', '#D4B8B0'),\n    ('structured-blazer', 'Camel', '#C4A574'),\n    ('structured-blazer', 'Ink', '#2A2622'),\n    ('midi-skirt', 'Olive', '#6B6A4A'),\n    ('midi-skirt', 'Cream', '#EDE6DC'),\n    ('soft-coat', 'Oatmeal', '#D8CDBE'),\n    ('soft-coat', 'Ink', '#2A2622')\n) as c(slug, color, color_hex) on c.slug = p.slug\ncross join (\n  values ('XS'), ('S'), ('M'), ('L'), ('XL')\n) as s(size);\n\ninsert into settings (key, value) values\n  ('studio_key', 'atelier'),\n  ('carrier_mode', 'demo'),\n  ('carrier_url', ''),\n  ('carrier_api_id', ''),\n  ('carrier_token', ''),\n  ('from_city', 'Alger'),\n  ('whatsapp', ''),\n  ('instagram', ''),\n  ('brand_name', 'SOLENE');\n";
/**
* Migration bookkeeping shared by the two appliers — `scripts/migrate.mjs`
* (deploy, `readdir`) and `src/lib/db.ts` (PGLite preview, `import.meta.glob`).
*
* Applied files are keyed by BASENAME, so the same file applies once no matter
* which directory it is globbed from. That is what makes the auth schema safe to
* copy from `migrations/auth/` into `migrations/` when an app turns sign-in on:
* a database that already has `0001_auth.sql` will not re-run it.
*
* Neither applier descends into subdirectories, so `migrations/auth/*.sql` is
* out of scope for both until it is copied up.
*/
/**
* The `_migrations` key for a migration path (or bare filename).
* @param {string} path
* @returns {string}
*/
function migrationName(path) {
	return path.split("/").pop() ?? path;
}
/**
* @param {string} path
* @returns {boolean}
*/
function isMigrationFile(path) {
	return path.endsWith(".sql");
}
/**
* Migrations in `paths` that are not yet in `applied`, in apply order.
* Non-`.sql` entries (a `readdir` also yields `migrations/auth/`) are dropped.
* @param {Iterable<string>} paths
* @param {Iterable<string>} applied
* @returns {Array<{ name: string, path: string }>}
*/
function pendingMigrations(paths, applied) {
	const done = new Set(applied);
	return [...paths].filter(isMigrationFile).map((path) => ({
		name: migrationName(path),
		path
	})).sort((a, b) => a.name.localeCompare(b.name)).filter(({ name }) => !done.has(name));
}
var rawDatabaseUrl = typeof process !== "undefined" ? process.env.DATABASE_URL : void 0;
var databaseUrl = rawDatabaseUrl && rawDatabaseUrl.trim() ? rawDatabaseUrl : void 0;
/**
* Active backend: real **Neon** when `DATABASE_URL` is set (deployed / configured
* sandbox), otherwise a local embedded **PGLite** (Postgres compiled to WASM) so
* the app has a working database even with nothing configured — the live preview
* included. Swap in Neon later by just setting `DATABASE_URL`; no code changes.
*/
var dbSource = databaseUrl ? "neon" : "pglite";
/**
* Init state lives on globalThis as promises: dev HMR creates new instances of
* this module, and two instances racing module-level state would open a second
* pool or run two concurrent PGLite migration passes (whose duplicate
* `_migrations` insert rejects — and would get memoized, poisoning every later
* `getSql()`). A failed init clears its slot so the next call retries.
*/
var globalRef = globalThis;
/**
* Result-type parity: Postgres sends every value as text plus a type OID — the
* JS value is the DRIVER's parsing choice, and pg and PGLite disagree (pg:
* int8 -> string, date -> local-midnight Date; PGLite: int8 -> BigInt, which
* JSON.stringify rejects, date -> UTC Date). Normalize both so preview and
* production return identical, JSON-safe shapes:
*   int8/bigint (incl. count(*)) -> number (past 2^53 loses precision — cast
*                                   `::text` if you ever need huge integers)
*   date                         -> 'YYYY-MM-DD' string
*   interval                     -> Postgres interval text
* numeric already comes back as a string on both (arbitrary precision).
*/
var OID_INT8 = 20;
var OID_DATE = 1082;
var OID_INTERVAL = 1186;
var identity = (v) => v;
/** Wrap a query runner in the tagged-template + `.query()` `Sql` surface. */
function toSql(run) {
	const sql = (async (strings, ...values) => {
		let text = strings[0];
		for (let i = 0; i < values.length; i += 1) text += `$${i + 1}${strings[i + 1]}`;
		return run(text, values);
	});
	sql.query = (text, params = []) => run(text, params);
	return sql;
}
function createNeonSql() {
	globalRef.__pgSqlPromise__ ??= (async () => {
		const { Pool, types } = await import("../_libs/pg.mjs").then((n) => n.t);
		types.setTypeParser(OID_INT8, Number);
		types.setTypeParser(OID_DATE, identity);
		types.setTypeParser(OID_INTERVAL, identity);
		const pool = new Pool({ connectionString: databaseUrl });
		return toSql(async (text, params) => {
			return (await pool.query(text, params)).rows;
		});
	})().catch((err) => {
		globalRef.__pgSqlPromise__ = void 0;
		throw err;
	});
	return globalRef.__pgSqlPromise__;
}
async function createPgliteSql() {
	globalRef.__pgliteInstance__ ??= (async () => {
		const { PGlite } = await import("../_libs/electric-sql__pglite.mjs").then((n) => n.t);
		const pg = new PGlite({ parsers: {
			[OID_INT8]: Number,
			[OID_DATE]: identity,
			[OID_INTERVAL]: identity
		} });
		await pg.waitReady;
		await pg.exec("create table if not exists _migrations (name text primary key, applied_at timestamptz not null default now())");
		return pg;
	})().catch((err) => {
		globalRef.__pgliteInstance__ = void 0;
		throw err;
	});
	const pg = await globalRef.__pgliteInstance__;
	const migrate = async () => {
		const migrations = /* #__PURE__ */ Object.assign({ "/migrations/0002_boutique.sql": _0002_boutique_default });
		const done = (await pg.query("select name from _migrations")).rows.map((r) => r.name);
		for (const { name, path } of pendingMigrations(Object.keys(migrations), done)) await pg.transaction(async (tx) => {
			await tx.exec(migrations[path]);
			await tx.query("insert into _migrations (name) values ($1)", [name]);
		});
	};
	const pass = (globalRef.__pgliteMigrateChain__ ?? Promise.resolve()).catch(() => void 0).then(migrate);
	globalRef.__pgliteMigrateChain__ = pass;
	await pass;
	return toSql(async (text, params) => {
		return (await pg.query(text, params)).rows;
	});
}
var sqlPromise = null;
async function createSql() {
	if (typeof window !== "undefined") throw new Error("@/lib/db is server-only — call getSql() from a createServerFn handler or a server route loader, never from client code.");
	return dbSource === "neon" ? createNeonSql() : createPgliteSql();
}
/**
* Get the shared, **server-only** SQL client. Neon when `DATABASE_URL` is set,
* otherwise the local PGLite fallback. Memoized — safe to call per request.
*
* Schema comes from `migrations/*.sql`, auto-applied before the first query on
* both backends — define tables there, never inline in server functions.
*/
function getSql() {
	sqlPromise ??= createSql().catch((err) => {
		sqlPromise = null;
		throw err;
	});
	return sqlPromise;
}
/**
* Finish DB bootstrap before the server handles traffic.
*
* - **PGLite** (preview / no `DATABASE_URL`): open the in-memory DB and apply
*   `migrations/*.sql`. Idempotent — concurrent callers share one promise.
* - **Neon**: no-op (pool is created lazily on first query).
*
* Vite `configureServer` awaits this at dev startup; production imports of this
* module kick it off immediately (see bottom of file).
*/
function ensureDbReady() {
	if (dbSource !== "pglite") return Promise.resolve();
	return getSql().then(() => void 0);
}
var globalBoot = globalThis;
if (typeof window === "undefined" && dbSource === "pglite") globalBoot.__pgBootstrapPromise__ ??= ensureDbReady().catch((err) => {
	globalBoot.__pgBootstrapPromise__ = void 0;
	console.error("[db] PGLite bootstrap failed:", err);
	throw err;
});
//#endregion
export { getSql as n, createServerRpc as t };
