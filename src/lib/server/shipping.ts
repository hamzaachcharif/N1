import type { CarrierMode, StudioSettings } from "@/lib/types";

export type ShipmentItem = {
  name: string;
  color: string;
  size: string;
  qty: number;
  unitPrice: number;
  sku?: string;
};

export type ShipmentInput = {
  publicId: string;
  customerName: string;
  phone: string;
  city: string;
  commune: string;
  address: string;
  notes: string;
  total: number;
  items: ShipmentItem[];
};

export type ShipmentResult = {
  ok: boolean;
  carrier: CarrierMode;
  ref: string | null;
  error: string | null;
};

function splitName(full: string): { firstname: string; familyname: string } {
  const parts = full.trim().split(/\s+/);
  if (parts.length === 1) return { firstname: parts[0] ?? "Client", familyname: parts[0] ?? "Client" };
  return { firstname: parts[0] ?? "Client", familyname: parts.slice(1).join(" ") };
}

function productList(items: ShipmentItem[]): string {
  return items
    .map((i) => `${i.name} ${i.color}/${i.size} x${i.qty}`)
    .join(" | ")
    .slice(0, 240);
}

function webhookPayload(input: ShipmentInput) {
  return {
    order_id: input.publicId,
    customer: {
      name: input.customerName,
      phone: input.phone,
      city: input.city,
      commune: input.commune,
      address: input.address,
    },
    notes: input.notes,
    cod_amount: input.total,
    currency: "DZD",
    items: input.items,
  };
}

export async function dispatchShipment(
  input: ShipmentInput,
  settings: StudioSettings,
): Promise<ShipmentResult> {
  const mode = settings.carrierMode;

  if (mode === "demo") {
    return {
      ok: true,
      carrier: "demo",
      ref: `DEMO-${input.publicId.replace("SLN-", "")}`,
      error: null,
    };
  }

  try {
    if (mode === "webhook") {
      if (!settings.carrierUrl) {
        return { ok: false, carrier: mode, ref: null, error: "No webhook URL configured." };
      }
      const headers: Record<string, string> = { "Content-Type": "application/json" };
      if (settings.carrierToken) headers.Authorization = `Bearer ${settings.carrierToken}`;
      const res = await fetch(settings.carrierUrl, {
        method: "POST",
        headers,
        body: JSON.stringify(webhookPayload(input)),
        signal: AbortSignal.timeout(15000),
      });
      const text = await res.text();
      if (!res.ok) {
        return { ok: false, carrier: mode, ref: null, error: `Webhook ${res.status}: ${text.slice(0, 280)}` };
      }
      let ref: string | null = null;
      try {
        const json = JSON.parse(text) as { id?: string; ref?: string; tracking?: string };
        ref = json.ref ?? json.tracking ?? json.id ?? null;
      } catch {
        ref = text.slice(0, 80) || input.publicId;
      }
      return { ok: true, carrier: mode, ref, error: null };
    }

    if (mode === "yalidine") {
      if (!settings.carrierApiId || !settings.carrierToken) {
        return { ok: false, carrier: mode, ref: null, error: "Yalidine API ID and token are required." };
      }
      const { firstname, familyname } = splitName(input.customerName);
      const url = settings.carrierUrl || "https://api.yalidine.app/v1/parcels/";
      const body = [
        {
          order_id: input.publicId,
          from_wilaya_name: settings.fromCity || "Alger",
          firstname,
          familyname,
          contact_phone: input.phone.replace(/\D/g, ""),
          address: input.address,
          to_commune_name: input.commune || input.city,
          to_wilaya_name: input.city,
          product_list: productList(input.items),
          price: input.total,
          freeshipping: 0,
          is_stopdesk: 0,
          has_exchange: 0,
        },
      ];
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-API-ID": settings.carrierApiId,
          "X-API-TOKEN": settings.carrierToken,
        },
        body: JSON.stringify(body),
        signal: AbortSignal.timeout(15000),
      });
      const text = await res.text();
      if (!res.ok) {
        return { ok: false, carrier: mode, ref: null, error: `Yalidine ${res.status}: ${text.slice(0, 280)}` };
      }
      let ref: string | null = input.publicId;
      try {
        const json = JSON.parse(text) as Record<string, { tracking?: string }> | { tracking?: string };
        if (json && typeof json === "object") {
          const first = Object.values(json)[0];
          if (first && typeof first === "object" && "tracking" in first) {
            ref = String(first.tracking);
          }
        }
      } catch {
        /* keep fallback */
      }
      return { ok: true, carrier: mode, ref, error: null };
    }
  } catch (err) {
    const message = err instanceof Error ? err.message : "Carrier request failed.";
    return { ok: false, carrier: mode, ref: null, error: message };
  }

  return { ok: false, carrier: mode, ref: null, error: "Unknown carrier mode." };
}
