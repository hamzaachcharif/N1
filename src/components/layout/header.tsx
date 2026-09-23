import { Link } from "@tanstack/react-router";
import { Menu, ShoppingBag, X } from "lucide-react";
import { useEffect, useState } from "react";
import { cartCount, useCart } from "@/lib/cart";
import { cn } from "@/lib/utils";

const NAV = [
  { to: "/shop", label: "Shop" },
  { to: "/lookbook", label: "Lookbook" },
];

export function Header() {
  const items = useCart((s) => s.items);
  const setOpen = useCart((s) => s.setOpen);
  const [menu, setMenu] = useState(false);
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);
  const count = ready ? cartCount(items) : 0;

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-canvas/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <button
          type="button"
          className="flex size-11 items-center justify-center md:hidden"
          aria-label={menu ? "Close menu" : "Open menu"}
          onClick={() => setMenu((v) => !v)}
        >
          {menu ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>

        <Link
          to="/"
          className="font-display text-[1.65rem] leading-none tracking-[0.18em] text-ink"
        >
          SOLÈNE
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="text-xs uppercase tracking-[0.22em] text-muted transition-colors hover:text-ink"
              activeProps={{ className: "text-ink" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          onClick={() => setOpen(true)}
          className="relative flex size-11 items-center justify-center"
          aria-label="Open bag"
        >
          <ShoppingBag className="size-5" strokeWidth={1.6} />
          <span
            className={cn(
              "absolute right-1.5 top-1.5 min-w-4 px-1 text-center text-[10px] tabular-nums leading-4",
              count > 0 ? "bg-ink text-foam" : "text-muted",
            )}
          >
            {count}
          </span>
        </button>
      </div>

      <div
        className={cn(
          "md:hidden overflow-hidden border-t border-line bg-canvas transition-[max-height,opacity] duration-250 ease-[cubic-bezier(0.22,1,0.36,1)]",
          menu ? "max-h-40 opacity-100" : "max-h-0 opacity-0",
        )}
      >
        <nav className="flex flex-col px-4 py-3">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => setMenu(false)}
              className="flex h-11 items-center text-xs uppercase tracking-[0.22em] text-ink"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
