import React, { useState } from 'react';
import { X, Trash2, ArrowRight, ShoppingBag, Sparkles, Tag, Check, Truck } from 'lucide-react';
import { CartItem, StoreConfig, Coupon } from '../../types/store';
import { validateCoupon } from '../../services/storeStorage';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onCheckout: (coupon?: Coupon) => void;
  config: StoreConfig;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
  config,
}) => {
  if (!isOpen) return null;

  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | undefined>(undefined);
  const [couponMsg, setCouponMsg] = useState<{ text: string; error: boolean } | null>(null);

  const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const discountAmount = appliedCoupon ? (subtotal * appliedCoupon.discountPercentage) / 100 : 0;
  const isFreeShipping = subtotal >= config.freeShippingMin;
  const shippingFee = isFreeShipping || subtotal === 0 ? 0 : config.standardShippingFee;
  const total = Math.max(0, subtotal - discountAmount + shippingFee);

  const missingForFreeShipping = Math.max(0, config.freeShippingMin - subtotal);
  const progressFreeShipping = Math.min(100, (subtotal / config.freeShippingMin) * 100);

  const handleApplyCoupon = () => {
    if (!couponCode.trim()) return;
    const res = validateCoupon(couponCode, subtotal);
    if (res.valid && res.coupon) {
      setAppliedCoupon(res.coupon);
      setCouponMsg({ text: res.message, error: false });
    } else {
      setCouponMsg({ text: res.message, error: true });
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between">
          
          {/* Cabeçalho */}
          <div className="p-6 border-b border-[#D9A6AE]/30 flex items-center justify-between bg-[#FAF6F5]">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#B87583]" />
              <h2 className="font-serif text-lg font-bold text-[#594744]">Sua Sacola de Afeto</h2>
              <span className="bg-[#B87583]/15 text-[#B87583] text-xs font-bold px-2 py-0.5 rounded-full">
                {cart.reduce((sum, item) => sum + item.quantity, 0)}
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-[#594744] hover:text-[#B87583] rounded-full hover:bg-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Barra de Frete Grátis */}
          <div className="bg-[#F3E5E3]/50 px-6 py-3 border-b border-[#D9A6AE]/20">
            <div className="flex items-center justify-between text-xs text-[#594744] mb-1.5 font-medium">
              <span className="flex items-center gap-1.5">
                <Truck className="w-3.5 h-3.5 text-[#B87583]" />
                {isFreeShipping ? (
                  <strong className="text-emerald-700">Parabéns! Você ganhou Frete Grátis!</strong>
                ) : (
                  <span>
                    Faltam <strong>R$ {missingForFreeShipping.toFixed(2).replace('.', ',')}</strong> para frete grátis
                  </span>
                )}
              </span>
              <span className="text-[10px] text-[#594744]/70">{progressFreeShipping.toFixed(0)}%</span>
            </div>
            <div className="w-full bg-white rounded-full h-1.5 overflow-hidden">
              <div
                className="bg-[#B87583] h-full transition-all duration-500 rounded-full"
                style={{ width: `${progressFreeShipping}%` }}
              />
            </div>
          </div>

          {/* Lista de Itens */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cart.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#F3E5E3] flex items-center justify-center mx-auto text-[#B87583]">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-base font-bold text-[#594744]">Sua sacola está vazia</h3>
                <p className="text-xs text-[#594744]/70 max-w-xs mx-auto">
                  Aproveite para escolher peças exclusivas tecidas à mão com afeto para o seu lar.
                </p>
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 rounded-full bg-[#B87583] text-white text-xs font-semibold hover:bg-[#B87583]/90 transition-all"
                >
                  Explorar Criações
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.product.id}
                  className="flex gap-4 p-3 rounded-2xl bg-[#FAF6F5] border border-[#D9A6AE]/30 items-center justify-between"
                >
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-16 h-16 rounded-xl object-cover border border-white"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-serif font-bold text-xs text-[#594744] truncate">
                      {item.product.name}
                    </h4>
                    <p className="text-[10px] text-[#B87583] uppercase tracking-wider">
                      {item.product.categoryName}
                    </p>
                    <p className="font-serif text-xs font-bold text-[#594744] mt-1">
                      R$ {item.product.price.toFixed(2).replace('.', ',')}
                    </p>
                  </div>

                  <div className="flex flex-col items-end gap-2">
                    <button
                      onClick={() => onRemoveItem(item.product.id)}
                      className="text-gray-400 hover:text-rose-600 transition-colors"
                      title="Remover"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>

                    <div className="flex items-center border border-[#D9A6AE] rounded-lg bg-white overflow-hidden">
                      <button
                        onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                        className="px-2 py-0.5 text-xs text-[#594744] hover:bg-[#F3E5E3]/60"
                      >
                        -
                      </button>
                      <span className="px-2 text-xs font-bold text-[#594744]">{item.quantity}</span>
                      <button
                        onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                        className="px-2 py-0.5 text-xs text-[#594744] hover:bg-[#F3E5E3]/60"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Rodapé do Carrinho com Cupom e Totais */}
          {cart.length > 0 && (
            <div className="p-6 border-t border-[#D9A6AE]/30 bg-[#FAF6F5] space-y-4">
              {/* Cupom */}
              <div className="space-y-1.5">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <input
                      type="text"
                      placeholder="Cupom (ex: BEMVINDA10)"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      className="w-full text-xs pl-8 pr-3 py-2 rounded-xl border border-[#D9A6AE] bg-white text-[#594744] uppercase"
                    />
                    <Tag className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-[#B87583]" />
                  </div>
                  <button
                    onClick={handleApplyCoupon}
                    className="px-4 py-2 bg-[#594744] text-[#F3E5E3] text-xs font-semibold rounded-xl hover:bg-[#594744]/90 transition-colors"
                  >
                    Aplicar
                  </button>
                </div>
                {couponMsg && (
                  <p className={`text-[10px] ${couponMsg.error ? 'text-rose-600' : 'text-emerald-700 font-medium'}`}>
                    {couponMsg.text}
                  </p>
                )}
              </div>

              {/* Linhas de Valores */}
              <div className="space-y-1.5 text-xs text-[#594744]/80">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>R$ {subtotal.toFixed(2).replace('.', ',')}</span>
                </div>
                {appliedCoupon && (
                  <div className="flex justify-between text-emerald-700 font-medium">
                    <span>Desconto ({appliedCoupon.code} - {appliedCoupon.discountPercentage}%)</span>
                    <span>- R$ {discountAmount.toFixed(2).replace('.', ',')}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Frete estimado</span>
                  <span>
                    {isFreeShipping ? (
                      <span className="text-emerald-700 font-bold">Grátis</span>
                    ) : (
                      `R$ ${shippingFee.toFixed(2).replace('.', ',')}`
                    )}
                  </span>
                </div>
                <div className="flex justify-between font-serif text-base font-bold text-[#594744] pt-2 border-t border-[#D9A6AE]/30">
                  <span>Total do Pedido</span>
                  <span>R$ {total.toFixed(2).replace('.', ',')}</span>
                </div>
              </div>

              {/* Botão Finalizar */}
              <button
                onClick={() => onCheckout(appliedCoupon)}
                className="w-full py-3.5 px-6 rounded-full bg-[#B87583] hover:bg-[#B87583]/90 text-white font-semibold text-sm shadow-craft flex items-center justify-center gap-2 transition-all active:scale-95"
              >
                <span>Finalizar Pedido com Afeto</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};