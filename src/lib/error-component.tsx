import type { ErrorComponentProps } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";

const FALLBACK_MESSAGE = "Something slipped at the atelier. Try again.";

function errorMessage(error: unknown): string {
  if (error instanceof Error && error.message) return error.message;
  if (typeof error === "string" && error) return error;
  return FALLBACK_MESSAGE;
}

export function AppErrorComponent({ error }: ErrorComponentProps) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-canvas px-6 text-center text-ink">
      <p className="text-xs uppercase tracking-[0.22em] text-muted">A snag</p>
      <h1 className="font-display text-4xl">The page did not make it</h1>
      <p className="max-w-md text-sm break-words text-muted">{errorMessage(error)}</p>
      <Link
        to="/"
        className="mt-4 inline-flex h-11 items-center bg-ink px-6 text-sm text-foam"
      >
        Back to the house
      </Link>
    </main>
  );
}
