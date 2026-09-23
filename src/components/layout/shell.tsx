import { useRouterState } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { Toaster } from "sonner";
import { CartDrawer } from "@/components/cart/drawer";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";

export function SiteShell({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isStudio = pathname.startsWith("/studio");

  if (isStudio) {
    return (
      <>
        {children}
        <Toaster position="top-center" richColors={false} />
      </>
    );
  }

  return (
    <div className="flex min-h-dvh flex-col bg-canvas text-ink">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <CartDrawer />
      <Toaster
        position="top-center"
        toastOptions={{
          className: "font-sans bg-paper text-ink border-line",
        }}
      />
    </div>
  );
}
