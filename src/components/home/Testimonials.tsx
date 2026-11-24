import React from 'react';
import { Star, Quote } from 'lucide-react';

const TESTIMONIALS = [
  {
    name: 'Juliana P. Albuquerque',
    location: 'São Paulo, SP',
    comment: 'Comprei a Manta Aconchego e o Ursinho Theo para o quarto da minha filha. Fiquei encantada com a delicadeza dos pontos e com o aroma gostoso que veio na embalagem! O atendimento no WhatsApp foi maravilhoso.',
    rating: 5,
    product: 'Manta Aconchego & Ursinho Theo',
  },
  {
    name: 'Beatriz L. Ramalho',
    location: 'Curitiba, PR',
    comment: 'O painel em macramê terracota transformou a parede da minha sala. Todo mundo que visita pergunta onde comprei. Dá para sentir o amor colocado em cada detalhe.',
    rating: 5,
    product: 'Painel Macramê Terracota',
  },
  {
    name: 'Camila Fernandes',
    location: 'Belo Horizonte, MG',
    comment: 'Recebi a vela de Vanilla Bourbon e o buquê de crochê. As flores nunca murcham e a casa fica com um perfume aconchegante incrível. Já virei cliente fiel da Belli!',
    rating: 5,
    product: 'Buquê Eterno & Vela Aromática',
  },
];

export const Testimonials: React.FC = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs uppercase tracking-widest text-[#B87583] font-semibold block mb-2">
            Depoimentos Reais
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#594744]">
            O que diz quem já recebeu nosso afeto
          </h2>
          <p className="text-sm text-[#594744]/75 mt-2">
            Mais de 500 lares acolhidos em todo o Brasil com nota média 5.0.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t, idx) => (
            <div
              key={idx}
              className="bg-[#FAF6F5] p-8 rounded-3xl border border-[#D9A6AE]/30 shadow-soft relative flex flex-col justify-between hover:shadow-craft transition-shadow"
            >
              <Quote className="w-8 h-8 text-[#D9A6AE]/50 absolute top-6 right-6" />
              <div>
                <div className="flex items-center gap-1 text-[#B87583] mb-4">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-[#594744]/80 leading-relaxed italic mb-6">
                  "{t.comment}"
                </p>
              </div>

              <div className="pt-4 border-t border-[#D9A6AE]/30">
                <p className="font-serif font-bold text-sm text-[#594744]">{t.name}</p>
                <p className="text-[11px] text-[#594744]/60">{t.location}</p>
                <p className="text-[10px] text-[#B87583] font-semibold mt-1">Peça: {t.product}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};