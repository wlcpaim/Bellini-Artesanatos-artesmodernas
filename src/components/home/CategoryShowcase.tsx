import React from 'react';
import { ProductCategory } from '../../types/store';

interface CategoryShowcaseProps {
  onSelectCategory: (category: ProductCategory | 'all') => void;
  selectedCategory: ProductCategory | 'all';
}

interface CategoryCard {
  id: ProductCategory;
  name: string;
  image: string;
  description: string;
}

const CATEGORIES: CategoryCard[] = [
  {
    id: 'croche',
    name: 'Crochê & Mantas',
    image: 'https://images.unsplash.com/photo-1584992236310-6edddc08acff?auto=format&fit=crop&w=600&q=80',
    description: 'Mantas nobres e sousplats requintados',
  },
  {
    id: 'amigurumi',
    name: 'Amigurumis',
    image: 'https://images.unsplash.com/photo-1559454403-b8fb88521f11?auto=format&fit=crop&w=600&q=80',
    description: 'Bichinhos antialérgicos tecidos com carinho',
  },
  {
    id: 'buques',
    name: 'Buquês Eternos',
    image: 'https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&w=600&q=80',
    description: 'Flores em crochê e botânicos secos',
  },
  {
    id: 'macrame',
    name: 'Macramê Boho',
    image: 'https://images.unsplash.com/photo-1582582494705-f8ce0b0c24f0?auto=format&fit=crop&w=600&q=80',
    description: 'Painéis murais e suportes de plantas',
  },
  {
    id: 'velas',
    name: 'Velas Aromáticas',
    image: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=600&q=80',
    description: 'Cera 100% vegetal com aromas finos',
  },
  {
    id: 'bolsas',
    name: 'Bolsas & Acessórios',
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=600&q=80',
    description: 'Palha de milho e fio náutico refinado',
  },
  {
    id: 'decoracao',
    name: 'Decoração & Design',
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=600&q=80',
    description: 'Espelhos solares e bandejas marmorizadas',
  },
  {
    id: 'lembrancinhas',
    name: 'Presentes & Lembranças',
    image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=600&q=80',
    description: 'Caixas afeto e kits para comemorações',
  },
];

export const CategoryShowcase: React.FC<CategoryShowcaseProps> = ({ onSelectCategory, selectedCategory }) => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs uppercase tracking-widest text-[#B87583] font-semibold block mb-2">
            Nossas Linhas Artesanais
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#594744]">
            Encontre a arte perfeita para o seu momento
          </h2>
          <p className="text-sm text-[#594744]/75 mt-2">
            Cada categoria é desenvolvida manualmente com matérias-primas selecionadas e paleta harmônica.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`group relative rounded-2xl overflow-hidden aspect-[4/5] text-left transition-all duration-300 transform hover:-translate-y-1 focus:outline-none ${
                  isSelected ? 'ring-4 ring-[#B87583] shadow-lg' : 'shadow-soft hover:shadow-craft'
                }`}
              >
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#594744]/90 via-[#594744]/40 to-transparent transition-opacity group-hover:from-[#594744]/95" />
                <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 text-white">
                  <h3 className="font-serif text-base sm:text-lg font-bold group-hover:text-[#D9A6AE] transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-[11px] text-[#F3E5E3]/80 line-clamp-1 mt-0.5">
                    {cat.description}
                  </p>
                  <span className="inline-block mt-2 text-[10px] font-semibold tracking-wider uppercase text-[#D9A6AE] group-hover:underline">
                    Ver produtos →
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};