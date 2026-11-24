import React, { useState } from 'react';
import { ShoppingBag, Search, Shield, Heart, Menu, X, Sparkles, MessageCircle } from 'lucide-react';
import { StoreConfig } from '../../types/store';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  onNavigate: (view: 'home' | 'catalog' | 'admin') => void;
  onOpenPolicies: () => void;
  config: StoreConfig;
  onSearch: (term: string) => void;
  searchTerm: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  onOpenCart,
  onNavigate,
  onOpenPolicies,
  config,
  onSearch,
  searchTerm,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const handleWhatsAppClick = () => {
    const url = `https://wa.me/${config.whatsapp}?text=${encodeURIComponent('Olá Belli Artesanatos! Gostaria de tirar dúvidas sobre as peças.')}`;
    window.open(url, '_blank');
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#D9A6AE]/30 transition-all shadow-sm">
      {/* Top Bar Promocional */}
      <div className="bg-[#594744] text-[#F3E5E3] text-xs py-2 px-4 text-center flex items-center justify-center gap-2 font-medium">
        <Sparkles className="w-3.5 h-3.5 text-[#D9A6AE] animate-pulse" />
        <span>Artes modernas, feitas com carinho</span>
        <span className="hidden sm:inline">•</span>
        <span className="hidden sm:inline text-[#D9A6AE]">Frete grátis para compras acima de R$ {config.freeShippingMin.toFixed(2).replace('.', ',')}</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          {/* Logo Belli Artesanatos */}
          <button
            onClick={() => { onNavigate('home'); setMobileMenuOpen(false); }}
            className="flex items-center gap-3 text-left group focus:outline-none"
          >
            <div className="w-11 h-11 rounded-full bg-[#B87583]/15 flex items-center justify-center border border-[#B87583]/30 group-hover:scale-105 transition-transform">
              <Heart className="w-5 h-5 text-[#B87583] fill-[#B87583]/30" />
            </div>
            <div>
              <span className="font-serif text-2xl font-bold tracking-tight text-[#594744] group-hover:text-[#B87583] transition-colors block">
                Belli
              </span>
              <span className="text-[10px] tracking-[0.2em] uppercase text-[#B87583] font-semibold block -mt-1">
                Artesanatos
              </span>
            </div>
          </button>

          {/* Links Desktop */}
          <nav className="hidden md:flex items-center gap-8">
            <button
              onClick={() => onNavigate('home')}
              className="text-sm font-medium text-[#594744] hover:text-[#B87583] transition-colors"
            >
              Início
            </button>
            <button
              onClick={() => onNavigate('catalog')}
              className="text-sm font-medium text-[#594744] hover:text-[#B87583] transition-colors"
            >
              Catálogo Completo
            </button>
            <button
              onClick={onOpenPolicies}
              className="text-sm font-medium text-[#594744] hover:text-[#B87583] transition-colors"
            >
              Políticas & Envio
            </button>
            <button
              onClick={handleWhatsAppClick}
              className="text-sm font-medium text-[#594744] hover:text-[#B87583] transition-colors flex items-center gap-1.5"
            >
              <MessageCircle className="w-4 h-4 text-[#B87583]" />
              WhatsApp
            </button>
          </nav>

          {/* Ações / Busca / Carrinho / Admin */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Campo de Busca Rápida */}
            <div className="relative hidden sm:block w-48 lg:w-64">
              <input
                type="text"
                placeholder="Buscar peças artesanais..."
                value={searchTerm}
                onChange={(e) => {
                  onSearch(e.target.value);
                  if (e.target.value.trim().length > 0) onNavigate('catalog');
                }}
                className="w-full text-xs pl-8 pr-3 py-2 rounded-full border border-[#D9A6AE]/50 bg-[#F3E5E3]/40 focus:bg-white focus:outline-none focus:border-[#B87583] text-[#594744] placeholder-[#594744]/50 transition-all"
              />
              <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-[#B87583]" />
            </div>

            {/* Ícone de Busca Mobile */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2 text-[#594744] hover:text-[#B87583] sm:hidden rounded-full hover:bg-[#F3E5E3]/40"
              aria-label="Buscar"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Painel Administrativo / Admin */}
            <button
              onClick={() => onNavigate('admin')}
              className="p-2 text-[#594744] hover:text-[#B87583] rounded-full hover:bg-[#F3E5E3]/40 transition-colors"
              title="Painel Administrativo /admin"
            >
              <Shield className="w-5 h-5" />
            </button>

            {/* Carrinho de Compras */}
            <button
              onClick={onOpenCart}
              className="relative flex items-center gap-2 bg-[#B87583] hover:bg-[#B87583]/90 text-white px-4 py-2.5 rounded-full font-medium text-xs sm:text-sm shadow-craft transition-all active:scale-95"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden sm:inline">Carrinho</span>
              {cartCount > 0 && (
                <span className="bg-[#594744] text-[#F3E5E3] text-[10px] font-bold rounded-full h-5 min-w-[20px] px-1 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Menu Hambúrguer Mobile */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#594744] md:hidden rounded-full hover:bg-[#F3E5E3]/40"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Input de Busca Expansível Mobile */}
        {searchOpen && (
          <div className="sm:hidden pb-3 pt-1">
            <div className="relative">
              <input
                type="text"
                placeholder="Buscar no catálogo..."
                value={searchTerm}
                onChange={(e) => {
                  onSearch(e.target.value);
                  if (e.target.value.trim().length > 0) onNavigate('catalog');
                }}
                className="w-full text-xs pl-8 pr-3 py-2 rounded-full border border-[#D9A6AE] bg-[#F3E5E3]/40 text-[#594744]"
                autoFocus
              />
              <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-[#B87583]" />
            </div>
          </div>
        )}
      </div>

      {/* Menu Gaveta Mobile */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-[#D9A6AE]/30 px-6 py-6 space-y-4 animate-in fade-in slide-in-from-top-4 duration-200">
          <button
            onClick={() => { onNavigate('home'); setMobileMenuOpen(false); }}
            className="block w-full text-left font-medium text-base text-[#594744] hover:text-[#B87583]"
          >
            Início
          </button>
          <button
            onClick={() => { onNavigate('catalog'); setMobileMenuOpen(false); }}
            className="block w-full text-left font-medium text-base text-[#594744] hover:text-[#B87583]"
          >
            Catálogo Completo
          </button>
          <button
            onClick={() => { onOpenPolicies(); setMobileMenuOpen(false); }}
            className="block w-full text-left font-medium text-base text-[#594744] hover:text-[#B87583]"
          >
            Políticas de Envio & Trocas
          </button>
          <button
            onClick={() => { handleWhatsAppClick(); setMobileMenuOpen(false); }}
            className="block w-full text-left font-medium text-base text-[#B87583] flex items-center gap-2"
          >
            <MessageCircle className="w-4 h-4" />
            Falar no WhatsApp
          </button>
          <button
            onClick={() => { onNavigate('admin'); setMobileMenuOpen(false); }}
            className="block w-full text-left font-medium text-base text-[#594744]/70 flex items-center gap-2 pt-2 border-t border-[#D9A6AE]/20"
          >
            <Shield className="w-4 h-4" />
            Painel Administrativo
          </button>
        </div>
      )}
    </header>
  );
};