import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/lookbook")({
  component: LookbookPage,
});

const FRAMES = [
  {
    src: "/lookbook/arch.jpg",
    alt: "Cream linen under a stone arch",
    caption: "Late light, limestone.",
    tall: true,
  },
  {
    src: "/products/hero.jpg",
    alt: "Ivory column dress in a courtyard",
    caption: "The column dress, walking.",
    tall: false,
  },
  {
    src: "/products/linen-dress.jpg",
    alt: "Linen column dress in studio",
    caption: "Washed linen, a straight line.",
    tall: true,
  },
  {
    src: "/products/silk-slip.jpg",
    alt: "Champagne silk midi",
    caption: "Bias silk, no hardware.",
    tall: true,
  },
  {
    src: "/products/blazer.jpg",
    alt: "Camel structured blazer",
    caption: "Soft shoulder. Sharp lapel.",
    tall: true,
  },
  {
    src: "/products/soft-coat.jpg",
    alt: "Oatmeal unstructured coat",
    caption: "Evenings that start in daylight.",
    tall: true,
  },
];

function LookbookPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <p className="text-[11px] uppercase tracking-[0.22em] text-muted">Lookbook</p>
      <h1 className="mt-2 font-display text-5xl md:text-6xl">Quiet colour</h1>
      <p className="mt-4 max-w-lg text-sm leading-relaxed text-muted">
        Photographed in plaster rooms and courtyards. Not a campaign — the clothes
        as they are worn.
      </p>

      <div className="mt-12 columns-1 gap-4 sm:columns-2 lg:columns-3">
        {FRAMES.map((frame) => (
          <figure key={frame.src} className="mb-4 break-inside-avoid">
            <img
              src={frame.src}
              alt={frame.alt}
              className="w-full bg-paper object-cover"
            />
            <figcaption className="mt-2 text-xs text-muted">{frame.caption}</figcaption>
          </figure>
        ))}
      </div>

      <div className="mt-16 flex flex-col items-start gap-4 border-t border-line pt-10 sm:flex-row sm:items-center sm:justify-between">
        <p className="font-display text-3xl">The pieces, in stock.</p>
        <Link
          to="/shop"
          className="inline-flex h-11 items-center bg-ink px-6 text-sm text-foam transition-transform duration-150 active:scale-[0.96]"
        >
          Shop the collection
        </Link>
      </div>
    </div>
  );
}
