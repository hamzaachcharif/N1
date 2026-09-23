import { o as __toESM } from "./_runtime.mjs";
import { t as formatPrice } from "./_ssr/format-SqI2yd4S.mjs";
import { S as require_jsx_runtime, U as require_react, y as Link } from "./_libs/@tanstack/react-router+[...].mjs";
import { n as toast } from "./_libs/sonner.mjs";
import { c as useCart, n as Route, o as cn } from "./_ssr/router-o33HPlkN.mjs";
import { t as Button } from "./_ssr/button-B-gKth2u.mjs";
import { t as ProductCard } from "./_ssr/card-CP4SMGJw.mjs";
import { t as SIZES } from "./_ssr/types-COnd5rv_.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_slug-DozkQddx.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ProductPage() {
	const { product, related } = Route.useLoaderData();
	const add = useCart((s) => s.add);
	const colors = product.colors;
	const [color, setColor] = (0, import_react.useState)(colors[0]?.name ?? "");
	const [size, setSize] = (0, import_react.useState)("M");
	const variant = (0, import_react.useMemo)(() => product.variants.find((v) => v.color === color && v.size === size), [
		product.variants,
		color,
		size
	]);
	const sizeStock = (s) => product.variants.find((v) => v.color === color && v.size === s)?.stock ?? 0;
	function onAdd() {
		if (!variant) return;
		if (variant.stock <= 0) {
			toast.error("This size is gone.");
			return;
		}
		add({
			variantId: variant.id,
			productId: product.id,
			slug: product.slug,
			name: product.name,
			image: product.image,
			color: variant.color,
			size: variant.size,
			price: product.price
		});
		toast.success("Added to your bag");
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-6xl px-4 py-10 sm:px-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-[11px] uppercase tracking-[0.2em] text-muted",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/shop",
						className: "hover:text-ink",
						children: "Shop"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "px-2",
						children: "/"
					}),
					product.collection
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 grid gap-10 lg:grid-cols-12",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "lg:col-span-7",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "aspect-[2/3] overflow-hidden bg-paper md:aspect-[4/5]",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: product.image,
							alt: product.name,
							className: "h-full w-full object-cover object-top"
						})
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "lg:col-span-5 lg:pt-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "font-display text-4xl md:text-5xl",
							children: product.name
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm text-muted",
							children: product.tagline
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 text-lg tabular-nums",
							children: formatPrice(product.price)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-xs text-subtle",
							children: "Pay on delivery · no card"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-8",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-[11px] uppercase tracking-[0.18em] text-muted",
								children: ["Colour · ", color]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-3 flex gap-2",
								children: colors.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									"aria-label": c.name,
									onClick: () => setColor(c.name),
									className: cn("size-9 rounded-full border transition-transform duration-150", color === c.name ? "border-ink scale-100" : "border-line"),
									style: { background: c.hex }
								}, c.name))
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-8",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[11px] uppercase tracking-[0.18em] text-muted",
									children: "Size"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-3 grid grid-cols-5 gap-2",
									children: SIZES.map((s) => {
										const gone = sizeStock(s) <= 0;
										return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											disabled: gone,
											onClick: () => setSize(s),
											className: cn("h-11 text-sm border transition-colors", gone && "opacity-30 line-through", size === s && !gone ? "border-ink bg-ink text-foam" : "border-line text-ink hover:border-ink"),
											children: s
										}, s);
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 text-xs text-subtle",
									children: variant ? variant.stock > 0 ? `${variant.stock} in the atelier` : "Sold out in this colour" : "Choose a size"
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							block: true,
							className: "mt-8",
							disabled: !variant || variant.stock <= 0,
							onClick: onAdd,
							children: "Add to bag"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/checkout",
							className: "mt-3 flex h-11 items-center justify-center border border-line text-sm text-ink hover:border-ink",
							children: "Checkout — pay on delivery"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-10 text-sm leading-relaxed text-muted",
							children: product.description
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-6 text-xs uppercase tracking-[0.16em] text-subtle",
							children: "Care"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm text-muted",
							children: product.care
						})
					]
				})]
			}),
			related.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-24",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-3xl",
					children: "Worn with"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-8 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6",
					children: related.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductCard, { product: p }, p.id))
				})]
			}) : null
		]
	});
}
//#endregion
export { ProductPage as component };
