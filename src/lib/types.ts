export type Colorway = {
  name: string;
  hex: string;
};

export type Variant = {
  id: number;
  productId: number;
  color: string;
  colorHex: string;
  size: string;
  sku: string;
  stock: number;
};

export type Product = {
  id: number;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  care: string;
  price: number;
  image: string;
  collection: string;
  featured: boolean;
  colors: Colorway[];
  variants: Variant[];
  totalStock: number;
};

export type CartItem = {
  variantId: number;
  productId: number;
  slug: string;
  name: string;
  image: string;
  color: string;
  size: string;
  price: number;
  qty: number;
};

export type OrderStatus =
  | "new"
  | "dispatched"
  | "delivered"
  | "cancelled"
  | "failed";

export type PublicOrder = {
  publicId: string;
  status: OrderStatus;
  total: number;
  city: string;
  createdAt: string;
  items: {
    name: string;
    color: string;
    size: string;
    qty: number;
    unitPrice: number;
    image: string;
  }[];
};

export type StudioOrder = PublicOrder & {
  id: number;
  customerName: string;
  phone: string;
  commune: string;
  address: string;
  notes: string;
  carrier: string;
  carrierRef: string | null;
  carrierError: string | null;
};

export type CarrierMode = "demo" | "webhook" | "yalidine";

export type StudioSettings = {
  studioKey: string;
  carrierMode: CarrierMode;
  carrierUrl: string;
  carrierApiId: string;
  carrierToken: string;
  fromCity: string;
  whatsapp: string;
  instagram: string;
  brandName: string;
};

export const SIZES = ["XS", "S", "M", "L", "XL"] as const;
