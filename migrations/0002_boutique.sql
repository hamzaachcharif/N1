create table if not exists products (
  id          serial primary key,
  slug        text not null unique,
  name        text not null,
  tagline     text not null,
  description text not null,
  care        text not null,
  price       int not null,
  image       text not null,
  collection  text not null,
  featured    boolean not null default false,
  sort_order  int not null default 0
);

create table if not exists variants (
  id         serial primary key,
  product_id int not null references products(id) on delete cascade,
  color      text not null,
  color_hex  text not null,
  size       text not null,
  sku        text not null unique,
  stock      int not null default 0,
  unique (product_id, color, size)
);

create index if not exists variants_product_id_idx on variants (product_id);

create table if not exists orders (
  id            serial primary key,
  public_id     text not null unique,
  customer_name text not null,
  phone         text not null,
  city          text not null,
  commune       text not null default '',
  address       text not null,
  notes         text not null default '',
  status        text not null default 'new',
  total         int not null,
  carrier       text not null default 'demo',
  carrier_ref   text,
  carrier_error text,
  created_at    timestamptz not null default now()
);

create index if not exists orders_created_at_idx on orders (created_at desc);
create index if not exists orders_status_idx on orders (status);

create table if not exists order_items (
  id           serial primary key,
  order_id     int not null references orders(id) on delete cascade,
  variant_id   int not null,
  product_name text not null,
  color        text not null,
  size         text not null,
  qty          int not null,
  unit_price   int not null,
  image        text not null default ''
);

create table if not exists settings (
  key   text primary key,
  value text not null
);

insert into products (slug, name, tagline, description, care, price, image, collection, featured, sort_order) values
(
  'column-dress',
  'The Column Dress',
  'Washed linen, a straight line that moves.',
  'Cut on the grain in washed European linen. A column that skims rather than clings, with a self-belt you can drop. The dress that starts a season.',
  'Cold wash. Hang to dry. Press on linen heat. Linen eases with wear — that is the point.',
  8900,
  '/products/linen-dress.jpg',
  'Dresses',
  true,
  1
),
(
  'silk-midi',
  'The Silk Midi',
  'Bias-cut silk. Evening without the effort.',
  'A bias-cut silk midi that falls close through the body and eases at the hem. Thin straps, a clean neckline, no hardware. Meant for warm nights and long tables.',
  'Dry clean, or a cool hand wash in silk soap. Roll in a towel. Never wring.',
  6400,
  '/products/silk-slip.jpg',
  'Dresses',
  true,
  2
),
(
  'wide-trouser',
  'The Wide Trouser',
  'High rise. Long drape. No stiffness.',
  'A high-rise wide-leg trouser in a sand wool-blend. Pressed once at the atelier, then left to live. Pockets that actually work. The pair you reach for first.',
  'Dry clean. Hang. A light steam restores the line.',
  5200,
  '/products/wide-trousers.jpg',
  'Tailoring',
  true,
  3
),
(
  'soft-cardigan',
  'The Soft Cardigan',
  'Heavy cotton-cashmere. Meant to be lived in.',
  'An oversized cardigan in a cotton-cashmere blend with real weight. Deep pockets, a rib that holds, sleeves long enough to cover the hands. The layer between seasons.',
  'Hand wash cold. Dry flat. Do not tumble.',
  7800,
  '/products/cardigan.jpg',
  'Knits',
  false,
  4
),
(
  'wrap-blouse',
  'The Wrap Blouse',
  'A true wrap. Ties at the waist.',
  'Fluid viscose with a real wrap front — not a faux placket. Ties once at the waist and falls clean through the hip. Wear it closed, or a little less.',
  'Cold wash in a bag. Hang. A cool iron on the reverse.',
  4600,
  '/products/wrap-blouse.jpg',
  'Blouses',
  false,
  5
),
(
  'structured-blazer',
  'The Structured Blazer',
  'Soft shoulder. Sharp lapel.',
  'A camel wool-blend blazer with a soft shoulder and a lapel that holds. One button, two pockets, a lining that slides. The piece that finishes an outfit without announcing itself.',
  'Dry clean. Hang on a shaped hanger. Steam the sleeve.',
  11200,
  '/products/blazer.jpg',
  'Tailoring',
  false,
  6
),
(
  'midi-skirt',
  'The Midi Skirt',
  'Bias silk-blend, a hidden zip.',
  'A midi skirt cut on the bias in an olive silk-blend. It moves when you walk and sits quiet when you sit. Hidden side zip, clean waist, no slit theatre.',
  'Dry clean or cool hand wash. Hang. Do not wring.',
  4900,
  '/products/midi-skirt.jpg',
  'Skirts',
  false,
  7
),
(
  'soft-coat',
  'The Soft Coat',
  'Unstructured. Mid-weight. For evenings that start in daylight.',
  'An oatmeal coat with almost no construction — just cloth, a collar, and a line. Mid-weight enough for spring nights, long enough to cover a dress. The last thing you put on.',
  'Dry clean. Brush. Hang. Do not crush in a bag.',
  14800,
  '/products/soft-coat.jpg',
  'Outerwear',
  true,
  8
);

insert into variants (product_id, color, color_hex, size, sku, stock)
select
  p.id,
  c.color,
  c.color_hex,
  s.size,
  p.slug || '-' || regexp_replace(lower(c.color), '[^a-z0-9]+', '', 'g') || '-' || lower(s.size),
  case
    when s.size = 'XL' then 0
    when s.size = 'XS' then 3
    when s.size = 'S' then 7
    when s.size = 'M' then 11
    else 6
  end
from products p
join (
  values
    ('column-dress', 'Ivory', '#E8DFD2'),
    ('column-dress', 'Sand', '#C4B49A'),
    ('silk-midi', 'Champagne', '#D9C7A8'),
    ('silk-midi', 'Ink', '#2A2622'),
    ('wide-trouser', 'Sand', '#C4B49A'),
    ('wide-trouser', 'Ink', '#2A2622'),
    ('soft-cardigan', 'Cream', '#EDE6DC'),
    ('soft-cardigan', 'Taupe', '#9C8B78'),
    ('wrap-blouse', 'Ivory', '#E8DFD2'),
    ('wrap-blouse', 'Blush', '#D4B8B0'),
    ('structured-blazer', 'Camel', '#C4A574'),
    ('structured-blazer', 'Ink', '#2A2622'),
    ('midi-skirt', 'Olive', '#6B6A4A'),
    ('midi-skirt', 'Cream', '#EDE6DC'),
    ('soft-coat', 'Oatmeal', '#D8CDBE'),
    ('soft-coat', 'Ink', '#2A2622')
) as c(slug, color, color_hex) on c.slug = p.slug
cross join (
  values ('XS'), ('S'), ('M'), ('L'), ('XL')
) as s(size);

insert into settings (key, value) values
  ('studio_key', 'atelier'),
  ('carrier_mode', 'demo'),
  ('carrier_url', ''),
  ('carrier_api_id', ''),
  ('carrier_token', ''),
  ('from_city', 'Alger'),
  ('whatsapp', ''),
  ('instagram', ''),
  ('brand_name', 'SOLENE');
