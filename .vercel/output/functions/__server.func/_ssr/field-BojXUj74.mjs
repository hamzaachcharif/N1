import { S as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { o as cn } from "./router-o33HPlkN.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/field-BojXUj74.js
var import_jsx_runtime = require_jsx_runtime();
function Field({ label, hint, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "flex flex-col gap-2",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-[11px] uppercase tracking-[0.18em] text-muted",
				children: label
			}),
			children,
			hint ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-xs text-subtle",
				children: hint
			}) : null
		]
	});
}
var control = "h-11 w-full bg-paper border border-line px-3 text-sm text-ink placeholder:text-subtle outline-none transition-[border-color,box-shadow] duration-150 focus:border-ink";
function Input({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
		className: cn(control, className),
		...props
	});
}
function Textarea({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
		className: cn(control, "h-24 py-3 resize-y", className),
		...props
	});
}
function NativeSelect({ className, children, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
		className: cn(control, "appearance-none", className),
		...props,
		children
	});
}
//#endregion
export { Textarea as i, Input as n, NativeSelect as r, Field as t };
