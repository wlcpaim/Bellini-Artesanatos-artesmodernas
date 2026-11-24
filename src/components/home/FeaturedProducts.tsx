import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Product } from '../../types/store';
import { ProductCard } from '../catalog/ProductCard';

interface FeaturedProductsProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
  onOpenDetail: (product: Product) => void;
  onViewAll: () => void;
}

export const FeaturedProducts: React.FC<FeaturedProductsProps> = ({
  products,
  onAddToCart,
  onOpenDetail,
  onViewAll,
}) => {
  const featured = products.filter((p) => p.featured).slice(0, 8);

  return (
    <section className="py-20 bg-[#FAF6F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-12">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs uppercase font-semibold text-[#B87583] tracking-widest mb-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Destaques Especiais</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#594744]">
              Peças mais amadas do ateliê
            </h2>
            <p className="text-sm text-[#594744]/75 mt-1">
              Seleção exclusiva das criações com maior carinho e procura.
            </p>
          </div>

          <button
            onClick={onViewAll}
            className="flex items-center gap-2 text-sm font-semibold text-[#B87583] hover:text-[#594744] transition-colors group"
          >
            <span>Ver todo o catálogo</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featured.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
              onOpenDetail={onOpenDetail}
            />
          ))}
        </div>
      </div>
    </section>
  );
};