import { Product, CartItem, Order, Coupon, StoreConfig, AdminUser, OrderStatus } from '../types/store';
import { INITIAL_PRODUCTS } from '../data/initialProducts';

const STORAGE_KEYS = {
  PRODUCTS: 'belli_products_v1',
  CART: 'belli_cart_v1',
  ORDERS: 'belli_orders_v1',
  COUPONS: 'belli_coupons_v1',
  CONFIG: 'belli_config_v1',
  ADMIN_SESSION: 'belli_admin_session_v1',
};

const DEFAULT_CONFIG: StoreConfig = {
  storeName: 'Belli Artesanatos',
  slogan: 'Artes modernas, feitas com carinho',
  whatsapp: '5511999998888',
  instagram: '@belliartesanatos',
  email: 'contato@belliartesanatos.com.br',
  pixKey: '11999998888',
  pixKeyType: 'telefone',
  freeShippingMin: 199.00,
  standardShippingFee: 19.90,
  address: 'Ateliê Belli — São Paulo, SP • Enviamos para todo o Brasil',
};

const DEFAULT_COUPONS: Coupon[] = [
  { code: 'BEMVINDA10', discountPercentage: 10, minOrderValue: 80, active: true },
  { code: 'AFETO15', discountPercentage: 15, minOrderValue: 150, active: true },
  { code: 'BELLI20', discountPercentage: 20, minOrderValue: 250, active: true },
];

function notifyChange() {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('belli:store_change'));
  }
}

// ---------------- PRODUCTS ----------------
export function getProducts(): Product[] {
  if (typeof window === 'undefined') return INITIAL_PRODUCTS;
  const raw = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
  if (!raw) {
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(INITIAL_PRODUCTS));
    return INITIAL_PRODUCTS;
  }
  try {
    return JSON.parse(raw);
  } catch {
    return INITIAL_PRODUCTS;
  }
}

export function getProductById(id: string): Product | undefined {
  return getProducts().find((p) => p.id === id);
}

export function saveProduct(product: Partial<Product> & { name: string; price: number; category: any }): Product {
  const current = getProducts();
  let updatedProduct: Product;

  if (product.id) {
    // Edit existing
    current.map((p) => {
      if (p.id === product.id) {
        updatedProduct = { ...p, ...product, categoryName: getCategoryLabel(product.category) };
        return updatedProduct;
      }
      return p;
    });
    const idx = current.findIndex((p) => p.id === product.id);
    if (idx >= 0) {
      updatedProduct = { ...current[idx], ...product, categoryName: getCategoryLabel(product.category) };
      current[idx] = updatedProduct;
    } else {
      updatedProduct = createNewProductRecord(product);
      current.unshift(updatedProduct);
    }
  } else {
    // Create new
    updatedProduct = createNewProductRecord(product);
    current.unshift(updatedProduct);
  }

  localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(current));
  notifyChange();
  return updatedProduct;
}

function createNewProductRecord(product: Partial<Product> & { name: string; price: number; category: any }): Product {
  const id = 'prod-' + Date.now();
  const slug = product.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  return {
    id,
    name: product.name,
    slug,
    category: product.category,
    categoryName: getCategoryLabel(product.category),
    price: Number(product.price),
    originalPrice: product.originalPrice ? Number(product.originalPrice) : undefined,
    stock: product.stock !== undefined ? Number(product.stock) : 10,
    rating: product.rating || 5.0,
    reviewCount: product.reviewCount || 1,
    description: product.description || 'Peça artesanal exclusiva produzida com carinho e acabamento premium no ateliê Belli.',
    materials: product.materials || 'Matérias-primas nobres selecionadas com cuidado.',
    dimensions: product.dimensions || 'Dimensões padrão artesanais.',
    careInstructions: product.careInstructions || 'Higienização delicada à mão para maior longevidade da peça.',
    images: product.images && product.images.length > 0 ? product.images : [
      'https://images.unsplash.com/photo-1584992236310-6edddc08acff?auto=format&fit=crop&w=800&q=80'
    ],
    featured: Boolean(product.featured),
    isNew: true,
    createdAt: new Date().toISOString(),
  };
}

export function deleteProduct(id: string): boolean {
  const current = getProducts();
  const filtered = current.filter((p) => p.id !== id);
  localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(filtered));
  notifyChange();
  return true;
}

