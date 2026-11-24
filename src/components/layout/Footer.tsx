import React from 'react';
import { Heart, Instagram, MessageCircle, Mail, MapPin, ShieldCheck, Truck, RefreshCcw, CreditCard } from 'lucide-react';
import { StoreConfig } from '../../types/store';

interface FooterProps {
  config: StoreConfig;
  onNavigate: (view: 'home' | 'catalog' | 'admin') => void;
  onOpenPolicies: () => void;
}

export const Footer: React.FC<FooterProps> = ({ config, onNavigate, onOpenPolicies }) => {
  const handleWhatsApp = () => {
    window.open(`https://wa.me/${config.whatsapp}`, '_blank');
  };

  return (
    <footer className="bg-[#594744] text-[#F3E5E3] pt-16 pb-8 border-t-4 border-[#B87583]">
      {/* Vantagens / Selos */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pb-12 border-b border-[#F3E5E3]/15">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#B87583]/30 flex items-center justify-center text-[#D9A6AE]">
              <Heart className="w-5 h-5 fill-current" />
            </div>
            <div>
              <h4 className="font-semibold text-xs sm:text-sm text-white">100% Feito à Mão</h4>
              <p className="text-[11px] text-[#F3E5E3]/70">Peças com afeto e exclusividade</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#B87583]/30 flex items-center justify-center text-[#D9A6AE]">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-semibold text-xs sm:text-sm text-white">Envio Todo Brasil</h4>
              <p className="text-[11px] text-[#F3E5E3]/70">Embalagens seguras e perfumadas</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#B87583]/30 flex items-center justify-center text-[#D9A6AE]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-semibold text-xs sm:text-sm text-white">Compra Segura</h4>
              <p className="text-[11px] text-[#F3E5E3]/70">PIX com desconto & Cartão</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#B87583]/30 flex items-center justify-center text-[#D9A6AE]">
              <RefreshCcw className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-semibold text-xs sm:text-sm text-white">Garantia Artesanal</h4>
              <p className="text-[11px] text-[#F3E5E3]/70">7 dias para trocas com tranquilidade</p>
            </div>
          </div>
        </div>

        {/* Grade Principal do Rodapé */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 py-6">
          {/* Sobre */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="font-serif text-2xl font-bold tracking-tight text-white">Belli</span>
              <span className="text-xs uppercase tracking-widest text-[#D9A6AE]">Artesanatos</span>
            </div>
            <p className="text-xs leading-relaxed text-[#F3E5E3]/80">
              {config.slogan}. Criamos peças atemporais que aquecem lares e celebram a beleza do trabalho manual refinado.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={handleWhatsApp}
                className="w-8 h-8 rounded-full bg-[#B87583] hover:bg-[#D9A6AE] text-white flex items-center justify-center transition-colors"
                title="WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
              </button>
              <a
                href={`https://instagram.com`}
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-[#B87583] hover:bg-[#D9A6AE] text-white flex items-center justify-center transition-colors"
                title="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={`mailto:${config.email}`}
                className="w-8 h-8 rounded-full bg-[#B87583] hover:bg-[#D9A6AE] text-white flex items-center justify-center transition-colors"
                title="E-mail"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Links Rápidos */}
          <div>
            <h4 className="font-serif text-base font-semibold text-white mb-4">Navegação</h4>
            <ul className="space-y-2 text-xs text-[#F3E5E3]/80">
              <li>
                <button onClick={() => onNavigate('home')} className="hover:text-[#D9A6AE] transition-colors">
                  Página Inicial
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('catalog')} className="hover:text-[#D9A6AE] transition-colors">
                  Catálogo de Produtos
                </button>
              </li>
              <li>
                <button onClick={onOpenPolicies} className="hover:text-[#D9A6AE] transition-colors">
                  Prazos & Entregas
                </button>
              </li>
              <li>
                <button onClick={onOpenPolicies} className="hover:text-[#D9A6AE] transition-colors">
                  Trocas & Devoluções
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('admin')} className="hover:text-[#D9A6AE] transition-colors text-[#D9A6AE]">
                  Acesso Administrativo
                </button>
              </li>
            </ul>
          </div>

          {/* Categorias */}
          <div>
            <h4 className="font-serif text-base font-semibold text-white mb-4">Coleções</h4>
            <ul className="space-y-2 text-xs text-[#F3E5E3]/80">
              <li>Crochê & Sousplats</li>
              <li>Amigurumis Delicados</li>
              <li>Buquês Artesanais Eternos</li>
              <li>Painéis e Hangers em Macramê</li>
              <li>Velas Aromáticas Vegetais</li>
              <li>Bolsas & Acessórios</li>
            </ul>
          </div>

          {/* Atendimento */}
          <div className="space-y-3">
            <h4 className="font-serif text-base font-semibold text-white mb-4">Atendimento</h4>
            <p className="text-xs text-[#F3E5E3]/80 flex items-start gap-2">
              <MapPin className="w-4 h-4 text-[#D9A6AE] shrink-0 mt-0.5" />
              <span>{config.address}</span>
            </p>
            <p className="text-xs text-[#F3E5E3]/80 flex items-center gap-2">
              <MessageCircle className="w-4 h-4 text-[#D9A6AE] shrink-0" />
              <span>(11) 99999-8888 • Seg a Sex, 9h às 18h</span>
            </p>
            <div className="pt-2">
              <p className="text-[11px] text-[#D9A6AE] font-medium mb-1">Formas de Pagamento:</p>
              <div className="flex items-center gap-2 text-[#F3E5E3]/70 text-xs">
                <CreditCard className="w-4 h-4" />
                <span>PIX Instantâneo, Cartões até 6x, Boleto</span>
              </div>
            </div>
          </div>
        </div>

        {/* Rodapé inferior */}
        <div className="pt-8 mt-8 border-t border-[#F3E5E3]/15 text-center text-xs text-[#F3E5E3]/60 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} Belli Artesanatos. Todos os direitos reservados. CNPJ: 00.000.000/0001-00</p>
          <p className="flex items-center gap-1">
            Feito com carinho e carinho artesanal <Heart className="w-3 h-3 text-[#B87583] fill-current" />
          </p>
        </div>
      </div>
    </footer>
  );
};