import { type ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

type Variant = "solid" | "ghost" | "outline" | "link";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  block?: boolean;
};

const styles: Record<Variant, string> = {
  solid:
    "bg-ink text-foam hover:bg-accent border border-ink",
  ghost:
    "bg-transparent text-ink hover:bg-paper border border-transparent",
  outline:
    "bg-transparent text-ink border border-ink/20 hover:border-ink",
  link: "bg-transparent text-ink underline-offset-4 hover:underline px-0 h-auto",
};

export const Button = forwardRef<HTMLButtonElement, Props>(function Button(
  { className, variant = "solid", block, disabled, ...props },
  ref,
) {
  return (
    <button
      ref={ref}
      disabled={disabled}
      className={cn(
        "inline-flex items-center justify-center gap-2 h-11 px-6 text-sm font-medium tracking-wide",
        "transition-transform duration-150 ease-out active:not-disabled:scale-[0.96]",
        "disabled:cursor-not-allowed disabled:opacity-40",
        styles[variant],
        block && "w-full",
        className,
      )}
      {...props}
    />
  );
});
