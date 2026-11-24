import React from 'react';
import { Sparkles, HeartHandshake, Leaf, Clock } from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <section className="py-20 bg-[#F3E5E3]/30 border-y border-[#D9A6AE]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-6 relative">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <img
                  src="https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=600&q=80"
                  alt="Processo artesanal de crochê"
                  className="rounded-2xl shadow-md w-full h-56 object-cover"
                />
                <img
                  src="https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=600&q=80"
                  alt="Macramê feito à mão"
                  className="rounded-2xl shadow-md w-full h-44 object-cover"
                />
              </div>
              <div className="space-y-4 pt-6">
                <img
                  src="https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=600&q=80"
                  alt="Velas artesanais vertidas com amor"
                  className="rounded-2xl shadow-md w-full h-44 object-cover"
                />
                <img
                  src="https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&w=600&q=80"
                  alt="Buquê floral artesanal"
                  className="rounded-2xl shadow-md w-full h-56 object-cover"
                />
              </div>
            </div>
            {/* Selo no centro */}
            <div className="absolute -bottom-4 -right-4 bg-white p-4 rounded-2xl shadow-craft border border-[#D9A6AE]/30 max-w-xs hidden sm:block">
              <p className="text-xs font-serif font-bold text-[#594744]">Ateliê Belli Artesanatos</p>
              <p className="text-[11px] text-[#B87583]">Nascido do amor pelo artesanato autêntico e moderno.</p>
            </div>
          </div>

          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs uppercase tracking-widest text-[#B87583] font-semibold block">
              Sobre a Nossa Marca
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#594744] leading-tight">
              Cada ponto, nó e aroma carrega uma história viva.
            </h2>
            <p className="text-sm sm:text-base text-[#594744]/80 leading-relaxed">
              A <strong>Belli Artesanatos</strong> nasceu com o propósito de resgatar o valor do que é feito à mão, unindo técnicas tradicionais milenares a um design moderno, sofisticado e acolhedor.
            </p>
            <p className="text-sm text-[#594744]/75 leading-relaxed">
              Não produzimos em escala industrial: cada manta, amigurumi, vela botânica e painel em macramê é tecido individualmente com tempo, atenção plena e matérias-primas puras que respeitam o meio ambiente.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-white border border-[#D9A6AE]/30">
                <HeartHandshake className="w-5 h-5 text-[#B87583] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-[#594744]">Produção Humanizada</h4>
                  <p className="text-[11px] text-[#594744]/70">Cada pedido é embalado como um presente afetuoso.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-white border border-[#D9A6AE]/30">
                <Leaf className="w-5 h-5 text-[#B87583] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-[#594744]">Fibras Naturais</h4>
                  <p className="text-[11px] text-[#594744]/70">Algodão ecológico, ceras vegetais e palhas nobres.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-white border border-[#D9A6AE]/30">
                <Sparkles className="w-5 h-5 text-[#B87583] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-[#594744]">Design Contemporâneo</h4>
                  <p className="text-[11px] text-[#594744]/70">Paleta suave e elegância atemporal para seu lar.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-white border border-[#D9A6AE]/30">
                <Clock className="w-5 h-5 text-[#B87583] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-[#594744]">Peças Duradouras</h4>
                  <p className="text-[11px] text-[#594744]/70">Construídas com acabamento para durar gerações.</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};