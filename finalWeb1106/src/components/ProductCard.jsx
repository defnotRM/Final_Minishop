import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Star, ShoppingCart } from 'lucide-react';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const isOutOfStock = Number(product.stock) <= 0;

  const ratingRate = product.rating?.rate !== undefined ? Number(product.rating.rate) : 4.5;
  const ratingCount = product.rating?.count !== undefined ? Number(product.rating.count) : 0;

  const handleAddCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isOutOfStock) {
      addToCart(product, 1);
    }
  };

  return (
    <div className="group bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-3.5 flex flex-col hover:shadow-md transition-all duration-200">
      {/* Product Image */}
      <Link
        to={`/products/${product.id}`}
        className="relative w-full aspect-square bg-gray-50 dark:bg-gray-900/40 rounded-lg p-4 flex items-center justify-center overflow-hidden mb-3"
      >
        <img
          src={product.image || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80'}
          alt={product.name || product.title}
          loading="lazy"
          className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-200"
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80';
          }}
        />
        {isOutOfStock && (
          <span className="absolute top-2 right-2 px-2 py-0.5 text-[11px] font-medium bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-300 rounded">
            Out of Stock
          </span>
        )}
      </Link>

      {/* Info */}
      <div className="flex flex-col flex-1">
        <Link to={`/products/${product.id}`}>
          <h3
            className="text-sm font-medium text-gray-900 dark:text-white hover:text-orange-600 dark:hover:text-orange-400 line-clamp-1 transition-colors"
            title={product.name || product.title}
          >
            {product.name || product.title}
          </h3>
        </Link>

        {/* Price & Rating */}
        <div className="mt-1 flex items-baseline justify-between gap-1">
          <span className="text-base font-bold text-gray-900 dark:text-white">
            ${Number(product.price).toFixed(2)}
          </span>
          <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400 mr-1" />
            <span className="font-semibold text-gray-800 dark:text-gray-200 mr-0.5">
              {ratingRate.toFixed(1)}
            </span>
            <span>({ratingCount})</span>
          </div>
        </div>

        {/* Category & Stock subtle label */}
        <div className="mt-1 flex items-center justify-between text-[11px] text-gray-400 dark:text-gray-500">
          <span className="capitalize truncate">{product.category || 'General'}</span>
          <span>สต็อก: {product.stock ?? 0}</span>
        </div>

        {/* Add to Cart button (Full Width as in Design Board) */}
        <div className="mt-3 pt-1">
          <button
            type="button"
            onClick={handleAddCart}
            disabled={isOutOfStock}
            className={`w-full py-2 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors ${
              isOutOfStock
                ? 'bg-gray-100 text-gray-400 dark:bg-gray-700 dark:text-gray-500 cursor-not-allowed'
                : 'bg-orange-600 hover:bg-orange-700 active:bg-orange-800 text-white shadow-sm'
            }`}
          >
            <ShoppingCart className="w-3.5 h-3.5" />
            <span>{isOutOfStock ? 'Sold Out' : 'Add to Cart'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
