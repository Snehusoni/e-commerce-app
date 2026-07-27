'use client';

import React from 'react';
import Link from 'next/link';
import { Star, ShoppingBag, Check, Eye, Flame, Sparkles } from 'lucide-react';
import { Product } from '@/lib/types';
import { useCart } from '@/context/CartContext';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const [added, setAdded] = React.useState(false);

  // Generate dynamic smart live viewer count for social proof urgency
  const [viewers] = React.useState(() => Math.floor(8 + Math.random() * 18));

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const discountPercent = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  return (
    <div className="group relative bg-dark-card border border-gray-800 rounded-2xl overflow-hidden hover:border-brand-500/50 transition-all duration-300 hover:shadow-glow flex flex-col h-full">
      
      {/* Image & Badges Container */}
      <div className="relative aspect-square w-full bg-dark-surface overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {product.badge && (
            <span className="bg-gradient-to-r from-brand-600 to-accent-purple text-white text-[11px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-md flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-amber-300" /> {product.badge}
            </span>
          )}
          {discountPercent && (
            <span className="bg-red-500 text-white text-[11px] font-bold px-2.5 py-1 rounded-full shadow-md">
              -{discountPercent}% OFF
            </span>
          )}
        </div>

        {/* Live Viewing Urgency Indicator */}
        <div className="absolute bottom-2 left-2 right-2 bg-dark-bg/80 backdrop-blur-md px-2.5 py-1 rounded-lg border border-gray-800 text-[10px] text-amber-300 font-semibold flex items-center gap-1">
          <Flame className="w-3 h-3 text-amber-400 animate-pulse" />
          <span>{viewers} people viewing this item right now</span>
        </div>

        {/* Quick View Hover Overlay */}
        <div className="absolute inset-0 bg-dark-bg/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
          <Link
            href={`/products/${product._id}`}
            className="p-3 bg-white/10 hover:bg-white/20 text-white rounded-full backdrop-blur-md transition-transform hover:scale-110 shadow-lg"
            title="View Details"
          >
            <Eye className="w-5 h-5" />
          </Link>
        </div>
      </div>

      {/* Card Content Details */}
      <div className="p-5 flex flex-col flex-1 justify-between gap-4">
        <div>
          <div className="flex items-center justify-between text-xs text-gray-400 mb-1.5">
            <span className="font-medium text-brand-400 uppercase tracking-wider text-[11px]">{product.category}</span>
            <div className="flex items-center gap-1 text-amber-400">
              <Star className="w-3.5 h-3.5 fill-amber-400" />
              <span className="font-semibold text-gray-200">{product.rating}</span>
              <span className="text-gray-500">({product.reviewCount})</span>
            </div>
          </div>

          <Link href={`/products/${product._id}`} className="block">
            <h3 className="text-base font-semibold text-white group-hover:text-brand-300 transition-colors line-clamp-1">
              {product.name}
            </h3>
          </Link>
          <p className="text-xs text-gray-400 mt-1 line-clamp-2 leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* Pricing & Add to Cart Action */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-800/80">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-lg font-extrabold text-white">${product.price.toFixed(2)}</span>
              {product.originalPrice && (
                <span className="text-xs text-gray-500 line-through">${product.originalPrice.toFixed(2)}</span>
              )}
            </div>
            <span className={`text-[11px] font-medium ${product.inStock ? 'text-emerald-400' : 'text-rose-400'}`}>
              {product.inStock ? `${product.stockCount} in stock` : 'Out of stock'}
            </span>
          </div>

          <button
            onClick={handleAddToCart}
            disabled={!product.inStock}
            className={`p-2.5 rounded-xl font-medium text-sm flex items-center gap-2 transition-all duration-300 ${
              added
                ? 'bg-emerald-600 text-white shadow-glow'
                : product.inStock
                ? 'bg-gray-800 hover:bg-brand-600 text-gray-200 hover:text-white shadow-md'
                : 'bg-gray-800/50 text-gray-600 cursor-not-allowed'
            }`}
          >
            {added ? (
              <>
                <Check className="w-4 h-4" />
                <span className="hidden sm:inline">Added</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-4 h-4" />
                <span className="hidden sm:inline">Add</span>
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
}