export function getCategoryLabel(categoryKey: string): string {
  const labels: Record<string, string> = {
    croche: 'Crochê',
    amigurumi: 'Amigurumi',
    buques: 'Buquês Artesanais',
    macrame: 'Macramê',
    velas: 'Velas Aromáticas',
    decoracao: 'Decoração',
    bolsas: 'Bolsas Artesanais',
    lembrancinhas: 'Lembrancinhas & Presentes',
  };
  return labels[categoryKey] || 'Outros';
}

// ---------------- CART ----------------
export function getCart(): CartItem[] {
  if (typeof window === 'undefined') return [];
  const raw = localStorage.getItem(STORAGE_KEYS.CART);
  if (!raw) return [];
  try {
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export function addToCart(product: Product, quantity: number = 1): CartItem[] {
  const cart = getCart();
  const existing = cart.find((item) => item.product.id === product.id);
  if (existing) {
    existing.quantity += quantity;
  } else {
    cart.push({ product, quantity });
  }
  localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart));
  notifyChange();
  return cart;
}

export function updateCartQuantity(productId: string, quantity: number): CartItem[] {
  let cart = getCart();
  if (quantity <= 0) {
    cart = cart.filter((item) => item.product.id !== productId);
  } else {
    const item = cart.find((it) => it.product.id === productId);
    if (item) item.quantity = quantity;
  }
  localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart));
  notifyChange();
  return cart;
}

export function removeFromCart(productId: string): CartItem[] {
  const cart = getCart().filter((item) => item.product.id !== productId);
  localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart));
  notifyChange();
  return cart;
}

export function clearCart(): void {
  localStorage.removeItem(STORAGE_KEYS.CART);
  notifyChange();
}

// ---------------- ORDERS ----------------
export function getOrders(): Order[] {
  if (typeof window === 'undefined') return [];
  const raw = localStorage.getItem(STORAGE_KEYS.ORDERS);
  if (!raw) {
    // Seed initial demo orders
    const demoOrders: Order[] = [
      {
        id: 'ord-1001',
        orderNumber: 'BEL-2601',
        createdAt: '2026-02-20T14:32:00Z',
        customerName: 'Mariana Silveira',
        customerEmail: 'mariana.silveira@email.com',
        customerPhone: '(11) 98765-4321',
        address: {
          cep: '01415-000',
          street: 'Rua Bela Cintra',
          number: '1240',
          complement: 'Apto 42',
          neighborhood: 'Consolação',
          city: 'São Paulo',
          state: 'SP',
        },
        items: [
          {
            productId: 'prod-1',
            productName: 'Manta Aconchego em Crochê Artesanal',
            price: 289.90,
            quantity: 1,
            image: 'https://images.unsplash.com/photo-1584992236310-6edddc08acff?auto=format&fit=crop&w=800&q=80',
          },
          {
            productId: 'prod-9',
            productName: 'Vela Aromática Vanilla Bourbon',
            price: 79.90,
            quantity: 1,
            image: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=800&q=80',
          }
        ],
        subtotal: 369.80,
        discount: 36.98,
        couponCode: 'BEMVINDA10',
        shipping: 0,
        total: 332.82,
        paymentMethod: 'pix',
        status: 'enviado',
        notes: 'Embalar para presente com laço especial, por favor.',
      },
      {
        id: 'ord-1002',
        orderNumber: 'BEL-2602',
        createdAt: '2026-02-22T09:15:00Z',
        customerName: 'Carolina Mendez',
        customerEmail: 'carol.mendez@email.com',
        customerPhone: '(21) 99876-1122',
        address: {
          cep: '22041-001',
          street: 'Avenida Atlântica',
          number: '3000',
          neighborhood: 'Copacabana',
          city: 'Rio de Janeiro',
          state: 'RJ',
        },
        items: [
          {
            productId: 'prod-3',
            productName: 'Ursinho Theo em Amigurumi Hipoalergênico',
            price: 139.00,
            quantity: 1,
            image: 'https://images.unsplash.com/photo-1559454403-b8fb88521f11?auto=format&fit=crop&w=800&q=80',
          }
        ],
        subtotal: 139.00,
        discount: 0,
        shipping: 19.90,
        total: 158.90,
        paymentMethod: 'cartao',
        status: 'producao',
      }
    ];
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(demoOrders));
    return demoOrders;
  }
  try {
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export function createOrder(orderData: Omit<Order, 'id' | 'orderNumber' | 'createdAt'>): Order {
  const orders = getOrders();
  const nextNum = 2600 + orders.length + 1;
  const newOrder: Order = {
    ...orderData,
    id: 'ord-' + Date.now(),
    orderNumber: `BEL-${nextNum}`,
    createdAt: new Date().toISOString(),
  };

  // Reduce product stock accordingly
  const products = getProducts();
  newOrder.items.forEach((item) => {
    const prod = products.find((p) => p.id === item.productId);
    if (prod && prod.stock > 0) {
      prod.stock = Math.max(0, prod.stock - item.quantity);
    }
  });
  localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));

  orders.unshift(newOrder);
  localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
  clearCart();
  notifyChange();
  return newOrder;
}

