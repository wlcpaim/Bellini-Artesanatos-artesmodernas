import React, { useState, useMemo } from 'react';
import { Filter, Search, ArrowUpDown, X, Sparkles } from 'lucide-react';
import { Product, ProductCategory } from '../../types/store';
import { ProductCard } from './ProductCard';

interface CatalogViewProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
  onOpenDetail: (product: Product) => void;
  initialCategory?: ProductCategory | 'all';
  searchTerm: string;
  onSearch: (term: string) => void;
}

const CATEGORY_TABS: { id: ProductCategory | 'all'; label: string }[] = [
  { id: 'all', label: 'Todos os Produtos' },
  { id: 'croche', label: 'Crochê' },
  { id: 'amigurumi', label: 'Amigurumis' },
  { id: 'buques', label: 'Buquês Eternos' },
  { id: 'macrame', label: 'Macramê' },
  { id: 'velas', label: 'Velas Aromáticas' },
  { id: 'bolsas', label: 'Bolsas' },
  { id: 'decoracao', label: 'Decoração' },
  { id: 'lembrancinhas', label: 'Lembrancinhas' },
];

export const CatalogView: React.FC<CatalogViewProps> = ({
  products,
  onAddToCart,
  onOpenDetail,
  initialCategory = 'all',
  searchTerm,
  onSearch,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | 'all'>(initialCategory);
  const [sortBy, setSortBy] = useState<'relevance' | 'price-asc' | 'price-desc' | 'rating'>('relevance');
  const [onlyInStock, setOnlyInStock] = useState(false);

  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        // Categoria
        if (selectedCategory !== 'all' && p.category !== selectedCategory) return false;
        // Estoque
        if (onlyInStock && p.stock <= 0) return false;
        // Busca
        if (searchTerm.trim().length > 0) {
          const q = searchTerm.toLowerCase();
          const matchName = p.name.toLowerCase().includes(q);
          const matchDesc = p.description.toLowerCase().includes(q);
          const matchCat = p.categoryName.toLowerCase().includes(q);
          if (!matchName && !matchDesc && !matchCat) return false;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
      });
  }, [products, selectedCategory, onlyInStock, searchTerm, sortBy]);

  return (
    <div className="py-12 bg-[#FAF6F5] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Cabeçalho da Coleção */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 text-xs uppercase font-semibold text-[#B87583] tracking-widest mb-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Coleção Belli Artesanatos</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#594744]">
            Catálogo Completo
          </h1>
          <p className="text-sm text-[#594744]/75 mt-2">
            Explore nossas criações artesanais autorais com envio para todo o Brasil.
          </p>
        </div>

        {/* Abas de Categoria */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 scrollbar-none mb-8 justify-start lg:justify-center">
          {CATEGORY_TABS.map((tab) => {
            const active = selectedCategory === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setSelectedCategory(tab.id)}
                className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                  active
                    ? 'bg-[#B87583] text-white shadow-craft'
                    : 'bg-white text-[#594744] hover:bg-[#F3E5E3]/60 border border-[#D9A6AE]/30'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Barra de Filtros e Ordenação */}
        <div className="bg-white p-4 rounded-2xl border border-[#D9A6AE]/30 shadow-soft mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="relative w-full md:w-80">
            <input
              type="text"
              placeholder="Buscar por nome, material ou cor..."
              value={searchTerm}
              onChange={(e) => onSearch(e.target.value)}
              className="w-full text-xs pl-9 pr-8 py-2.5 rounded-xl border border-[#D9A6AE]/60 bg-[#FAF6F5] focus:bg-white focus:outline-none focus:border-[#B87583] text-[#594744]"
            />
            <Search className="w-4 h-4 absolute left-3 top-3 text-[#B87583]" />
            {searchTerm && (
              <button
                onClick={() => onSearch('')}
                className="absolute right-3 top-3 text-[#594744]/50 hover:text-[#594744]"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">
            <label className="flex items-center gap-2 text-xs text-[#594744] cursor-pointer">
              <input
                type="checkbox"
                checked={onlyInStock}
                onChange={(e) => setOnlyInStock(e.target.checked)}
                className="rounded text-[#B87583] focus:ring-[#B87583]"
              />
              <span>Apenas pronta entrega</span>
            </label>

            <div className="flex items-center gap-2">
              <ArrowUpDown className="w-3.5 h-3.5 text-[#B87583]" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="text-xs bg-[#FAF6F5] border border-[#D9A6AE]/50 rounded-xl px-3 py-2 text-[#594744] focus:outline-none focus:border-[#B87583]"
              >
                <option value="relevance">Mais Relevantes</option>
                <option value="price-asc">Menor Preço</option>
                <option value="price-desc">Maior Preço</option>
                <option value="rating">Melhor Avaliados</option>
              </select>
            </div>
          </div>
        </div>

        {/* Quantidade encontrada */}
        <div className="mb-6 flex items-center justify-between text-xs text-[#594744]/70">
          <span>Mostrando <strong>{filteredProducts.length}</strong> produtos</span>
          {searchTerm && (
            <span>Resultado para "<strong>{searchTerm}</strong>"</span>
          )}
        </div>

        {/* Grade de Produtos */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={onAddToCart}
                onOpenDetail={onOpenDetail}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-12 text-center border border-[#D9A6AE]/30 max-w-lg mx-auto">
            <p className="font-serif text-lg font-bold text-[#594744] mb-2">Nenhum produto encontrado</p>
            <p className="text-xs text-[#594744]/70 mb-6">
              Não encontramos peças com os filtros aplicados. Tente buscar por outros termos ou ver todas as categorias.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                onSearch('');
                setOnlyInStock(false);
              }}
              className="px-6 py-2.5 rounded-full bg-[#B87583] text-white text-xs font-semibold hover:bg-[#B87583]/90 transition-all"
            >
              Limpar Filtros
            </button>
          </div>
        )}

      </div>
    </div>
  );
};