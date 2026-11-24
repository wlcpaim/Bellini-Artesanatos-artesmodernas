import React, { useState } from 'react';
import { X, Star, ShoppingBag, MessageCircle, ShieldCheck, Truck, RefreshCcw, Heart, Check } from 'lucide-react';
import { Product, StoreConfig } from '../../types/store';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
  config: StoreConfig;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddToCart,
  config,
}) => {
  if (!product) return null;

  const [quantity, setQuantity] = useState(1);
  const [selectedImg, setSelectedImg] = useState(0);
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    onAddToCart(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleWhatsApp = () => {
    const text = `Olá Belli Artesanatos! Gostaria de encomendar ou tirar dúvidas sobre a peça: *${product.name}* (Ref: ${product.id}).`;
    window.open(`https://wa.me/${config.whatsapp}?text=${encodeURIComponent(text)}`, '_blank');
  };

  const installments = (product.price / 3).toFixed(2).replace('.', ',');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-[#D9A6AE]/40 relative">
        {/* Fechar Modal */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/80 hover:bg-white text-[#594744] hover:text-[#B87583] shadow-sm transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 p-6 sm:p-8">
          {/* Coluna Imagens */}
          <div className="md:col-span-6 space-y-4">
            <div className="aspect-square rounded-2xl overflow-hidden bg-[#F3E5E3]/30 border border-[#D9A6AE]/30">
              <img
                src={product.images[selectedImg] || product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>

            {product.images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImg(i)}
                    className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-all shrink-0 ${
                      selectedImg === i ? 'border-[#B87583] shadow-md' : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="Miniatura" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Coluna Informações */}
          <div className="md:col-span-6 space-y-5 flex flex-col justify-between">
            <div className="space-y-3">
              <span className="text-xs uppercase font-semibold text-[#B87583] tracking-widest block">
                {product.categoryName}
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#594744] leading-snug">
                {product.name}
              </h2>

              <div className="flex items-center gap-2 text-xs text-[#594744]/75">
                <div className="flex items-center text-[#B87583]">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'fill-current' : 'text-gray-300'}`}
                    />
                  ))}
                </div>
                <span className="font-bold text-sm text-[#594744]">{product.rating.toFixed(1)}</span>
                <span>({product.reviewCount} avaliações de clientes)</span>
              </div>

              {/* Preço */}
              <div className="pt-2">
                <div className="flex items-baseline gap-3">
                  <span className="font-serif text-3xl font-bold text-[#594744]">
                    R$ {product.price.toFixed(2).replace('.', ',')}
                  </span>
                  {product.originalPrice && product.originalPrice > product.price && (
                    <span className="text-sm text-[#594744]/50 line-through">
                      R$ {product.originalPrice.toFixed(2).replace('.', ',')}
                    </span>
                  )}
                </div>
                <p className="text-xs text-[#B87583] font-medium mt-0.5">
                  ou 3x de R$ {installments} sem juros • 5% de desconto no PIX
                </p>
              </div>

              {/* Descrição */}
              <p className="text-xs sm:text-sm text-[#594744]/80 leading-relaxed pt-2 border-t border-[#D9A6AE]/30">
                {product.description}
              </p>

              {/* Ficha Técnica */}
              <div className="bg-[#FAF6F5] p-3.5 rounded-xl border border-[#D9A6AE]/30 space-y-1.5 text-xs">
                <p className="text-[#594744]">
                  <strong className="text-[#594744]">Materiais:</strong> {product.materials}
                </p>
                <p className="text-[#594744]">
                  <strong className="text-[#594744]">Dimensões:</strong> {product.dimensions}
                </p>
                <p className="text-[#594744]">
                  <strong className="text-[#594744]">Cuidados:</strong> {product.careInstructions}
                </p>
              </div>

              {/* Estoque */}
              <p className="text-xs font-semibold text-[#594744]/70">
                Disponibilidade:{' '}
                {product.stock > 0 ? (
                  <span className="text-emerald-700 font-bold">{product.stock} unidades em ateliê</span>
                ) : (
                  <span className="text-rose-600 font-bold">Produção sob encomenda</span>
                )}
              </p>
            </div>

            {/* Ações / Quantidade / Carrinho */}
            <div className="space-y-3 pt-4 border-t border-[#D9A6AE]/30">
              <div className="flex items-center gap-3">
                <div className="flex items-center border border-[#D9A6AE] rounded-full overflow-hidden bg-white">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-2 text-[#594744] hover:bg-[#F3E5E3]/50 text-sm font-bold"
                  >
                    -
                  </button>
                  <span className="px-3 py-2 text-xs font-bold text-[#594744] min-w-[28px] text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(Math.min(product.stock || 10, quantity + 1))}
                    className="px-3 py-2 text-[#594744] hover:bg-[#F3E5E3]/50 text-sm font-bold"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={handleAdd}
                  disabled={product.stock <= 0}
                  className={`flex-1 py-3 px-6 rounded-full font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-craft ${
                    added
                      ? 'bg-emerald-600 text-white'
                      : 'bg-[#B87583] hover:bg-[#B87583]/90 text-white active:scale-95'
                  }`}
                >
                  {added ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Adicionado à Sacola!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      <span>Adicionar à Sacola</span>
                    </>
                  )}
                </button>
              </div>

              {/* Botão WhatsApp */}
              <button
                onClick={handleWhatsApp}
                className="w-full py-2.5 px-4 rounded-full border border-emerald-600/50 hover:bg-emerald-50 text-emerald-800 text-xs font-medium flex items-center justify-center gap-2 transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-emerald-600" />
                <span>Pedir ou Personalizar via WhatsApp</span>
              </button>

              {/* Garantias */}
              <div className="grid grid-cols-3 gap-2 pt-2 text-center text-[10px] text-[#594744]/70">
                <div className="flex flex-col items-center gap-1">
                  <ShieldCheck className="w-4 h-4 text-[#B87583]" />
                  <span>Compra 100% Segura</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <Truck className="w-4 h-4 text-[#B87583]" />
                  <span>Envio Rastreado</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <Heart className="w-4 h-4 text-[#B87583]" />
                  <span>Embalagem Afetiva</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};