export function updateOrderStatus(orderId: string, status: OrderStatus): boolean {
  const orders = getOrders();
  const order = orders.find((o) => o.id === orderId);
  if (!order) return false;
  order.status = status;
  localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
  notifyChange();
  return true;
}

// ---------------- COUPONS ----------------
export function getCoupons(): Coupon[] {
  if (typeof window === 'undefined') return DEFAULT_COUPONS;
  const raw = localStorage.getItem(STORAGE_KEYS.COUPONS);
  if (!raw) {
    localStorage.setItem(STORAGE_KEYS.COUPONS, JSON.stringify(DEFAULT_COUPONS));
    return DEFAULT_COUPONS;
  }
  try {
    return JSON.parse(raw);
  } catch {
    return DEFAULT_COUPONS;
  }
}

export function validateCoupon(code: string, currentTotal: number): { valid: boolean; coupon?: Coupon; message: string } {
  const clean = code.trim().toUpperCase();
  const coupon = getCoupons().find((c) => c.code.toUpperCase() === clean);
  if (!coupon || !coupon.active) {
    return { valid: false, message: 'Cupom inválido ou expirado.' };
  }
  if (currentTotal < coupon.minOrderValue) {
    return {
      valid: false,
      message: `Valor mínimo para este cupom é R$ ${coupon.minOrderValue.toFixed(2).replace('.', ',')}.`,
    };
  }
  return { valid: true, coupon, message: `Cupom ${coupon.code} aplicado com sucesso! (${coupon.discountPercentage}% OFF)` };
}

// ---------------- CONFIG ----------------
export function getStoreConfig(): StoreConfig {
  if (typeof window === 'undefined') return DEFAULT_CONFIG;
  const raw = localStorage.getItem(STORAGE_KEYS.CONFIG);
  if (!raw) {
    localStorage.setItem(STORAGE_KEYS.CONFIG, JSON.stringify(DEFAULT_CONFIG));
    return DEFAULT_CONFIG;
  }
  try {
    return { ...DEFAULT_CONFIG, ...JSON.parse(raw) };
  } catch {
    return DEFAULT_CONFIG;
  }
}

export function updateStoreConfig(config: Partial<StoreConfig>): StoreConfig {
  const current = getStoreConfig();
  const updated = { ...current, ...config };
  localStorage.setItem(STORAGE_KEYS.CONFIG, JSON.stringify(updated));
  notifyChange();
  return updated;
}

// ---------------- ADMIN AUTH ----------------
export function getAdminSession(): AdminUser | null {
  if (typeof window === 'undefined') return null;
  const raw = localStorage.getItem(STORAGE_KEYS.ADMIN_SESSION);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function loginAdmin(email: string, pass: string): { success: boolean; user?: AdminUser; error?: string } {
  // Demo protected authentication: allows store credentials
  if ((email === 'admin@belliartesanatos.com.br' || email === 'wlcpaim@gmail.com') && pass === 'admin123') {
    const user: AdminUser = {
      id: 'admin-1',
      name: 'Equipe Belli Artesanatos',
      email: email,
      role: 'superadmin',
    };
    localStorage.setItem(STORAGE_KEYS.ADMIN_SESSION, JSON.stringify(user));
    notifyChange();
    return { success: true, user };
  }
  return { success: false, error: 'E-mail ou senha administrativa incorretos. Use admin@belliartesanatos.com.br / admin123' };
}

export function logoutAdmin(): void {
  localStorage.removeItem(STORAGE_KEYS.ADMIN_SESSION);
  notifyChange();
}