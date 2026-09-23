import { S as require_jsx_runtime, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/lookbook-BjZfub70.js
var import_jsx_runtime = require_jsx_runtime();
var FRAMES = [
	{
		src: "/lookbook/arch.jpg",
		alt: "Cream linen under a stone arch",
		caption: "Late light, limestone.",
		tall: true
	},
	{
		src: "/products/hero.jpg",
		alt: "Ivory column dress in a courtyard",
		caption: "The column dress, walking.",
		tall: false
	},
	{
		src: "/products/linen-dress.jpg",
		alt: "Linen column dress in studio",
		caption: "Washed linen, a straight line.",
		tall: true
	},
	{
		src: "/products/silk-slip.jpg",
		alt: "Champagne silk midi",
		caption: "Bias silk, no hardware.",
		tall: true
	},
	{
		src: "/products/blazer.jpg",
		alt: "Camel structured blazer",
		caption: "Soft shoulder. Sharp lapel.",
		tall: true
	},
	{
		src: "/products/soft-coat.jpg",
		alt: "Oatmeal unstructured coat",
		caption: "Evenings that start in daylight.",
		tall: true
	}
];
function LookbookPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-6xl px-4 py-12 sm:px-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-[11px] uppercase tracking-[0.22em] text-muted",
				children: "Lookbook"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-2 font-display text-5xl md:text-6xl",
				children: "Quiet colour"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 max-w-lg text-sm leading-relaxed text-muted",
				children: "Photographed in plaster rooms and courtyards. Not a campaign — the clothes as they are worn."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-12 columns-1 gap-4 sm:columns-2 lg:columns-3",
				children: FRAMES.map((frame) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figure", {
					className: "mb-4 break-inside-avoid",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: frame.src,
						alt: frame.alt,
						className: "w-full bg-paper object-cover"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("figcaption", {
						className: "mt-2 text-xs text-muted",
						children: frame.caption
					})]
				}, frame.src))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-16 flex flex-col items-start gap-4 border-t border-line pt-10 sm:flex-row sm:items-center sm:justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-display text-3xl",
					children: "The pieces, in stock."
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/shop",
					className: "inline-flex h-11 items-center bg-ink px-6 text-sm text-foam transition-transform duration-150 active:scale-[0.96]",
					children: "Shop the collection"
				})]
			})
		]
	});
}
//#endregion
export { LookbookPage as component };
