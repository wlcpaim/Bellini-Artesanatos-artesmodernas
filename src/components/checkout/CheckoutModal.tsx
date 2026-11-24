import React, { useState } from 'react';
import { X, CheckCircle, MessageCircle, QrCode, CreditCard, FileText, ArrowRight, ShieldCheck, Heart } from 'lucide-react';
import { CartItem, Coupon, StoreConfig, Order } from '../../types/store';
import { createOrder } from '../../services/storeStorage';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  coupon?: Coupon;
  config: StoreConfig;
  onOrderCompleted: (order: Order) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  cart,
  coupon,
  config,
  onOrderCompleted,
}) => {
  if (!isOpen) return null;

  const [step, setStep] = useState<'form' | 'success'>('form');
  const [createdOrder, setCreatedOrder] = useState<Order | null>(null);

  // Form State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [cep, setCep] = useState('');
  const [street, setStreet] = useState('');
  const [number, setNumber] = useState('');
  const [complement, setComplement] = useState('');
  const [neighborhood, setNeighborhood] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('SP');
  const [paymentMethod, setPaymentMethod] = useState<'pix' | 'cartao' | 'boleto'>('pix');
  const [notes, setNotes] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const subtotal = cart.reduce((acc, it) => acc + it.product.price * it.quantity, 0);
  const discount = coupon ? (subtotal * coupon.discountPercentage) / 100 : 0;
  const isFreeShipping = subtotal >= config.freeShippingMin;
  const shipping = isFreeShipping ? 0 : config.standardShippingFee;
  const total = Math.max(0, subtotal - discount + shipping);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone || !street || !number || !city) {
      setErrorMsg('Por favor preencha todos os campos obrigatórios.');
      return;
    }
    setErrorMsg('');
    setSubmitting(true);

    try {
      const order = createOrder({
        customerName: name,
        customerEmail: email,
        customerPhone: phone,
        address: {
          cep,
          street,
          number,
          complement,
          neighborhood,
          city,
          state,
        },
        items: cart.map((it) => ({
          productId: it.product.id,
          productName: it.product.name,
          price: it.product.price,
          quantity: it.quantity,
          image: it.product.images[0],
        })),
        subtotal,
        discount,
        couponCode: coupon?.code,
        shipping,
        total,
        paymentMethod,
        status: paymentMethod === 'pix' ? 'pendente' : 'pago',
        notes,
      });

      setCreatedOrder(order);
      setStep('success');
      onOrderCompleted(order);
    } catch (err: any) {
      setErrorMsg('Erro ao gerar pedido: ' + err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleSendWhatsAppOrder = () => {
    if (!createdOrder) return;
    const itemsList = createdOrder.items
      .map((it) => `• ${it.quantity}x ${it.productName} (R$ ${it.price.toFixed(2).replace('.', ',')})`)
      .join('
');

    const msg = `*NOVO PEDIDO BELLI ARTESANATOS* 🌸
` +
      `*Pedido:* ${createdOrder.orderNumber}
` +
      `*Cliente:* ${createdOrder.customerName}
` +
      `*WhatsApp:* ${createdOrder.customerPhone}

` +
      `*Itens:*
${itemsList}

` +
      `*Total:* R$ ${createdOrder.total.toFixed(2).replace('.', ',')}
` +
      `*Pagamento:* ${createdOrder.paymentMethod.toUpperCase()}
` +
      `*Entrega:* ${createdOrder.address.street}, ${createdOrder.address.number} - ${createdOrder.address.city}/${createdOrder.address.state}
` +
      (createdOrder.notes ? `*Observações:* ${createdOrder.notes}
` : '') +
      `
Gostaria de confirmar meu pedido! ✨`;

    window.open(`https://wa.me/${config.whatsapp}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-[#D9A6AE]/40 relative p-6 sm:p-8">
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-[#594744] hover:text-[#B87583] rounded-full hover:bg-[#FAF6F5] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {step === 'form' ? (
          <div>
            <div className="mb-6">
              <span className="text-xs uppercase font-semibold text-[#B87583] tracking-widest block">
                Etapa Final
              </span>
              <h2 className="font-serif text-2xl font-bold text-[#594744]">
                Finalizar seu Pedido
              </h2>
              <p className="text-xs text-[#594744]/75 mt-1">
                Preencha os dados de entrega. O pedido será processado imediatamente pelo ateliê.
              </p>
            </div>

            {errorMsg && (
              <div className="p-3 mb-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs">
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Dados Pessoais */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#594744] flex items-center gap-1.5">
                  <span>1. Seus Dados</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-medium text-[#594744] block mb-1">Nome Completo *</label>
                    <input
                      type="text"
                      required
                      placeholder="Ex: Mariana Silveira"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full text-xs p-2.5 rounded-xl border border-[#D9A6AE]/60 bg-[#FAF6F5] text-[#594744] focus:bg-white focus:outline-none focus:border-[#B87583]"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-medium text-[#594744] block mb-1">WhatsApp / Telefone *</label>
                    <input
                      type="text"
                      required
                      placeholder="(11) 99999-8888"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full text-xs p-2.5 rounded-xl border border-[#D9A6AE]/60 bg-[#FAF6F5] text-[#594744] focus:bg-white focus:outline-none focus:border-[#B87583]"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-[11px] font-medium text-[#594744] block mb-1">E-mail para Acompanhamento *</label>
                  <input
                    type="email"
                    required
                    placeholder="seuemail@exemplo.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-xl border border-[#D9A6AE]/60 bg-[#FAF6F5] text-[#594744] focus:bg-white focus:outline-none focus:border-[#B87583]"
                  />
                </div>
              </div>

              {/* Endereço de Entrega */}
              <div className="space-y-3 pt-3 border-t border-[#D9A6AE]/30">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#594744]">
                  2. Endereço de Entrega
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="text-[11px] font-medium text-[#594744] block mb-1">CEP *</label>
                    <input
                      type="text"
                      required
                      placeholder="00000-000"
                      value={cep}
                      onChange={(e) => setCep(e.target.value)}
                      className="w-full text-xs p-2.5 rounded-xl border border-[#D9A6AE]/60 bg-[#FAF6F5] text-[#594744]"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="text-[11px] font-medium text-[#594744] block mb-1">Rua / Logradouro *</label>
                    <input
                      type="text"
                      required
                      placeholder="Nome da sua rua"
                      value={street}
                      onChange={(e) => setStreet(e.target.value)}
                      className="w-full text-xs p-2.5 rounded-xl border border-[#D9A6AE]/60 bg-[#FAF6F5] text-[#594744]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div>
                    <label className="text-[11px] font-medium text-[#594744] block mb-1">Número *</label>
                    <input
                      type="text"
                      required
                      placeholder="123"
                      value={number}
                      onChange={(e) => setNumber(e.target.value)}
                      className="w-full text-xs p-2.5 rounded-xl border border-[#D9A6AE]/60 bg-[#FAF6F5] text-[#594744]"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-medium text-[#594744] block mb-1">Complemento</label>
                    <input
                      type="text"
                      placeholder="Apto 42"
                      value={complement}
                      onChange={(e) => setComplement(e.target.value)}
                      className="w-full text-xs p-2.5 rounded-xl border border-[#D9A6AE]/60 bg-[#FAF6F5] text-[#594744]"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-medium text-[#594744] block mb-1">Cidade *</label>
                    <input
                      type="text"
                      required
                      placeholder="São Paulo"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full text-xs p-2.5 rounded-xl border border-[#D9A6AE]/60 bg-[#FAF6F5] text-[#594744]"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-medium text-[#594744] block mb-1">Estado (UF) *</label>
                    <select
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      className="w-full text-xs p-2.5 rounded-xl border border-[#D9A6AE]/60 bg-[#FAF6F5] text-[#594744]"
                    >
                      {['SP', 'RJ', 'MG', 'RS', 'PR', 'SC', 'BA', 'PE', 'DF', 'CE', 'GO', 'ES'].map((uf) => (
                        <option key={uf} value={uf}>{uf}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Forma de Pagamento */}
              <div className="space-y-3 pt-3 border-t border-[#D9A6AE]/30">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#594744]">
                  3. Forma de Pagamento
                </h3>
                <div className="grid grid-cols-3 gap-3">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('pix')}
                    className={`p-3 rounded-2xl border text-left transition-all ${
                      paymentMethod === 'pix'
                        ? 'border-[#B87583] bg-[#F3E5E3]/40 shadow-sm'
                        : 'border-[#D9A6AE]/40 bg-white hover:bg-[#FAF6F5]'
                    }`}
                  >
                    <QrCode className="w-5 h-5 text-[#B87583] mb-1" />
                    <p className="font-bold text-xs text-[#594744]">PIX</p>
                    <p className="text-[10px] text-emerald-700 font-medium">Aprovação imediata</p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('cartao')}
                    className={`p-3 rounded-2xl border text-left transition-all ${
                      paymentMethod === 'cartao'
                        ? 'border-[#B87583] bg-[#F3E5E3]/40 shadow-sm'
                        : 'border-[#D9A6AE]/40 bg-white hover:bg-[#FAF6F5]'
                    }`}
                  >
                    <CreditCard className="w-5 h-5 text-[#B87583] mb-1" />
                    <p className="font-bold text-xs text-[#594744]">Cartão</p>
                    <p className="text-[10px] text-[#594744]/70">Até 3x sem juros</p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('boleto')}
                    className={`p-3 rounded-2xl border text-left transition-all ${
                      paymentMethod === 'boleto'
                        ? 'border-[#B87583] bg-[#F3E5E3]/40 shadow-sm'
                        : 'border-[#D9A6AE]/40 bg-white hover:bg-[#FAF6F5]'
                    }`}
                  >
                    <FileText className="w-5 h-5 text-[#B87583] mb-1" />
                    <p className="font-bold text-xs text-[#594744]">Boleto</p>
                    <p className="text-[10px] text-[#594744]/70">Vencimento em 3 dias</p>
                  </button>
                </div>

                {paymentMethod === 'pix' && (
                  <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 space-y-1">
                    <p className="font-bold">Chave PIX Oficial ({config.pixKeyType}): {config.pixKey}</p>
                    <p className="text-[11px]">Você poderá enviar o comprovante com 1 clique no WhatsApp após finalizar.</p>
                  </div>
                )}
              </div>

              {/* Observações */}
              <div>
                <label className="text-[11px] font-medium text-[#594744] block mb-1">
                  Observações para o Ateliê (Cores preferidas, presente com dedicatória, etc.)
                </label>
                <textarea
                  rows={2}
                  placeholder="Ex: Gostaria que embrulhasse para presente de aniversário."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-xl border border-[#D9A6AE]/60 bg-[#FAF6F5] text-[#594744]"
                />
              </div>

              {/* Resumo Final e Confirmação */}
              <div className="p-4 bg-[#FAF6F5] rounded-2xl border border-[#D9A6AE]/30 space-y-2">
                <div className="flex justify-between text-xs text-[#594744]">
                  <span>Subtotal ({cart.length} itens):</span>
                  <span>R$ {subtotal.toFixed(2).replace('.', ',')}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-xs text-emerald-700">
                    <span>Desconto do Cupom:</span>
                    <span>- R$ {discount.toFixed(2).replace('.', ',')}</span>
                  </div>
                )}
                <div className="flex justify-between text-xs text-[#594744]">
                  <span>Frete:</span>
                  <span>{isFreeShipping ? 'Grátis' : `R$ ${shipping.toFixed(2).replace('.', ',')}`}</span>
                </div>
                <div className="flex justify-between font-serif text-lg font-bold text-[#594744] pt-2 border-t border-[#D9A6AE]/30">
                  <span>Total a Pagar:</span>
                  <span>R$ {total.toFixed(2).replace('.', ',')}</span>
                </div>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3.5 px-6 rounded-full bg-[#B87583] hover:bg-[#B87583]/90 text-white font-semibold text-sm shadow-craft flex items-center justify-center gap-2 transition-all active:scale-95"
              >
                <span>{submitting ? 'Gerando Pedido...' : 'Confirmar e Finalizar Pedido'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        ) : (
          /* Tela de Sucesso */
          <div className="text-center py-6 space-y-6">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto animate-bounce-slow">
              <CheckCircle className="w-10 h-10" />
            </div>

            <div>
              <span className="text-xs uppercase font-bold text-emerald-700 tracking-widest block">
                Pedido Registrado com Sucesso!
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#594744] mt-1">
                Obrigado pelo carinho, {createdOrder?.customerName.split(' ')[0]}!
              </h2>
              <p className="text-xs text-[#594744]/75 mt-1">
                Número do Pedido: <strong className="text-[#B87583] text-sm">{createdOrder?.orderNumber}</strong>
              </p>
            </div>

            {/* Caixa com Resumo e Chave PIX */}
            <div className="bg-[#FAF6F5] p-5 rounded-2xl border border-[#D9A6AE]/40 text-left space-y-3 text-xs text-[#594744]">
              <div className="flex justify-between items-center border-b border-[#D9A6AE]/30 pb-2">
                <span className="font-semibold">Valor Total:</span>
                <span className="font-serif font-bold text-base text-[#594744]">
                  R$ {createdOrder?.total.toFixed(2).replace('.', ',')}
                </span>
              </div>

              {createdOrder?.paymentMethod === 'pix' && (
                <div className="p-3 bg-white rounded-xl border border-emerald-200 space-y-2">
                  <div className="flex items-center gap-2 text-emerald-800 font-bold text-xs">
                    <QrCode className="w-4 h-4" />
                    <span>Pagamento via PIX</span>
                  </div>
                  <p className="text-[11px] text-[#594744]">
                    Chave ({config.pixKeyType}): <strong className="text-[#594744]">{config.pixKey}</strong>
                  </p>
                  <p className="text-[10px] text-[#594744]/70">
                    Beneficiário: Belli Artesanatos
                  </p>
                </div>
              )}

              <p className="text-[11px] text-[#594744]/80">
                Uma cópia de confirmação foi enviada para <strong>{createdOrder?.customerEmail}</strong>.
              </p>
            </div>

            {/* Ações */}
            <div className="space-y-3 pt-2">
              <button
                onClick={handleSendWhatsAppOrder}
                className="w-full py-3.5 px-6 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs sm:text-sm shadow-md flex items-center justify-center gap-2 transition-all active:scale-95"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Confirmar Pedido no WhatsApp da Loja</span>
              </button>

              <button
                onClick={onClose}
                className="w-full py-2.5 px-6 rounded-full bg-[#FAF6F5] hover:bg-[#F3E5E3] text-[#594744] font-semibold text-xs transition-colors"
              >
                Continuar Navegando
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};