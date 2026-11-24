import React from 'react';
import { ShoppingBag, Star, Eye } from 'lucide-react';
import { Product } from '../../types/store';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onOpenDetail: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart, onOpenDetail }) => {
  const isOutOfStock = product.stock <= 0;
  const installments = (product.price / 3).toFixed(2).replace('.', ',');

  return (
    <div className="group bg-white rounded-2xl overflow-hidden border border-[#D9A6AE]/30 shadow-soft hover:shadow-craft transition-all duration-300 flex flex-col justify-between">
      {/* Imagem do Produto com Tags */}
      <div className="relative aspect-[4/4] overflow-hidden bg-[#F3E5E3]/30 cursor-pointer" onClick={() => onOpenDetail(product)}>
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />

        {/* Badges superiores */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {product.isNew && (
            <span className="bg-[#B87583] text-white text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full shadow-sm">
              Novo
            </span>
          )}
          {product.featured && (
            <span className="bg-[#594744] text-[#F3E5E3] text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full shadow-sm">
              Destaque
            </span>
          )}
          {product.originalPrice && product.originalPrice > product.price && (
            <span className="bg-[#D9A6AE] text-[#594744] text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full shadow-sm">
              Promoção
            </span>
          )}
        </div>

        {/* Botão de Ver Detalhes Flutuante */}
        <div className="absolute inset-0 bg-[#594744]/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onOpenDetail(product);
            }}
            className="p-2.5 bg-white/95 text-[#594744] hover:text-[#B87583] rounded-full shadow-md transform hover:scale-110 transition-transform"
            title="Ver detalhes da peça"
          >
            <Eye className="w-4 h-4" />
          </button>
        </div>

        {isOutOfStock && (
          <div className="absolute inset-0 bg-[#594744]/60 backdrop-blur-[2px] flex items-center justify-center">
            <span className="bg-white text-[#594744] font-bold text-xs uppercase px-3 py-1.5 rounded-full shadow">
              Esgotado
            </span>
          </div>
        )}
      </div>

      {/* Conteúdo / Preço */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          <span className="text-[10px] uppercase font-semibold text-[#B87583] tracking-widest block mb-1">
            {product.categoryName}
          </span>
          <h3
            onClick={() => onOpenDetail(product)}
            className="font-serif font-bold text-sm sm:text-base text-[#594744] hover:text-[#B87583] transition-colors cursor-pointer line-clamp-2"
          >
            {product.name}
          </h3>

          <div className="flex items-center gap-1 mt-1 text-xs text-[#594744]/70">
            <div className="flex items-center text-[#B87583]">
              <Star className="w-3.5 h-3.5 fill-current" />
            </div>
            <span className="font-semibold text-xs text-[#594744]">{product.rating.toFixed(1)}</span>
            <span>({product.reviewCount})</span>
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-[#D9A6AE]/20">
          <div className="flex items-baseline gap-2">
            <span className="font-serif text-lg sm:text-xl font-bold text-[#594744]">
              R$ {product.price.toFixed(2).replace('.', ',')}
            </span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="text-xs text-[#594744]/50 line-through">
                R$ {product.originalPrice.toFixed(2).replace('.', ',')}
              </span>
            )}
          </div>
          <p className="text-[11px] text-[#594744]/70">
            ou 3x de R$ {installments} sem juros
          </p>

          <button
            onClick={() => onAddToCart(product)}
            disabled={isOutOfStock}
            className={`w-full mt-3 py-2.5 px-4 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
              isOutOfStock
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-[#B87583] hover:bg-[#B87583]/90 text-white shadow-sm active:scale-95'
            }`}
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>{isOutOfStock ? 'Indisponível' : 'Adicionar à Sacola'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};