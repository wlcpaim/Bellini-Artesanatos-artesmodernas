export type ProductCategory = 
  | 'croche'
  | 'amigurumi'
  | 'buques'
  | 'macrame'
  | 'velas'
  | 'decoracao'
  | 'bolsas'
  | 'lembrancinhas';

export interface Product {
  id: string;
  name: string;
  slug: string;
  category: ProductCategory;
  categoryName: string;
  price: number;
  originalPrice?: number;
  stock: number;
  rating: number;
  reviewCount: number;
  description: string;
  materials: string;
  dimensions: string;
  careInstructions: string;
  images: string[];
  featured: boolean;
  isNew: boolean;
  createdAt: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export type OrderStatus = 'pendente' | 'pago' | 'producao' | 'enviado' | 'entregue' | 'cancelado';

export interface OrderItem {
  productId: string;
  productName: string;
  price: number;
  quantity: number;
  image: string;
}

export interface CustomerAddress {
  cep: string;
  street: string;
  number: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  createdAt: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  address: CustomerAddress;
  items: OrderItem[];
  subtotal: number;
  discount: number;
  couponCode?: string;
  shipping: number;
  total: number;
  paymentMethod: 'pix' | 'cartao' | 'boleto';
  status: OrderStatus;
  notes?: string;
}

export interface Coupon {
  code: string;
  discountPercentage: number;
  minOrderValue: number;
  active: boolean;
}

export interface StoreConfig {
  storeName: string;
  slogan: string;
  whatsapp: string;
  instagram: string;
  email: string;
  pixKey: string;
  pixKeyType: 'cnpj' | 'cpf' | 'email' | 'telefone' | 'aleatoria';
  freeShippingMin: number;
  standardShippingFee: number;
  address: string;
}

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: 'superadmin' | 'editor';
}