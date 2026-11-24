import React, { useState } from 'react';
import { X, Truck, RefreshCcw, ShieldCheck, Heart } from 'lucide-react';

interface PoliciesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PoliciesModal: React.FC<PoliciesModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  const [tab, setTab] = useState<'envio' | 'trocas' | 'cuidados' | 'seguranca'>('envio');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[85vh] overflow-y-auto shadow-2xl border border-[#D9A6AE]/40 relative p-6 sm:p-8">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-[#594744] hover:text-[#B87583] rounded-full hover:bg-[#FAF6F5] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="mb-6">
          <span className="text-xs uppercase font-semibold text-[#B87583] tracking-widest block">
            Transparência & Respeito
          </span>
          <h2 className="font-serif text-2xl font-bold text-[#594744]">
            Políticas da Belli Artesanatos
          </h2>
        </div>

        {/* Abas */}
        <div className="flex border-b border-[#D9A6AE]/30 mb-6 gap-2 overflow-x-auto pb-1">
          <button
            onClick={() => setTab('envio')}
            className={`pb-2 px-3 text-xs font-bold border-b-2 transition-all whitespace-nowrap flex items-center gap-1.5 ${
              tab === 'envio' ? 'border-[#B87583] text-[#B87583]' : 'border-transparent text-[#594744]/70 hover:text-[#594744]'
            }`}
          >
            <Truck className="w-3.5 h-3.5" />
            <span>Prazos & Envios</span>
          </button>

          <button
            onClick={() => setTab('trocas')}
            className={`pb-2 px-3 text-xs font-bold border-b-2 transition-all whitespace-nowrap flex items-center gap-1.5 ${
              tab === 'trocas' ? 'border-[#B87583] text-[#B87583]' : 'border-transparent text-[#594744]/70 hover:text-[#594744]'
            }`}
          >
            <RefreshCcw className="w-3.5 h-3.5" />
            <span>Trocas & Devoluções</span>
          </button>

          <button
            onClick={() => setTab('cuidados')}
            className={`pb-2 px-3 text-xs font-bold border-b-2 transition-all whitespace-nowrap flex items-center gap-1.5 ${
              tab === 'cuidados' ? 'border-[#B87583] text-[#B87583]' : 'border-transparent text-[#594744]/70 hover:text-[#594744]'
            }`}
          >
            <Heart className="w-3.5 h-3.5" />
            <span>Cuidados com as Peças</span>
          </button>

          <button
            onClick={() => setTab('seguranca')}
            className={`pb-2 px-3 text-xs font-bold border-b-2 transition-all whitespace-nowrap flex items-center gap-1.5 ${
              tab === 'seguranca' ? 'border-[#B87583] text-[#B87583]' : 'border-transparent text-[#594744]/70 hover:text-[#594744]'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Privacidade & Dados</span>
          </button>
        </div>

        {/* Conteúdo da Aba */}
        <div className="text-xs sm:text-sm text-[#594744]/80 leading-relaxed space-y-4">
          {tab === 'envio' && (
            <>
              <h3 className="font-serif font-bold text-base text-[#594744]">Prazos de Produção e Postagem</h3>
              <p>
                <strong>Peças a pronta entrega:</strong> Postadas em até 2 dias úteis após a confirmação do pagamento.
              </p>
              <p>
                <strong>Peças sob encomenda / personalizadas:</strong> O prazo de tecelagem varia entre 5 a 12 dias úteis, informado detalhadamente no momento da compra.
              </p>
              <p>
                <strong>Frete Grátis:</strong> Válido para todo o Brasil em compras a partir de R$ 199,00 via modalidade PAC ou transportadora parceira com rastreio completo.
              </p>
            </>
          )}

          {tab === 'trocas' && (
            <>
              <h3 className="font-serif font-bold text-base text-[#594744]">Garantia e Satisfação</h3>
              <p>
                Respeitamos o Código de Defesa do Consumidor. Você tem até <strong>7 dias corridos</strong> após o recebimento para solicitar troca ou devolução sem complicações.
              </p>
              <p>
                Por se tratarem de peças manuais, pequenas variações de nuances nas cores dos fios e medidas milimétricas são características autênticas do artesanato feito à mão.
              </p>
              <p>
                Em caso de avarias de transporte, basta nos enviar foto no WhatsApp em até 48 horas que providenciaremos a substituição imediata.
              </p>
            </>
          )}

          {tab === 'cuidados' && (
            <>
              <h3 className="font-serif font-bold text-base text-[#594744]">Preservando sua Obra Artesanal</h3>
              <p>
                <strong>Crochê e Amigurumis:</strong> Lavar preferencialmente à mão com sabão de coco neutro. Não torcer a peça; aperte suavemente entre duas toalhas para retirar o excesso de água e seque sempre na horizontal à sombra.
              </p>
              <p>
                <strong>Macramê:</strong> Para remover a poeira, use apenas espanador ou secador de cabelo no jato frio. Penteie as franjas delicadamente com pente fino.
              </p>
              <p>
                <strong>Velas Aromáticas:</strong> Apare o pavio a 0,5 cm antes de cada queima para garantir chama estável e queima limpa. Não deixe acesa por mais de 3 horas consecutivas.
              </p>
            </>
          )}

          {tab === 'seguranca' && (
            <>
              <h3 className="font-serif font-bold text-base text-[#594744]">Segurança e Proteção de Dados</h3>
              <p>
                Seus dados cadastrais (nome, endereço e telefone) são utilizados exclusivamente para o processamento, entrega do pedido e emissão do comprovante comercial.
              </p>
              <p>
                Não compartilhamos seus dados com terceiros nem armazenamos dados sensíveis de cartões de crédito em servidores abertos.
              </p>
            </>
          )}
        </div>

        <div className="mt-8 pt-4 border-t border-[#D9A6AE]/30 text-right">
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-full bg-[#B87583] text-white text-xs font-semibold hover:bg-[#B87583]/90"
          >
            Entendido
          </button>
        </div>
      </div>
    </div>
  );
};