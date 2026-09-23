import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartItem } from "@/lib/types";

type CartState = {
  items: CartItem[];
  open: boolean;
  setOpen: (open: boolean) => void;
  add: (item: Omit<CartItem, "qty">, qty?: number) => void;
  setQty: (variantId: number, qty: number) => void;
  remove: (variantId: number) => void;
  clear: () => void;
};

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      open: false,
      setOpen: (open) => set({ open }),
      add: (item, qty = 1) => {
        const existing = get().items.find((i) => i.variantId === item.variantId);
        const nextQty = (existing?.qty ?? 0) + qty;
        const items = existing
          ? get().items.map((i) =>
              i.variantId === item.variantId ? { ...i, qty: nextQty } : i,
            )
          : [...get().items, { ...item, qty }];
        set({ items, open: true });
      },
      setQty: (variantId, qty) => {
        if (qty <= 0) {
          set({ items: get().items.filter((i) => i.variantId !== variantId) });
          return;
        }
        set({
          items: get().items.map((i) =>
            i.variantId === variantId ? { ...i, qty } : i,
          ),
        });
      },
      remove: (variantId) =>
        set({ items: get().items.filter((i) => i.variantId !== variantId) }),
      clear: () => set({ items: [] }),
    }),
    { name: "solene-cart", partialize: (s) => ({ items: s.items }) },
  ),
);

export function cartCount(items: CartItem[]): number {
  return items.reduce((n, i) => n + i.qty, 0);
}

export function cartTotal(items: CartItem[]): number {
  return items.reduce((n, i) => n + i.price * i.qty, 0);
}
