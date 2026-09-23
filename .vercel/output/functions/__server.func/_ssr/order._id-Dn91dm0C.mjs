import { t as formatPrice } from "./format-SqI2yd4S.mjs";
import { S as require_jsx_runtime, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as Route$2 } from "./router-o33HPlkN.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/order._id-Dn91dm0C.js
var import_jsx_runtime = require_jsx_runtime();
var STATUS = {
	new: "Received — waiting for the courier pickup",
	dispatched: "Handed to the delivery partner",
	delivered: "Delivered",
	cancelled: "Cancelled",
	failed: "Held — the atelier will retry dispatch"
};
function OrderPage() {
	const order = Route$2.useLoaderData();
	if (!order) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-lg px-4 py-24 text-center",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "font-display text-4xl",
			children: "Order not found"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/shop",
			className: "mt-6 inline-block text-sm underline underline-offset-4",
			children: "Return to the shop"
		})]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-2xl px-4 py-16 sm:px-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-[11px] uppercase tracking-[0.22em] text-muted",
				children: "Confirmation"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-2 font-display text-5xl",
				children: "It is on its way to the rack."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 text-sm text-muted",
				children: "Keep this number. The courier will call the phone you left."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-6 font-display text-3xl tracking-[0.08em]",
				children: order.publicId
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm text-ink",
				children: STATUS[order.status] ?? order.status
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-1 text-sm text-muted",
				children: [
					order.city,
					" · ",
					formatPrice(order.total),
					" due on delivery"
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-10 space-y-4 border-t border-line pt-8",
				children: order.items.map((item, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "flex gap-4",
					children: [
						item.image ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: item.image,
							alt: "",
							className: "h-20 w-14 object-cover bg-paper"
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-display text-xl",
								children: item.name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-xs text-muted",
								children: [
									item.color,
									" · ",
									item.size,
									" · ×",
									item.qty
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm tabular-nums",
							children: formatPrice(item.unitPrice * item.qty)
						})
					]
				}, `${item.name}-${i}`))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/shop",
				className: "mt-12 inline-flex h-11 items-center border border-ink px-6 text-sm",
				children: "Continue browsing"
			})
		]
	});
}
//#endregion
export { OrderPage as component };
