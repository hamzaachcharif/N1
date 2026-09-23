import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { getSql } from "@/lib/db";
import { assertStudioKey, readSettings, writeSettings } from "@/lib/server/settings";
import type { CarrierMode, StudioSettings, Variant } from "@/lib/types";

export const unlockStudio = createServerFn({ method: "POST" })
  .validator(z.object({ studioKey: z.string() }))
  .handler(async ({ data }) => {
    const settings = await readSettings();
    assertStudioKey(data.studioKey, settings.studioKey);
    return { ok: true as const };
  });

export const getStudioSettings = createServerFn({ method: "POST" })
  .validator(z.object({ studioKey: z.string() }))
  .handler(async ({ data }): Promise<Omit<StudioSettings, "studioKey"> & { studioKeySet: boolean }> => {
    const settings = await readSettings();
    assertStudioKey(data.studioKey, settings.studioKey);
    return {
      studioKeySet: true,
      carrierMode: settings.carrierMode,
      carrierUrl: settings.carrierUrl,
      carrierApiId: settings.carrierApiId,
      carrierToken: settings.carrierToken ? "••••••••" : "",
      fromCity: settings.fromCity,
      whatsapp: settings.whatsapp,
      instagram: settings.instagram,
      brandName: settings.brandName,
    };
  });

export const saveStudioSettings = createServerFn({ method: "POST" })
  .validator(
    z.object({
      studioKey: z.string(),
      carrierMode: z.enum(["demo", "webhook", "yalidine"]),
      carrierUrl: z.string().max(400),
      carrierApiId: z.string().max(200),
      carrierToken: z.string().max(400),
      fromCity: z.string().max(80),
      whatsapp: z.string().max(30),
      instagram: z.string().max(80),
    }),
  )
  .handler(async ({ data }) => {
    const settings = await readSettings();
    assertStudioKey(data.studioKey, settings.studioKey);
    const patch: Partial<StudioSettings> = {
      carrierMode: data.carrierMode as CarrierMode,
      carrierUrl: data.carrierUrl.trim(),
      carrierApiId: data.carrierApiId.trim(),
      fromCity: data.fromCity.trim() || "Alger",
      whatsapp: data.whatsapp.trim(),
      instagram: data.instagram.trim().replace(/^@/, ""),
    };
    if (data.carrierToken && !data.carrierToken.includes("•")) {
      patch.carrierToken = data.carrierToken.trim();
    }
    await writeSettings(patch);
    return { ok: true };
  });

export const listInventory = createServerFn({ method: "POST" })
  .validator(z.object({ studioKey: z.string() }))
  .handler(async ({ data }) => {
    const settings = await readSettings();
    assertStudioKey(data.studioKey, settings.studioKey);
    const sql = await getSql();
    const rows = await sql<{
      id: number;
      product_id: number;
      slug: string;
      name: string;
      image: string;
      color: string;
      color_hex: string;
      size: string;
      sku: string;
      stock: number;
    }>`
      select v.id, v.product_id, p.slug, p.name, p.image,
             v.color, v.color_hex, v.size, v.sku, v.stock
      from variants v
      join products p on p.id = v.product_id
      order by p.sort_order, v.color, v.id
    `;
    return rows.map((r) => ({
      id: r.id,
      productId: r.product_id,
      slug: r.slug,
      name: r.name,
      image: r.image,
      color: r.color,
      colorHex: r.color_hex,
      size: r.size,
      sku: r.sku,
      stock: Number(r.stock),
    })) satisfies (Variant & { slug: string; name: string; image: string })[];
  });

export const adjustStock = createServerFn({ method: "POST" })
  .validator(
    z.object({
      studioKey: z.string(),
      variantId: z.number().int().positive(),
      stock: z.number().int().min(0).max(999),
    }),
  )
  .handler(async ({ data }) => {
    const settings = await readSettings();
    assertStudioKey(data.studioKey, settings.studioKey);
    const sql = await getSql();
    await sql`update variants set stock = ${data.stock} where id = ${data.variantId}`;
    return { ok: true, stock: data.stock };
  });
