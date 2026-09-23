import { o as __toESM } from "../_runtime.mjs";
import { S as require_jsx_runtime, U as require_react } from "../_libs/@tanstack/react-router+[...].mjs";
import { o as cn, r as Route$1 } from "./router-o33HPlkN.mjs";
import { t as ProductCard } from "./card-CP4SMGJw.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/shop-CMI4VjKQ.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ShopPage() {
	const products = Route$1.useLoaderData();
	const collections = (0, import_react.useMemo)(() => {
		return ["All", ...new Set(products.map((p) => p.collection))];
	}, [products]);
	const [filter, setFilter] = (0, import_react.useState)("All");
	const visible = filter === "All" ? products : products.filter((p) => p.collection === filter);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-6xl px-4 py-12 sm:px-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-[11px] uppercase tracking-[0.22em] text-muted",
				children: "Collection"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-2 font-display text-5xl md:text-6xl",
				children: "The new season"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 max-w-xl text-sm leading-relaxed text-muted",
				children: "Eight pieces. Linen, silk, and tailoring. Choose a size and a colour — we hold what is on the rack, nothing more."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-8 flex flex-wrap gap-2",
				children: collections.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => setFilter(c),
					className: cn("h-10 px-4 text-[11px] uppercase tracking-[0.16em] border transition-colors", filter === c ? "border-ink bg-ink text-foam" : "border-line bg-transparent text-muted hover:border-ink hover:text-ink"),
					children: c
				}, c))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-10 grid grid-cols-2 gap-x-4 gap-y-12 md:grid-cols-3 md:gap-x-6",
				children: visible.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductCard, { product: p }, p.id))
			})
		]
	});
}
//#endregion
export { ShopPage as component };
