-- ==========================================================
-- BELLI ARTESANATOS — ESTRUTURA DO BANCO DE DADOS POSTGRESQL / SUPABASE
-- ==========================================================

-- 1. Categorias da Loja
CREATE TABLE IF NOT EXISTS public.store_categories (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  image_url TEXT,
  display_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 2. Produtos
CREATE TABLE IF NOT EXISTS public.store_products (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  category_id TEXT REFERENCES public.store_categories(id) ON DELETE SET NULL,
  price NUMERIC(10, 2) NOT NULL,
  original_price NUMERIC(10, 2),
  stock INT DEFAULT 10,
  rating NUMERIC(2, 1) DEFAULT 5.0,
  review_count INT DEFAULT 1,
  description TEXT,
  materials TEXT,
  dimensions TEXT,
  care_instructions TEXT,
  images TEXT[] DEFAULT '{}',
  featured BOOLEAN DEFAULT false,
  is_new BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 3. Clientes
CREATE TABLE IF NOT EXISTS public.store_customers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  phone TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 4. Pedidos
CREATE TABLE IF NOT EXISTS public.store_orders (
  id TEXT PRIMARY KEY,
  order_number TEXT UNIQUE NOT NULL,
  customer_id UUID REFERENCES public.store_customers(id) ON DELETE SET NULL,
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  shipping_address JSONB NOT NULL,
  subtotal NUMERIC(10, 2) NOT NULL,
  discount NUMERIC(10, 2) DEFAULT 0,
  coupon_code TEXT,
  shipping_fee NUMERIC(10, 2) DEFAULT 0,
  total NUMERIC(10, 2) NOT NULL,
  payment_method TEXT NOT NULL,
  status TEXT DEFAULT 'pendente',
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 5. Itens dos Pedidos
CREATE TABLE IF NOT EXISTS public.store_order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id TEXT REFERENCES public.store_orders(id) ON DELETE CASCADE,
  product_id TEXT REFERENCES public.store_products(id) ON DELETE SET NULL,
  product_name TEXT NOT NULL,
  price NUMERIC(10, 2) NOT NULL,
  quantity INT NOT NULL,
  image_url TEXT
);

-- 6. Cupons
CREATE TABLE IF NOT EXISTS public.store_coupons (
  code TEXT PRIMARY KEY,
  discount_percentage INT NOT NULL,
  min_order_value NUMERIC(10, 2) DEFAULT 0,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 7. Configurações da Loja
CREATE TABLE IF NOT EXISTS public.store_settings (
  key TEXT PRIMARY KEY,
  value JSONB NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- RLS & Permissões
ALTER TABLE public.store_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.store_products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.store_customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.store_orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.store_order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.store_coupons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.store_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Leitura pública de produtos" ON public.store_products FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Leitura pública de categorias" ON public.store_categories FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Leitura pública de cupons" ON public.store_coupons FOR SELECT TO anon, authenticated USING (active = true);
CREATE POLICY "Criação de pedidos pública" ON public.store_orders FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Criação de itens pública" ON public.store_order_items FOR INSERT TO anon, authenticated WITH CHECK (true);