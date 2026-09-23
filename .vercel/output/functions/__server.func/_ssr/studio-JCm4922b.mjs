import { o as __toESM } from "../_runtime.mjs";
import { t as formatPrice } from "./format-SqI2yd4S.mjs";
import { S as require_jsx_runtime, U as require_react, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as createServerFn } from "./ssr.mjs";
import { a as object, i as number, o as string, t as _enum } from "../_libs/zod.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { d as retryDispatch, f as setOrderStatus, l as listStudioOrders, o as cn, p as createSsrRpc } from "./router-o33HPlkN.mjs";
import { t as Button } from "./button-B-gKth2u.mjs";
import { t as SIZES } from "./types-COnd5rv_.mjs";
import { n as Input, r as NativeSelect, t as Field } from "./field-BojXUj74.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/studio-JCm4922b.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var unlockStudio = createServerFn({ method: "POST" }).validator(object({ studioKey: string() })).handler(createSsrRpc("2b5324f8a8fd685b00a21598f9100f38cb7a9d9c4b6237b27edca5a85ef3cd7f"));
var getStudioSettings = createServerFn({ method: "POST" }).validator(object({ studioKey: string() })).handler(createSsrRpc("7cdbeeb035a832ca5f926f33625f23feb791ee03462a031e03f3263f563c5d7a"));
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
})).handler(createSsrRpc("07a2708e1d066bf79e606c09f2a1d9a4efbd1f8b438d956e4f2413ddc70f1512"));
var listInventory = createServerFn({ method: "POST" }).validator(object({ studioKey: string() })).handler(createSsrRpc("84de6174686c4ea0bd6fea33de4a6bb3bda45aa902b8a4ab17cb1abefb4ffed6"));
var adjustStock = createServerFn({ method: "POST" }).validator(object({
	studioKey: string(),
	variantId: number().int().positive(),
	stock: number().int().min(0).max(999)
})).handler(createSsrRpc("751b74598b32c006aecfa33ceb98922554712970c93cdbb52c56a30904919b8a"));
var KEY_STORAGE = "solene-studio-key";
function StudioPage() {
	const [key, setKey] = (0, import_react.useState)("");
	const [draft, setDraft] = (0, import_react.useState)("");
	const [unlocked, setUnlocked] = (0, import_react.useState)(false);
	const [tab, setTab] = (0, import_react.useState)("orders");
	const [busy, setBusy] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const stored = sessionStorage.getItem(KEY_STORAGE);
		if (!stored) return;
		unlockStudio({ data: { studioKey: stored } }).then(() => {
			setKey(stored);
			setUnlocked(true);
		}).catch(() => {
			sessionStorage.removeItem(KEY_STORAGE);
		});
	}, []);
	async function unlock(e) {
		e.preventDefault();
		setBusy(true);
		try {
			await unlockStudio({ data: { studioKey: draft } });
			sessionStorage.setItem(KEY_STORAGE, draft);
			setKey(draft);
			setUnlocked(true);
		} catch {
			toast.error("That code is not the ledger.");
		} finally {
			setBusy(false);
		}
	}
	if (!unlocked) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-dvh flex-col items-center justify-center bg-canvas px-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/",
				className: "font-display text-2xl tracking-[0.18em]",
				children: "SOLÈNE"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-10 font-display text-4xl",
				children: "Atelier ledger"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-2 max-w-sm text-center text-sm text-muted",
				children: [
					"Inventory, orders, and the delivery partner. Preview code:",
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-ink",
						children: "atelier"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit: unlock,
				className: "mt-8 w-full max-w-xs space-y-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Ledger code",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						type: "password",
						value: draft,
						onChange: (e) => setDraft(e.target.value),
						autoFocus: true
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "submit",
					block: true,
					disabled: busy,
					children: "Enter"
				})]
			})
		]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-dvh bg-canvas text-ink",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "border-b border-line",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-display text-xl tracking-[0.14em]",
					children: "SOLÈNE"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs uppercase tracking-[0.18em] text-muted",
					children: "Atelier ledger"
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/",
					className: "text-xs uppercase tracking-[0.16em] text-muted hover:text-ink",
					children: "View the house"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mx-auto flex max-w-6xl gap-2 px-4 pb-3 sm:px-6",
				children: [
					["orders", "Orders"],
					["stock", "Inventory"],
					["carrier", "Delivery partner"]
				].map(([id, label]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => setTab(id),
					className: cn("h-10 px-4 text-xs uppercase tracking-[0.16em] border", tab === id ? "border-ink bg-ink text-foam" : "border-line text-muted"),
					children: label
				}, id))
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-6xl px-4 py-8 sm:px-6",
			children: [
				tab === "orders" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OrdersPanel, { studioKey: key }) : null,
				tab === "stock" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StockPanel, { studioKey: key }) : null,
				tab === "carrier" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CarrierPanel, { studioKey: key }) : null
			]
		})]
	});
}
function OrdersPanel({ studioKey }) {
	const [orders, setOrders] = (0, import_react.useState)(null);
	async function load() {
		const rows = await listStudioOrders({ data: { studioKey } });
		setOrders(rows);
	}
	(0, import_react.useEffect)(() => {
		load().catch((err) => toast.error(String(err)));
	}, [studioKey]);
	if (!orders) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-sm text-muted",
		children: "Loading the book…"
	});
	if (orders.length === 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-sm text-muted",
		children: "No orders yet. The first one will land here."
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "space-y-4",
		children: orders.map((order) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
			className: "border border-line bg-paper p-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-start justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-display text-2xl",
							children: order.publicId
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-1 text-sm text-muted",
							children: [
								order.city,
								order.commune ? ` · ${order.commune}` : "",
								" · ",
								formatPrice(order.total)
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-1 text-sm",
							children: [
								order.customerName,
								" · ",
								order.phone
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-xs text-subtle",
							children: order.address
						})
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-xs uppercase tracking-[0.16em] text-muted",
						children: order.status
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-4 text-sm text-muted",
					children: order.items.map((item, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
						item.name,
						" · ",
						item.color,
						" / ",
						item.size,
						" ×",
						item.qty
					] }, `${item.name}-${i}`))
				}),
				order.carrierRef ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-3 text-xs text-ok",
					children: ["Carrier ref ", order.carrierRef]
				}) : null,
				order.carrierError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-xs text-danger",
					children: order.carrierError
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 flex flex-wrap gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "outline",
							onClick: async () => {
								try {
									const result = await retryDispatch({ data: {
										studioKey,
										publicId: order.publicId
									} });
									if (result.ok) toast.success("Sent to the partner");
									else toast.error(result.error ?? "Dispatch failed");
									await load();
								} catch (err) {
									toast.error(err instanceof Error ? err.message : "Failed");
								}
							},
							children: "Send to partner"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "ghost",
							onClick: async () => {
								await setOrderStatus({ data: {
									studioKey,
									publicId: order.publicId,
									status: "delivered"
								} });
								await load();
							},
							children: "Mark delivered"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "ghost",
							onClick: async () => {
								await setOrderStatus({ data: {
									studioKey,
									publicId: order.publicId,
									status: "cancelled"
								} });
								toast.success("Cancelled — stock returned");
								await load();
							},
							children: "Cancel & restock"
						})
					]
				})
			]
		}, order.publicId))
	});
}
function StockPanel({ studioKey }) {
	const [rows, setRows] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		listInventory({ data: { studioKey } }).then(setRows).catch((err) => toast.error(String(err)));
	}, [studioKey]);
	const grouped = (0, import_react.useMemo)(() => {
		if (!rows) return [];
		const map = /* @__PURE__ */ new Map();
		for (const row of rows) {
			const list = map.get(row.name) ?? [];
			list.push(row);
			map.set(row.name, list);
		}
		return [...map.entries()];
	}, [rows]);
	if (!rows) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-sm text-muted",
		children: "Counting the rack…"
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "space-y-10",
		children: grouped.map(([name, variants]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-4 flex items-center gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: variants[0]?.image,
				alt: "",
				className: "h-14 w-10 object-cover bg-paper"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-2xl",
				children: name
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "overflow-x-auto",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
				className: "w-full min-w-[520px] text-left text-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
					className: "text-xs uppercase tracking-[0.16em] text-muted",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
						className: "pb-2 font-medium",
						children: "Colour"
					}), SIZES.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
						className: "pb-2 font-medium",
						children: s
					}, s))]
				}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: [...new Set(variants.map((v) => v.color))].map((color) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
					className: "border-t border-line",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						className: "py-3",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "inline-flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "size-3 rounded-full border border-line",
								style: { background: variants.find((v) => v.color === color)?.colorHex }
							}), color]
						})
					}), SIZES.map((size) => {
						const v = variants.find((x) => x.color === color && x.size === size);
						if (!v) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {}, size);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "py-3",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "number",
								min: 0,
								max: 999,
								defaultValue: v.stock,
								className: cn("h-11 w-16 border bg-paper px-2 tabular-nums outline-none", v.stock === 0 ? "border-danger/40 text-danger" : "border-line"),
								onBlur: async (e) => {
									const stock = Math.max(0, Number(e.target.value) || 0);
									await adjustStock({ data: {
										studioKey,
										variantId: v.id,
										stock
									} });
									toast.success(`${v.sku} → ${stock}`);
								}
							})
						}, size);
					})]
				}, color)) })]
			})
		})] }, name))
	});
}
function CarrierPanel({ studioKey }) {
	const [form, setForm] = (0, import_react.useState)({
		carrierMode: "demo",
		carrierUrl: "",
		carrierApiId: "",
		carrierToken: "",
		fromCity: "Alger",
		whatsapp: "",
		instagram: ""
	});
	const [loaded, setLoaded] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		getStudioSettings({ data: { studioKey } }).then((s) => {
			setForm({
				carrierMode: s.carrierMode,
				carrierUrl: s.carrierUrl,
				carrierApiId: s.carrierApiId,
				carrierToken: s.carrierToken,
				fromCity: s.fromCity,
				whatsapp: s.whatsapp,
				instagram: s.instagram
			});
			setLoaded(true);
		}).catch((err) => toast.error(String(err)));
	}, [studioKey]);
	if (!loaded) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-sm text-muted",
		children: "Opening the partner file…"
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		className: "max-w-xl space-y-5",
		onSubmit: async (e) => {
			e.preventDefault();
			await saveStudioSettings({ data: {
				studioKey,
				...form
			} });
			toast.success("Partner settings saved");
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm leading-relaxed text-muted",
				children: "You do not need Shopify payments or shipping. Pick how each new order is handed to the company that delivers and collects cash for you."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Mode",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(NativeSelect, {
					value: form.carrierMode,
					onChange: (e) => setForm({
						...form,
						carrierMode: e.target.value
					}),
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "demo",
							children: "Demo — keep orders here only"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "yalidine",
							children: "Yalidine (Algeria)"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "webhook",
							children: "Custom webhook / any API"
						})
					]
				})
			}),
			form.carrierMode === "yalidine" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Yalidine API ID",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						value: form.carrierApiId,
						onChange: (e) => setForm({
							...form,
							carrierApiId: e.target.value
						})
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Yalidine API token",
					hint: "Leave the dots to keep the saved token.",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						value: form.carrierToken,
						onChange: (e) => setForm({
							...form,
							carrierToken: e.target.value
						})
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "From wilaya",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						value: form.fromCity,
						onChange: (e) => setForm({
							...form,
							fromCity: e.target.value
						})
					})
				})
			] }) : null,
			form.carrierMode === "webhook" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Webhook URL",
				hint: "We POST JSON: customer, city, items, cod_amount.",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					value: form.carrierUrl,
					onChange: (e) => setForm({
						...form,
						carrierUrl: e.target.value
					}),
					placeholder: "https://partner.example.com/orders"
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Bearer token (optional)",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					value: form.carrierToken,
					onChange: (e) => setForm({
						...form,
						carrierToken: e.target.value
					})
				})
			})] }) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "WhatsApp (optional)",
				hint: "Shown later as a second order path.",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					value: form.whatsapp,
					onChange: (e) => setForm({
						...form,
						whatsapp: e.target.value
					}),
					placeholder: "2135xxxxxxxx"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Instagram handle",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					value: form.instagram,
					onChange: (e) => setForm({
						...form,
						instagram: e.target.value
					}),
					placeholder: "solene.atelier"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				type: "submit",
				children: "Save partner"
			})
		]
	});
}
//#endregion
export { StudioPage as component };
