import { t as formatPrice } from "./format-SqI2yd4S.mjs";
import { S as require_jsx_runtime, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/card-CP4SMGJw.js
var import_jsx_runtime = require_jsx_runtime();
function ProductCard({ product }) {
	const soldOut = product.totalStock <= 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
		to: "/shop/$slug",
		params: { slug: product.slug },
		className: "group block",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative aspect-[2/3] overflow-hidden bg-paper",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: product.image,
					alt: product.name,
					className: "h-full w-full object-cover transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
				}), soldOut ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "absolute left-3 top-3 bg-paper/90 px-2 py-1 text-[10px] uppercase tracking-[0.16em] text-ink",
					children: "Waitlist"
				}) : null]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-display text-xl leading-tight",
					children: product.name
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-1 flex items-baseline justify-between gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted",
						children: product.collection
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "shrink-0 text-sm tabular-nums whitespace-nowrap",
						children: formatPrice(product.price)
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-2 flex gap-1.5",
				children: product.colors.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					title: c.name,
					className: "size-2.5 rounded-full border border-line-strong",
					style: { background: c.hex }
				}, c.name))
			})
		]
	});
}
//#endregion
export { ProductCard as t };
