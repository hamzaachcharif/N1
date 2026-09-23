import { o as __toESM } from "../_runtime.mjs";
import { n as isValidPhone, t as formatPrice } from "./format-SqI2yd4S.mjs";
import { H as notFound, S as require_jsx_runtime, U as require_react, _ as createFileRoute, d as HeadContent, f as useRouterState, g as lazyRouteComponent, h as Outlet, m as createRouter, u as Scripts, v as createRootRoute, x as useRouter, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as TSS_SERVER_FUNCTION, r as getServerFnById, t as createServerFn } from "./ssr.mjs";
import { a as object, i as number, n as array, o as string, r as literal, s as union, t as _enum } from "../_libs/zod.mjs";
import { t as Toaster } from "../_libs/sonner.mjs";
import { a as Menu, i as Minus, n as ShoppingBag, r as Plus, t as X } from "../_libs/lucide-react.mjs";
import { n as create, t as persist } from "../_libs/zustand.mjs";
import { t as clsx } from "../_libs/clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/createSsrRpc-C1p7zOu_.js
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/catalog-CJFGGtyS.js
var listProducts = createServerFn({ method: "GET" }).handler(createSsrRpc("2f3cb902609e50ac96044f7e96228fa2f59f70d4c357ba5479010af2a225aea2"));
var getProduct = createServerFn({ method: "GET" }).validator(object({ slug: string().min(1) })).handler(createSsrRpc("156b687369b554bbe5eac173a37fb87e373f38706d45f3e72a364fbc9126b6f3"));
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/orders-Te6RKO-R.js
var itemSchema = object({
	variantId: number().int().positive(),
	qty: number().int().min(1).max(8)
});
var placeSchema = object({
	name: string().trim().min(2).max(80),
	phone: string().trim().min(8).max(20),
	city: string().trim().min(2).max(80),
	commune: string().trim().max(80).optional().default(""),
	address: string().trim().min(6).max(200),
	notes: string().trim().max(240).optional().default(""),
	items: array(itemSchema).min(1).max(20)
});
var placeOrder = createServerFn({ method: "POST" }).validator((data) => {
	const parsed = placeSchema.safeParse(data);
	if (!parsed.success) throw new Error("Please complete the delivery details.");
	if (!isValidPhone(parsed.data.phone)) throw new Error("Enter a valid phone number for the courier.");
	return parsed.data;
}).handler(createSsrRpc("eff383686543aaf1d3781cf0aaa6a0b80974ddd9537d83f9cfc933b88b01f00f"));
var getPublicOrder = createServerFn({ method: "GET" }).validator(object({ publicId: string().min(4) })).handler(createSsrRpc("4c661bf1adc35a644d49683c3f5c7c55911475bb103b3c6b8eb953d29d587d4c"));
var listStudioOrders = createServerFn({ method: "POST" }).validator(object({ studioKey: string() })).handler(createSsrRpc("da48fafc470f0a0b7bf4ce174c209e391ba8929139947da4bbd1e02dadea1687"));
var retryDispatch = createServerFn({ method: "POST" }).validator(object({
	studioKey: string(),
	publicId: string()
})).handler(createSsrRpc("58fdb3cf41d60dd3d49fe51603a5da607132d1e46db6965a10e33989283f9d58"));
var setOrderStatus = createServerFn({ method: "POST" }).validator(object({
	studioKey: string(),
	publicId: string(),
	status: _enum([
		"new",
		"dispatched",
		"delivered",
		"cancelled",
		"failed"
	])
})).handler(createSsrRpc("5d43cd48ea10e76b50e9db85a285d0f6c281ec9368424b9c0818238a0f33dd84"));
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/router-o33HPlkN.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var __defProp = Object.defineProperty;
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
var FALLBACK_MESSAGE = "Something slipped at the atelier. Try again.";
function errorMessage(error) {
	if (error instanceof Error && error.message) return error.message;
	if (typeof error === "string" && error) return error;
	return FALLBACK_MESSAGE;
}
function AppErrorComponent({ error }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "flex min-h-screen flex-col items-center justify-center gap-4 bg-canvas px-6 text-center text-ink",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs uppercase tracking-[0.22em] text-muted",
				children: "A snag"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-4xl",
				children: "The page did not make it"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "max-w-md text-sm break-words text-muted",
				children: errorMessage(error)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/",
				className: "mt-4 inline-flex h-11 items-center bg-ink px-6 text-sm text-foam",
				children: "Back to the house"
			})
		]
	});
}
/**
* App-wide client provider mounted once near the root (in `src/routes/__root.tsx`):
*
*   <AuthProvider><Outlet /></AuthProvider>
*
* Better Auth's React client (`@/lib/auth/client`) needs NO context provider —
* its `useSession()` works standalone — so this is a passthrough today. It's
* kept as the single, stable mount point for any future client-side providers
* (e.g. a toast or theme provider) without churning the root shell.
*/
function AuthProvider({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
}
var CONNECTOR_TOKEN_READY_EVENT = "grok:connector-token-ready";
function isGrokEmbedderOrigin(origin) {
	try {
		const url = new URL(origin);
		if (url.protocol !== "https:" && url.protocol !== "http:") return false;
		const host = url.hostname.toLowerCase();
		if (host === "grok.com" || host.endsWith(".grok.com")) return true;
		if (host === "localhost" || host === "127.0.0.1" || host === "[::1]") return true;
		return false;
	} catch {
		return false;
	}
}
function isSandboxPreviewGuestHost(hostname) {
	const host = hostname.toLowerCase();
	return host === "grok-sandbox.com" || host.endsWith(".grok-sandbox.com");
}
function isRemintPreviewPair(guestHost, parentHost) {
	const guest = guestHost.toLowerCase();
	const parent = parentHost.toLowerCase();
	const i = guest.indexOf(".preview.");
	if (i <= 0) return false;
	const label = guest.slice(0, i);
	const rest = guest.slice(i + 9);
	if (label.includes(".") || !rest.includes(".")) return false;
	return parent === rest || parent === `grok.${rest}`;
}
function resolveParentEmbedderOrigin(parentIsSelf, referrer, ancestorOrigin, guestHostname = "") {
	if (parentIsSelf) return null;
	for (const candidate of [referrer, ancestorOrigin ?? ""].filter(Boolean)) try {
		const url = new URL(candidate.includes("://") ? candidate : `https://${candidate}`);
		if (url.protocol !== "https:" && url.protocol !== "http:") continue;
		if (isGrokEmbedderOrigin(url.origin)) return url.origin;
		if (isSandboxPreviewGuestHost(guestHostname) || isRemintPreviewPair(guestHostname, url.hostname)) return url.origin;
	} catch {}
	return null;
}
/**
* Guest side of the grok-web ↔ sandbox preview postMessage bridge.
*
* Activates only when this page is framed by an allowlisted Grok embedder.
* Top-level runs (download/export, local `npm run dev`, deployed sites) noop.
*/
var PREVIEW_BRIDGE_CHANNEL = "grok-preview-bridge";
var EnvelopeSchema = object({
	channel: literal(PREVIEW_BRIDGE_CHANNEL),
	version: number().int().positive(),
	type: string().min(1)
});
var HelloSchema = EnvelopeSchema.extend({ type: literal("hello") });
var NavigateSchema = EnvelopeSchema.extend({
	type: literal("navigate"),
	path: string().min(1)
});
var HistorySchema = EnvelopeSchema.extend({
	type: literal("history"),
	delta: union([literal(-1), literal(1)])
});
var ConnectorTokenReadySchema = EnvelopeSchema.extend({ type: literal("connector-token-ready") });
function isSafeBridgePath(path) {
	if (!path.startsWith("/") || path.startsWith("//") || path.includes("\\")) return false;
	try {
		return new URL(path, "https://preview.invalid").origin === "https://preview.invalid";
	} catch {
		return false;
	}
}
/**
* Origin of the Grok embedder framing this page, or null when the page runs
* top-level (download/export, local `npm run dev`, deployed sites) or under a
* non-Grok parent. Client-only; null during SSR.
*/
function resolveCurrentEmbedderOrigin() {
	if (typeof window === "undefined") return null;
	const ancestorOrigin = typeof location.ancestorOrigins !== "undefined" && location.ancestorOrigins.length > 0 ? location.ancestorOrigins[0] : null;
	return resolveParentEmbedderOrigin(window.parent === window, document.referrer, ancestorOrigin, window.location.hostname);
}
/**
* Install host↔guest messaging. Returns a dispose function.
* Noops (returns a no-op dispose) when not embedded under a Grok parent.
*/
function installPreviewHostBridge(options = {}) {
	const parentOrigin = resolveCurrentEmbedderOrigin();
	if (parentOrigin === null) return () => {};
	const ROOT_STATE_KEY = "__grokPreviewBridgeRoot";
	const originalPushState = window.history.pushState.bind(window.history);
	const originalReplaceState = window.history.replaceState.bind(window.history);
	const isAtHistoryRoot = () => {
		const state = window.history.state;
		return Boolean(state && typeof state === "object" && state[ROOT_STATE_KEY] === true);
	};
	try {
		const current = window.history.state;
		if (!(current !== null && typeof current === "object" && Object.prototype.hasOwnProperty.call(current, ROOT_STATE_KEY))) {
			const isRoot = window.history.length <= 1;
			originalReplaceState(current && typeof current === "object" ? {
				...current,
				[ROOT_STATE_KEY]: isRoot
			} : { [ROOT_STATE_KEY]: isRoot }, "", window.location.href);
		}
	} catch {}
	const post = (message) => {
		window.parent.postMessage(message, parentOrigin);
	};
	const reportLocation = () => {
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "location",
			path: window.location.pathname || "/",
			search: window.location.search,
			hash: window.location.hash
		});
	};
	const reportRoutes = () => {
		const paths = options.getRoutePaths?.() ?? [];
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "routes",
			paths
		});
	};
	const defaultNavigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		try {
			const url = new URL(path, window.location.origin);
			if (url.origin !== window.location.origin) return;
			const next = `${url.pathname}${url.search}${url.hash}`;
			window.history.pushState(window.history.state, "", next);
			window.dispatchEvent(new PopStateEvent("popstate", { state: window.history.state }));
		} catch {}
	};
	const navigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		if (options.navigate) {
			options.navigate(path);
			return;
		}
		defaultNavigate(path);
	};
	const announce = () => {
		reportLocation();
		reportRoutes();
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "ready"
		});
	};
	const onHello = (data) => {
		if (!HelloSchema.safeParse(data).success) return;
		announce();
	};
	const onNavigate = (data) => {
		const parsed = NavigateSchema.safeParse(data);
		if (!parsed.success) return;
		navigate(parsed.data.path);
		queueMicrotask(reportLocation);
	};
	const onHistory = (data) => {
		const parsed = HistorySchema.safeParse(data);
		if (!parsed.success) return;
		if (parsed.data.delta === -1 && isAtHistoryRoot()) return;
		window.history.go(parsed.data.delta);
	};
	const onConnectorTokenReady = (data) => {
		if (!ConnectorTokenReadySchema.safeParse(data).success) return;
		window.dispatchEvent(new Event(CONNECTOR_TOKEN_READY_EVENT));
	};
	const hostMessageHandlers = /* @__PURE__ */ new Map([
		["hello", onHello],
		["navigate", onNavigate],
		["history", onHistory],
		["connector-token-ready", onConnectorTokenReady]
	]);
	const onMessage = (event) => {
		if (event.source !== window.parent) return;
		if (event.origin !== parentOrigin) return;
		const envelope = EnvelopeSchema.safeParse(event.data);
		if (!envelope.success || envelope.data.version !== 1) return;
		hostMessageHandlers.get(envelope.data.type)?.(event.data);
	};
	const onPopState = () => {
		reportLocation();
	};
	const onHashChange = () => {
		reportLocation();
	};
	window.history.pushState = (data, unused, url) => {
		const next = data && typeof data === "object" ? {
			...data,
			[ROOT_STATE_KEY]: false
		} : data;
		originalPushState(next, unused, url);
		reportLocation();
	};
	window.history.replaceState = (data, unused, url) => {
		const next = isAtHistoryRoot() ? {
			...data && typeof data === "object" ? data : {},
			[ROOT_STATE_KEY]: true
		} : data;
		originalReplaceState(next, unused, url);
		reportLocation();
	};
	window.addEventListener("message", onMessage);
	window.addEventListener("popstate", onPopState);
	window.addEventListener("hashchange", onHashChange);
	announce();
	return () => {
		window.removeEventListener("message", onMessage);
		window.removeEventListener("popstate", onPopState);
		window.removeEventListener("hashchange", onHashChange);
		window.history.pushState = originalPushState;
		window.history.replaceState = originalReplaceState;
	};
}
/** Collect static path patterns from a TanStack route tree (best-effort). */
function collectRoutePathsFromTree(routeTree) {
	const paths = /* @__PURE__ */ new Set();
	const walk = (node) => {
		if (!node || typeof node !== "object") return;
		const record = node;
		const full = typeof record.fullPath === "string" ? record.fullPath : typeof record.path === "string" ? record.path : null;
		if (full !== null && full !== "") paths.add(full.startsWith("/") ? full : `/${full}`);
		else if (full === "") paths.add("/");
		const children = record.children;
		if (Array.isArray(children)) for (const child of children) walk(child);
		else if (children && typeof children === "object") for (const child of Object.values(children)) walk(child);
	};
	walk(routeTree);
	return [...paths];
}
/**
* Mount once in `__root.tsx` so the Grok preview chrome can drive navigation
* (and later receive registered routes). Noops when the app is not embedded.
*/
function PreviewHostBridge() {
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		return installPreviewHostBridge({
			navigate: (path) => {
				router.history.push(path);
			},
			getRoutePaths: () => collectRoutePathsFromTree(router.routeTree)
		});
	}, [router]);
	return null;
}
var useCart = create()(persist((set, get) => ({
	items: [],
	open: false,
	setOpen: (open) => set({ open }),
	add: (item, qty = 1) => {
		const existing = get().items.find((i) => i.variantId === item.variantId);
		const nextQty = (existing?.qty ?? 0) + qty;
		set({
			items: existing ? get().items.map((i) => i.variantId === item.variantId ? {
				...i,
				qty: nextQty
			} : i) : [...get().items, {
				...item,
				qty
			}],
			open: true
		});
	},
	setQty: (variantId, qty) => {
		if (qty <= 0) {
			set({ items: get().items.filter((i) => i.variantId !== variantId) });
			return;
		}
		set({ items: get().items.map((i) => i.variantId === variantId ? {
			...i,
			qty
		} : i) });
	},
	remove: (variantId) => set({ items: get().items.filter((i) => i.variantId !== variantId) }),
	clear: () => set({ items: [] })
}), {
	name: "solene-cart",
	partialize: (s) => ({ items: s.items })
}));
function cartCount(items) {
	return items.reduce((n, i) => n + i.qty, 0);
}
function cartTotal(items) {
	return items.reduce((n, i) => n + i.price * i.qty, 0);
}
function CartDrawer() {
	const { items, open, setOpen, setQty, remove } = useCart();
	const count = cartCount(items);
	const total = cartTotal(items);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		className: `fixed inset-0 z-50 bg-ink/30 transition-opacity duration-250 ${open ? "opacity-100" : "pointer-events-none opacity-0"}`,
		onClick: () => setOpen(false),
		"aria-label": "Close bag",
		tabIndex: open ? 0 : -1
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
		className: `fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col bg-paper shadow-xl transition-transform duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] ${open ? "translate-x-0" : "translate-x-full"}`,
		"aria-hidden": !open,
		"aria-label": "Shopping bag",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex h-16 items-center justify-between border-b border-line px-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-xs uppercase tracking-[0.2em]",
					children: ["Bag ", count > 0 ? `· ${count}` : ""]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "flex size-11 items-center justify-center",
					onClick: () => setOpen(false),
					"aria-label": "Close bag",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-5" })
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex-1 overflow-y-auto px-5 py-6",
				children: items.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex h-full flex-col items-center justify-center text-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-display text-3xl",
							children: "Your bag is empty"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm text-muted",
							children: "The new season is waiting."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/shop",
							onClick: () => setOpen(false),
							className: "mt-8 inline-flex h-11 items-center bg-ink px-6 text-sm font-medium text-foam transition-transform duration-150 active:scale-[0.96]",
							children: "Shop the collection"
						})
					]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "space-y-6",
					children: items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/shop/$slug",
							params: { slug: item.slug },
							onClick: () => setOpen(false),
							className: "block h-28 w-20 shrink-0 overflow-hidden bg-canvas",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: item.image,
								alt: item.name,
								className: "h-full w-full object-cover"
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0 flex-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-start justify-between gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-display text-lg leading-tight",
									children: item.name
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mt-1 text-xs text-muted",
									children: [
										item.color,
										" · ",
										item.size
									]
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm tabular-nums",
									children: formatPrice(item.price)
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-3 flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "inline-flex items-center border border-line",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											className: "flex size-9 items-center justify-center",
											onClick: () => setQty(item.variantId, item.qty - 1),
											"aria-label": "Decrease",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Minus, { className: "size-3.5" })
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "w-6 text-center text-sm tabular-nums",
											children: item.qty
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											className: "flex size-11 items-center justify-center sm:size-9",
											onClick: () => setQty(item.variantId, item.qty + 1),
											"aria-label": "Increase",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-3.5" })
										})
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									className: "text-xs uppercase tracking-[0.16em] text-subtle hover:text-ink",
									onClick: () => remove(item.variantId),
									children: "Remove"
								})]
							})]
						})]
					}, item.variantId))
				})
			}),
			items.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "border-t border-line p-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-4 flex items-center justify-between text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-muted",
							children: "Pay on delivery"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "tabular-nums",
							children: formatPrice(total)
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/checkout",
						onClick: () => setOpen(false),
						className: "flex h-11 w-full items-center justify-center bg-ink text-sm font-medium text-foam transition-transform duration-150 active:scale-[0.96]",
						children: "Checkout"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-center text-xs text-subtle",
						children: "The courier collects. No card required."
					})
				]
			}) : null
		]
	})] });
}
function Footer() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
		className: "mt-24 border-t border-line bg-canvas",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-display text-2xl tracking-[0.16em]",
					children: "SOLÈNE"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 max-w-xs text-sm leading-relaxed text-muted",
					children: "Quiet luxury for warm cities. Pieces cut to last a season — and the next. Pay when it arrives."
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[11px] uppercase tracking-[0.2em] text-muted",
					children: "Atelier"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
					className: "mt-4 space-y-2 text-sm",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/shop",
							className: "hover:underline underline-offset-4",
							children: "The collection"
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/lookbook",
							className: "hover:underline underline-offset-4",
							children: "Lookbook"
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/checkout",
							className: "hover:underline underline-offset-4",
							children: "Checkout"
						}) })
					]
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[11px] uppercase tracking-[0.2em] text-muted",
						children: "Delivery"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 text-sm leading-relaxed text-muted",
						children: "Cash on delivery. Your courier collects, we pack, a partner ships. No card. No account."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/studio",
						className: "mt-6 inline-flex text-[11px] uppercase tracking-[0.18em] text-subtle hover:text-ink",
						children: "Atelier ledger"
					})
				] })
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "border-t border-line",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mx-auto max-w-6xl px-4 py-5 text-[11px] uppercase tracking-[0.16em] text-subtle sm:px-6",
				children: "Paiement à la livraison · Packed by hand"
			})
		})]
	});
}
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
var NAV = [{
	to: "/shop",
	label: "Shop"
}, {
	to: "/lookbook",
	label: "Lookbook"
}];
function Header() {
	const items = useCart((s) => s.items);
	const setOpen = useCart((s) => s.setOpen);
	const [menu, setMenu] = (0, import_react.useState)(false);
	const [ready, setReady] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => setReady(true), []);
	const count = ready ? cartCount(items) : 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: "sticky top-0 z-40 border-b border-line bg-canvas/90 backdrop-blur-md",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "flex size-11 items-center justify-center md:hidden",
					"aria-label": menu ? "Close menu" : "Open menu",
					onClick: () => setMenu((v) => !v),
					children: menu ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { className: "size-5" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/",
					className: "font-display text-[1.65rem] leading-none tracking-[0.18em] text-ink",
					children: "SOLÈNE"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
					className: "hidden items-center gap-8 md:flex",
					children: NAV.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: item.to,
						className: "text-xs uppercase tracking-[0.22em] text-muted transition-colors hover:text-ink",
						activeProps: { className: "text-ink" },
						children: item.label
					}, item.to))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => setOpen(true),
					className: "relative flex size-11 items-center justify-center",
					"aria-label": "Open bag",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingBag, {
						className: "size-5",
						strokeWidth: 1.6
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: cn("absolute right-1.5 top-1.5 min-w-4 px-1 text-center text-[10px] tabular-nums leading-4", count > 0 ? "bg-ink text-foam" : "text-muted"),
						children: count
					})]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: cn("md:hidden overflow-hidden border-t border-line bg-canvas transition-[max-height,opacity] duration-250 ease-[cubic-bezier(0.22,1,0.36,1)]", menu ? "max-h-40 opacity-100" : "max-h-0 opacity-0"),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
				className: "flex flex-col px-4 py-3",
				children: NAV.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: item.to,
					onClick: () => setMenu(false),
					className: "flex h-11 items-center text-xs uppercase tracking-[0.22em] text-ink",
					children: item.label
				}, item.to))
			})
		})]
	});
}
function SiteShell({ children }) {
	if (useRouterState({ select: (s) => s.location.pathname }).startsWith("/studio")) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, {
		position: "top-center",
		richColors: false
	})] });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-dvh flex-col bg-canvas text-ink",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Header, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
				className: "flex-1",
				children
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Footer, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartDrawer, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, {
				position: "top-center",
				toastOptions: { className: "font-sans bg-paper text-ink border-line" }
			})
		]
	});
}
var styles_default = "/assets/styles-s8lsX4m-.css";
var APP_NAME = "SOLÈNE";
var Route$7 = createRootRoute({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: APP_NAME },
			{
				name: "description",
				content: "SOLÈNE — quiet luxury for warm cities. Women’s clothing, pay on delivery. No card. No account."
			},
			{
				name: "theme-color",
				content: "#F4EFE8"
			}
		],
		links: [
			{
				rel: "icon",
				type: "image/svg+xml",
				href: "/favicon.svg"
			},
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "manifest",
				href: "/__grok/manifest.webmanifest"
			},
			{
				rel: "apple-touch-icon",
				href: "/__grok/icon-180.png"
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Outfit:wght@300;400;500;600&display=swap"
			}
		]
	}),
	component: RootComponent
});
function RootComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		className: "antialiased",
		suppressHydrationWarning: true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PreviewHostBridge, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}) }) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})
		] })]
	});
}
var $$splitComponentImporter$6 = () => import("./routes-BZelKQky.mjs");
var Route$6 = createFileRoute("/")({
	loader: () => listProducts(),
	component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
var $$splitComponentImporter$5 = () => import("./checkout-Cdu7U3Zu.mjs");
var Route$5 = createFileRoute("/checkout")({ component: lazyRouteComponent($$splitComponentImporter$5, "component") });
var $$splitComponentImporter$4 = () => import("./lookbook-BjZfub70.mjs");
var Route$4 = createFileRoute("/lookbook")({ component: lazyRouteComponent($$splitComponentImporter$4, "component") });
var $$splitComponentImporter$3 = () => import("./studio-JCm4922b.mjs");
var Route$3 = createFileRoute("/studio")({ component: lazyRouteComponent($$splitComponentImporter$3, "component") });
var $$splitComponentImporter$2 = () => import("./order._id-Dn91dm0C.mjs");
var Route$2 = createFileRoute("/order/$id")({
	loader: async ({ params }) => getPublicOrder({ data: { publicId: params.id } }),
	component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
var $$splitComponentImporter$1 = () => import("./shop-CMI4VjKQ.mjs");
var Route$1 = createFileRoute("/shop/")({
	loader: () => listProducts(),
	component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
var $$splitComponentImporter = () => import("../_slug-DozkQddx.mjs");
var Route = createFileRoute("/shop/$slug")({
	loader: async ({ params }) => {
		const [product, all] = await Promise.all([getProduct({ data: { slug: params.slug } }), listProducts()]);
		if (!product) throw notFound();
		return {
			product,
			related: all.filter((p) => p.slug !== product.slug).slice(0, 4)
		};
	},
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
var IndexRoute = Route$6.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$7
});
var CheckoutRoute = Route$5.update({
	id: "/checkout",
	path: "/checkout",
	getParentRoute: () => Route$7
});
var LookbookRoute = Route$4.update({
	id: "/lookbook",
	path: "/lookbook",
	getParentRoute: () => Route$7
});
var StudioRoute = Route$3.update({
	id: "/studio",
	path: "/studio",
	getParentRoute: () => Route$7
});
var OrderIdRoute = Route$2.update({
	id: "/order/$id",
	path: "/order/$id",
	getParentRoute: () => Route$7
});
var ShopIndexRoute = Route$1.update({
	id: "/shop/",
	path: "/shop/",
	getParentRoute: () => Route$7
});
var rootRouteChildren = {
	IndexRoute,
	CheckoutRoute,
	LookbookRoute,
	StudioRoute,
	OrderIdRoute,
	ShopSlugRoute: Route.update({
		id: "/shop/$slug",
		path: "/shop/$slug",
		getParentRoute: () => Route$7
	}),
	ShopIndexRoute
};
var routeTree = Route$7._addFileChildren(rootRouteChildren)._addFileTypes();
var router_exports = /* @__PURE__ */ __exportAll({ getRouter: () => getRouter });
function getRouter() {
	return createRouter({
		routeTree,
		defaultErrorComponent: AppErrorComponent
	});
}
//#endregion
export { Route$6 as a, useCart as c, retryDispatch as d, setOrderStatus as f, Route$2 as i, listStudioOrders as l, Route as n, cn as o, createSsrRpc as p, Route$1 as r, cartTotal as s, router_exports as t, placeOrder as u };
