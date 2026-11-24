import React from 'react';
import { ArrowRight, Sparkles, Heart, PackageCheck, Award } from 'lucide-react';

interface HeroBannerProps {
  onExplore: () => void;
  onCustomOrder: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({ onExplore, onCustomOrder }) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#F3E5E3]/80 via-[#FAF6F5] to-white py-16 sm:py-24">
      {/* Elementos decorativos de fundo */}
      <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-[#D9A6AE]/20 blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 -left-20 w-80 h-80 rounded-full bg-[#E9D9C9]/50 blur-2xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Texto de Apresentação */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#B87583]/10 border border-[#B87583]/30 text-[#B87583] text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Coleção Nova • Artesanato Moderno & Afetivo</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-[#594744] tracking-tight leading-[1.15]">
              Artes modernas, <br />
              <span className="italic font-normal text-[#B87583] relative inline-block">
                feitas com carinho
                <svg className="absolute -bottom-1.5 left-0 w-full" height="8" viewBox="0 0 200 8" fill="none">
                  <path d="M1 5.5C50 1.5 150 1.5 199 5.5" stroke="#D9A6AE" strokeWidth="3" strokeLinecap="round" />
                </svg>
              </span>
            </h1>

            <p className="text-base sm:text-lg text-[#594744]/80 max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal">
              Descubra peças únicas tecidas à mão: amigurumis delicados, mantas de crochê nobre, buquês eternos, macramê acolhedor e velas aromáticas para inspirar momentos de paz no seu lar.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={onExplore}
                className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#B87583] hover:bg-[#B87583]/90 text-white font-medium text-sm shadow-craft flex items-center justify-center gap-2 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <span>Conhecer o Catálogo</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={onCustomOrder}
                className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-white hover:bg-[#F3E5E3]/50 text-[#594744] border border-[#D9A6AE] font-medium text-sm transition-all"
              >
                Encomendas Personalizadas
              </button>
            </div>

            {/* Destaques Rápidos */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-[#D9A6AE]/30 max-w-lg mx-auto lg:mx-0">
              <div className="text-center lg:text-left">
                <p className="font-serif text-xl sm:text-2xl font-bold text-[#594744]">+500</p>
                <p className="text-[11px] text-[#594744]/70">Lares Acolhidos</p>
              </div>
              <div className="text-center lg:text-left border-x border-[#D9A6AE]/30 px-3">
                <p className="font-serif text-xl sm:text-2xl font-bold text-[#B87583]">100%</p>
                <p className="text-[11px] text-[#594744]/70">Produção Manual</p>
              </div>
              <div className="text-center lg:text-left">
                <p className="font-serif text-xl sm:text-2xl font-bold text-[#594744]">5.0 ★</p>
                <p className="text-[11px] text-[#594744]/70">Avaliação Média</p>
              </div>
            </div>
          </div>

          {/* Composição Visual do Hero */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Imagem Principal */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white aspect-[4/5]">
                <img
                  src="https://images.unsplash.com/photo-1584992236310-6edddc08acff?auto=format&fit=crop&w=1000&q=80"
                  alt="Peças artesanais Belli em crochê"
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-lg border border-white/50">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#B87583]/20 flex items-center justify-center text-[#B87583]">
                      <Heart className="w-5 h-5 fill-current" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-xs text-[#594744]">Acabamento de Alta Costura</h4>
                      <p className="text-[10px] text-[#594744]/70">Fios de algodão ecológico nobre e toque aveludado</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tag Flutuante 1 */}
              <div className="absolute -top-4 -left-4 bg-white p-3 rounded-2xl shadow-craft border border-[#D9A6AE]/40 flex items-center gap-2 animate-bounce-slow">
                <Award className="w-4 h-4 text-[#B87583]" />
                <span className="text-xs font-semibold text-[#594744]">Design Autoral</span>
              </div>

              {/* Tag Flutuante 2 */}
              <div className="absolute top-1/2 -right-6 bg-white p-3 rounded-2xl shadow-craft border border-[#D9A6AE]/40 hidden sm:flex items-center gap-2">
                <PackageCheck className="w-4 h-4 text-[#B87583]" />
                <span className="text-xs font-semibold text-[#594744]">Embalagem Perfumada</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};