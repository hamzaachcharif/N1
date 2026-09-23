import { o as __toESM } from "../_runtime.mjs";
import { S as require_jsx_runtime, U as require_react } from "../_libs/@tanstack/react-router+[...].mjs";
import { o as cn } from "./router-o33HPlkN.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/button-B-gKth2u.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var styles = {
	solid: "bg-ink text-foam hover:bg-accent border border-ink",
	ghost: "bg-transparent text-ink hover:bg-paper border border-transparent",
	outline: "bg-transparent text-ink border border-ink/20 hover:border-ink",
	link: "bg-transparent text-ink underline-offset-4 hover:underline px-0 h-auto"
};
var Button = (0, import_react.forwardRef)(function Button({ className, variant = "solid", block, disabled, ...props }, ref) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		ref,
		disabled,
		className: cn("inline-flex items-center justify-center gap-2 h-11 px-6 text-sm font-medium tracking-wide", "transition-transform duration-150 ease-out active:not-disabled:scale-[0.96]", "disabled:cursor-not-allowed disabled:opacity-40", styles[variant], block && "w-full", className),
		...props
	});
});
//#endregion
export { Button as t };
