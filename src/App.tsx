import React, { useState, useEffect } from 'react';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { HeroBanner } from './components/home/HeroBanner';
import { CategoryShowcase } from './components/home/CategoryShowcase';
import { FeaturedProducts } from './components/home/FeaturedProducts';
import { AboutSection } from './components/home/AboutSection';
import { Testimonials } from './components/home/Testimonials';
import { CatalogView } from './components/catalog/CatalogView';
import { ProductDetailModal } from './components/catalog/ProductDetailModal';
import { CartDrawer } from './components/cart/CartDrawer';
import { CheckoutModal } from './components/checkout/CheckoutModal';
import { PoliciesModal } from './components/pages/PoliciesModal';
import { AdminLoginModal } from './components/admin/AdminLoginModal';
import { AdminDashboard } from './components/admin/AdminDashboard';

import { Product, ProductCategory, CartItem, Coupon, StoreConfig, AdminUser, Order } from './types/store';
import { 
  getProducts, getCart, addToCart, updateCartQuantity, removeFromCart, 
  getStoreConfig, getAdminSession, logoutAdmin 
} from './services/storeStorage';

export default function App() {
  const [currentView, setCurrentView] = useState<'home' | 'catalog' | 'admin'>('home');
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [config, setConfig] = useState<StoreConfig>(getStoreConfig());
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);

  // Search
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | 'all'>('all');

  // Modais
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [checkoutCoupon, setCheckoutCoupon] = useState<Coupon | undefined>(undefined);
  const [detailProduct, setDetailProduct] = useState<Product | null>(null);
  const [isPoliciesOpen, setIsPoliciesOpen] = useState(false);
  const [isAdminLoginOpen, setIsAdminLoginOpen] = useState(false);

  // Load initial data & listen for changes
  useEffect(() => {
    const refresh = () => {
      setProducts(getProducts());
      setCart(getCart());
      setConfig(getStoreConfig());
      setAdminUser(getAdminSession());
    };

    refresh();
    window.addEventListener('belli:store_change', refresh);
    return () => window.removeEventListener('belli:store_change', refresh);
  }, []);

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleAddToCart = (product: Product, quantity: number = 1) => {
    addToCart(product, quantity);
    setIsCartOpen(true);
  };

  const handleSelectCategory = (category: ProductCategory | 'all') => {
    setSelectedCategory(category);
    setCurrentView('catalog');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCustomOrder = () => {
    const msg = `Olá Belli Artesanatos! Gostaria de fazer uma encomenda personalizada especial.`;
    window.open(`https://wa.me/${config.whatsapp}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  const handleNavigate = (view: 'home' | 'catalog' | 'admin') => {
    if (view === 'admin') {
      if (adminUser) {
        setCurrentView('admin');
      } else {
        setIsAdminLoginOpen(true);
      }
      return;
    }
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Se estiver na visão do Admin e logado
  if (currentView === 'admin' && adminUser) {
    return (
      <AdminDashboard
        user={adminUser}
        onLogout={() => {
          logoutAdmin();
          setAdminUser(null);
          setCurrentView('home');
        }}
        onBackToStore={() => setCurrentView('home')}
      />
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF6F5]">
      {/* Barra de Navegação */}
      <Navbar
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onNavigate={handleNavigate}
        onOpenPolicies={() => setIsPoliciesOpen(true)}
        config={config}
        onSearch={setSearchTerm}
        searchTerm={searchTerm}
      />

      {/* Conteúdo Principal */}
      <main className="flex-1">
        {currentView === 'home' ? (
          <>
            <HeroBanner
              onExplore={() => {
                setSelectedCategory('all');
                setCurrentView('catalog');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onCustomOrder={handleCustomOrder}
            />

            <CategoryShowcase
              onSelectCategory={handleSelectCategory}
              selectedCategory={selectedCategory}
            />

            <FeaturedProducts
              products={products}
              onAddToCart={(p) => handleAddToCart(p, 1)}
              onOpenDetail={setDetailProduct}
              onViewAll={() => {
                setSelectedCategory('all');
                setCurrentView('catalog');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />

            <AboutSection />

            <Testimonials />
          </>
        ) : (
          <CatalogView
            products={products}
            onAddToCart={(p) => handleAddToCart(p, 1)}
            onOpenDetail={setDetailProduct}
            initialCategory={selectedCategory}
            searchTerm={searchTerm}
            onSearch={setSearchTerm}
          />
        )}
      </main>

      {/* Rodapé */}
      <Footer
        config={config}
        onNavigate={handleNavigate}
        onOpenPolicies={() => setIsPoliciesOpen(true)}
      />

      {/* MODAIS GLOBAIS */}
      <ProductDetailModal
        product={detailProduct}
        onClose={() => setDetailProduct(null)}
        onAddToCart={handleAddToCart}
        config={config}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={updateCartQuantity}
        onRemoveItem={removeFromCart}
        onCheckout={(coupon) => {
          setCheckoutCoupon(coupon);
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
        config={config}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cart={cart}
        coupon={checkoutCoupon}
        config={config}
        onOrderCompleted={() => {
          // Callback ao concluir pedido
        }}
      />

      <PoliciesModal
        isOpen={isPoliciesOpen}
        onClose={() => setIsPoliciesOpen(false)}
      />

      <AdminLoginModal
        isOpen={isAdminLoginOpen}
        onClose={() => setIsAdminLoginOpen(false)}
        onLoginSuccess={(user) => {
          setAdminUser(user);
          setCurrentView('admin');
        }}
      />
    </div>
  );
}