import { t as formatPrice } from "./format-SqI2yd4S.mjs";
import { S as require_jsx_runtime, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as Route$6 } from "./router-o33HPlkN.mjs";
import { t as ProductCard } from "./card-CP4SMGJw.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-BZelKQky.js
var import_jsx_runtime = require_jsx_runtime();
function Home() {
	const products = Route$6.useLoaderData();
	const featured = products.filter((p) => p.featured).slice(0, 4);
	const rest = products.filter((p) => !p.featured).slice(0, 4);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "relative min-h-[88dvh] overflow-hidden bg-ink",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: "/products/hero.jpg",
					alt: "Woman in an ivory linen dress walking through a sunlit courtyard",
					className: "absolute inset-0 h-full w-full object-cover object-[center_20%]"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-ink/35" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "relative mx-auto flex min-h-[88dvh] max-w-6xl flex-col justify-end px-4 pb-16 pt-28 sm:px-6 md:pb-20",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "stagger-in max-w-xl text-foam",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[11px] uppercase tracking-[0.28em]",
								children: "Spring at the atelier"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
								className: "mt-4 font-display text-5xl leading-[0.95] tracking-tight md:text-7xl",
								children: [
									"Cut for the heat.",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
									"Made to last."
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-5 max-w-md text-sm leading-relaxed text-foam/80",
								children: "A small collection of linen, silk and tailoring. Pay when it arrives — paiement à la livraison. No card. No account."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-8 flex flex-wrap gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/shop",
									className: "inline-flex h-11 items-center bg-foam px-6 text-sm font-medium text-ink transition-transform duration-150 active:scale-[0.96]",
									children: "Shop the collection"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/lookbook",
									className: "inline-flex h-11 items-center border border-foam/50 px-6 text-sm text-foam transition-colors hover:bg-foam/10",
									children: "Lookbook"
								})]
							})
						]
					})
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mx-auto max-w-6xl px-4 py-16 sm:px-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-end justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[11px] uppercase tracking-[0.22em] text-muted",
					children: "The edit"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-2 font-display text-4xl md:text-5xl",
					children: "Worn first"
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/shop",
					className: "hidden text-[11px] uppercase tracking-[0.2em] text-muted underline-offset-4 hover:text-ink hover:underline sm:inline",
					children: "All pieces"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-10 grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-4 md:gap-x-6",
				children: featured.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductCard, { product: p }, p.id))
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "border-y border-line bg-paper",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto grid max-w-6xl md:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "relative min-h-[420px] md:min-h-[560px]",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: "/products/silk-slip.jpg",
						alt: "The silk midi",
						className: "absolute inset-0 h-full w-full object-cover object-top"
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col justify-center px-6 py-16 md:px-16",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[11px] uppercase tracking-[0.22em] text-muted",
							children: "How it works"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-3 font-display text-4xl md:text-5xl",
							children: "Order. We pack. You pay the courier."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ol", {
							className: "mt-8 space-y-5 text-sm leading-relaxed text-muted",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-ink",
										children: "01 — Choose size and colour."
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
									"Stock updates as pieces sell, so what you see is what we have."
								] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-ink",
										children: "02 — Leave a phone and a city."
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
									"A delivery partner collects the order from us and brings it to your door."
								] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-ink",
										children: "03 — Pay on delivery."
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
									"Cash to the courier. They settle with the atelier on their cycle.",
									featured[0] ? ` Pieces from ${formatPrice(featured[0].price)}.` : null
								] })
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/shop",
							className: "mt-10 inline-flex h-11 w-fit items-center bg-ink px-6 text-sm text-foam transition-transform duration-150 active:scale-[0.96]",
							children: "Start an order"
						})
					]
				})]
			})
		}),
		rest.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mx-auto max-w-6xl px-4 py-16 sm:px-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-4xl",
				children: "Also in the atelier"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-10 grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-4 md:gap-x-6",
				children: rest.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductCard, { product: p }, p.id))
			})]
		}) : null,
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "mx-auto max-w-6xl px-4 pb-8 sm:px-6",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-px bg-line md:grid-cols-3",
				children: [
					{
						title: "Pay on delivery",
						body: "No card, no prepaid apps. The courier collects."
					},
					{
						title: "Sizes that are real",
						body: "If a size is gone, it is gone. We do not oversell."
					},
					{
						title: "Packed by us",
						body: "Every piece leaves the atelier folded, not stuffed."
					}
				].map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "bg-canvas px-6 py-10",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-2xl",
						children: item.title
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-muted",
						children: item.body
					})]
				}, item.title))
			})
		})
	] });
}
//#endregion
export { Home as component };
