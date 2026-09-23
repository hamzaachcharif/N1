import { o as __toESM } from "../_runtime.mjs";
import { t as formatPrice } from "./format-SqI2yd4S.mjs";
import { S as require_jsx_runtime, U as require_react, b as useNavigate, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { c as useCart, s as cartTotal, u as placeOrder } from "./router-o33HPlkN.mjs";
import { t as Button } from "./button-B-gKth2u.mjs";
import { i as Textarea, n as Input, r as NativeSelect, t as Field } from "./field-BojXUj74.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/checkout-Cdu7U3Zu.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
/** Delivery cities — Maghreb wilayas by default; the field also accepts any city. */
var CITIES = [
	"Alger",
	"Oran",
	"Constantine",
	"Annaba",
	"Blida",
	"Setif",
	"Batna",
	"Tlemcen",
	"Bejaia",
	"Tizi Ouzou",
	"Biskra",
	"Bechar",
	"Mostaganem",
	"Tiaret",
	"Ouargla",
	"Skikda",
	"Sidi Bel Abbes",
	"Jijel",
	"Tebessa",
	"El Oued",
	"Ghardaia",
	"Relizane",
	"Chlef",
	"Mascara",
	"Boumerdes",
	"Tipaza",
	"Ain Defla",
	"Medea",
	"Mila",
	"Guelma",
	"Khenchela",
	"Oum El Bouaghi",
	"Souk Ahras",
	"El Tarf",
	"Ain Temouchent",
	"Saida",
	"Tissemsilt",
	"Laghouat",
	"Djelfa",
	"Msila",
	"Bordj Bou Arreridj",
	"Bouira",
	"Adrar",
	"Tamanrasset",
	"Illizi",
	"Tindouf",
	"El Bayadh",
	"Naama",
	"Ouled Djellal",
	"El Mghair",
	"El Menia",
	"Timimoun",
	"Touggourt",
	"Djanet",
	"In Salah",
	"In Guezzam",
	"Beni Abbes"
];
function CheckoutPage() {
	const navigate = useNavigate();
	const items = useCart((s) => s.items);
	const clear = useCart((s) => s.clear);
	const total = cartTotal(items);
	const [pending, setPending] = (0, import_react.useState)(false);
	const [form, setForm] = (0, import_react.useState)({
		name: "",
		phone: "",
		city: "Alger",
		cityOther: "",
		commune: "",
		address: "",
		notes: ""
	});
	async function onSubmit(e) {
		e.preventDefault();
		if (items.length === 0) return;
		const city = form.city === "Other" ? form.cityOther.trim() : form.city;
		if (city.length < 2) {
			toast.error("Enter a city for the courier.");
			return;
		}
		setPending(true);
		try {
			const result = await placeOrder({ data: {
				name: form.name,
				phone: form.phone,
				city,
				commune: form.commune,
				address: form.address,
				notes: form.notes,
				items: items.map((i) => ({
					variantId: i.variantId,
					qty: i.qty
				}))
			} });
			clear();
			toast.success("Order received");
			await navigate({
				to: "/order/$id",
				params: { id: result.publicId }
			});
		} catch (err) {
			const message = err instanceof Error ? err.message : "Could not place the order.";
			toast.error(message);
		} finally {
			setPending(false);
		}
	}
	if (items.length === 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto flex min-h-[60dvh] max-w-xl flex-col items-center justify-center px-4 text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-4xl",
				children: "Nothing to pack"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-sm text-muted",
				children: "Add a piece, then we will take the rest."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/shop",
				className: "mt-8 inline-flex h-11 items-center bg-ink px-6 text-sm text-foam",
				children: "Shop the collection"
			})
		]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto grid max-w-6xl gap-12 px-4 py-12 sm:px-6 lg:grid-cols-12",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "lg:col-span-7",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs uppercase tracking-[0.22em] text-muted",
					children: "Checkout"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-2 font-display text-4xl md:text-5xl",
					children: "Pay on delivery"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 max-w-md text-sm text-muted",
					children: "A courier brings the order. You pay them. We never take a card."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit,
					className: "mt-10 space-y-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Full name",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								required: true,
								autoComplete: "name",
								value: form.name,
								onChange: (e) => setForm({
									...form,
									name: e.target.value
								})
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Phone",
							hint: "The number the courier will call.",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								required: true,
								type: "tel",
								inputMode: "tel",
								autoComplete: "tel",
								placeholder: "05 xx xx xx xx",
								value: form.phone,
								onChange: (e) => setForm({
									...form,
									phone: e.target.value
								})
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-5 sm:grid-cols-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "City / Wilaya",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(NativeSelect, {
									required: true,
									value: form.city,
									onChange: (e) => setForm({
										...form,
										city: e.target.value
									}),
									children: [CITIES.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: c,
										children: c
									}, c)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "Other",
										children: "Other city"
									})]
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Commune",
								hint: "Optional, helps the driver.",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									value: form.commune,
									onChange: (e) => setForm({
										...form,
										commune: e.target.value
									})
								})
							})]
						}),
						form.city === "Other" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "City name",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								required: true,
								value: form.cityOther,
								onChange: (e) => setForm({
									...form,
									cityOther: e.target.value
								})
							})
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Address",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								required: true,
								autoComplete: "street-address",
								placeholder: "Street, building, floor",
								value: form.address,
								onChange: (e) => setForm({
									...form,
									address: e.target.value
								})
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Note for the courier",
							hint: "Gate codes, landmarks, timing.",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
								value: form.notes,
								onChange: (e) => setForm({
									...form,
									notes: e.target.value
								})
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "submit",
							block: true,
							disabled: pending,
							children: pending ? "Sending to the atelier…" : `Place order · ${formatPrice(total)}`
						})
					]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("aside", {
			className: "lg:col-span-5",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "border border-line bg-paper p-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs uppercase tracking-[0.2em] text-muted",
						children: "Your bag"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-5 space-y-4",
						children: items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex gap-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: item.image,
									alt: "",
									className: "h-20 w-14 object-cover bg-canvas"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "min-w-0 flex-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-display text-lg leading-tight",
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
									children: formatPrice(item.price * item.qty)
								})
							]
						}, item.variantId))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-6 flex items-center justify-between border-t border-line pt-4 text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Due to the courier" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "tabular-nums",
							children: formatPrice(total)
						})]
					})
				]
			})
		})]
	});
}
//#endregion
export { CheckoutPage as component };
