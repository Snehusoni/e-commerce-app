'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { Star, ShieldCheck, Truck, RotateCcw, ShoppingBag, ArrowLeft, Check, Plus, Minus, CreditCard } from 'lucide-react';
import { Product } from '@/lib/types';
import { useCart } from '@/context/CartContext';

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { addToCart, setIsCartOpen } = useCart();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    async function fetchProduct() {
      if (!params?.id) return;
      try {
        const res = await fetch(`/api/products/${params.id}`);
        const data = await res.json();
        if (data.success && data.product) {
          setProduct(data.product);
          setSelectedImage(data.product.image);
        }
      } catch (err) {
        console.error('Failed to load product details', err);
      } finally {
        setLoading(false);
      }
    }
    fetchProduct();
  }, [params?.id]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 animate-pulse space-y-8">
        <div className="h-8 bg-gray-800 rounded w-1/4"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="h-[450px] bg-dark-card rounded-2xl"></div>
          <div className="space-y-4">
            <div className="h-10 bg-gray-800 rounded w-3/4"></div>
            <div className="h-6 bg-gray-800 rounded w-1/2"></div>
            <div className="h-32 bg-gray-800 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold text-white">Product Not Found</h2>
        <p className="text-sm text-gray-400">The product you are looking for does not exist or has been removed.</p>
        <Link href="/products" className="inline-block px-6 py-3 bg-brand-600 text-white font-semibold rounded-xl text-sm">
          Return to Shop Products
        </Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    setIsCartOpen(true);
  };

  const galleryImages = product.gallery && product.gallery.length > 0 ? product.gallery : [product.image];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* Back Navigation */}
      <div>
        <button
          onClick={() => router.back()}
          className="inline-flex items-center gap-2 text-xs font-semibold text-gray-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Products
        </button>
      </div>

      {/* Main Detail Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Left Gallery Section */}
        <div className="lg:col-span-6 space-y-4">
          {/* Featured Large Image */}
          <div className="aspect-square w-full rounded-3xl bg-dark-card border border-gray-800 overflow-hidden relative shadow-2xl">
            <img
              src={selectedImage || product.image}
              alt={product.name}
              className="w-full h-full object-cover object-center"
            />
            {product.badge && (
              <span className="absolute top-4 left-4 bg-brand-600 text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider shadow-lg">
                {product.badge}
              </span>
            )}
          </div>

          {/* Thumbnail Strip */}
          {galleryImages.length > 1 && (
            <div className="flex gap-4 overflow-x-auto pb-2">
              {galleryImages.map((imgUrl, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(imgUrl)}
                  className={`relative w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${
                    selectedImage === imgUrl ? 'border-brand-500 scale-105 shadow-glow' : 'border-gray-800 opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={imgUrl} alt={`Gallery ${idx}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Product Summary & Actions */}
        <div className="lg:col-span-6 space-y-6">
          
          <div>
            <span className="text-xs font-extrabold uppercase tracking-widest text-brand-400">{product.category}</span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white mt-1 leading-tight">{product.name}</h1>
            
            {/* Rating Stars */}
            <div className="flex items-center gap-3 mt-3">
              <div className="flex items-center gap-1 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
              <span className="text-xs text-gray-300 font-semibold">{product.rating} / 5.0</span>
              <span className="text-gray-600">•</span>
              <span className="text-xs text-gray-400 font-medium">{product.reviewCount} customer reviews</span>
            </div>
          </div>

          {/* Pricing Card */}
          <div className="p-4 rounded-2xl bg-dark-card border border-gray-800 flex items-center justify-between">
            <div>
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-black text-white">${product.price.toFixed(2)}</span>
                {product.originalPrice && (
                  <span className="text-base text-gray-500 line-through">${product.originalPrice.toFixed(2)}</span>
                )}
              </div>
              <span className="text-xs text-emerald-400 font-semibold">Free shipping included on this order</span>
            </div>

            <div className="text-right">
              <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${
                product.inStock ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30' : 'bg-rose-500/10 text-rose-400'
              }`}>
                {product.inStock ? `In Stock (${product.stockCount} left)` : 'Out of Stock'}
              </span>
            </div>
          </div>

          {/* Description */}
          <p className="text-sm text-gray-300 leading-relaxed">{product.description}</p>

          {/* Key Features Bullet List */}
          {product.features && product.features.length > 0 && (
            <div className="space-y-2 pt-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400">Highlights & Key Features</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {product.features.map((feat, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs text-gray-300">
                    <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Quantity Selector & Purchase Buttons */}
          <div className="space-y-4 pt-4 border-t border-gray-800">
            <div className="flex items-center gap-4">
              <span className="text-xs font-bold text-gray-300 uppercase tracking-wider">Quantity:</span>
              <div className="flex items-center border border-gray-700 rounded-xl bg-dark-card p-1">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2 text-gray-400 hover:text-white"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="px-4 text-sm font-bold text-white">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-2 text-gray-400 hover:text-white"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className={`py-4 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 transition-all duration-300 ${
                  added
                    ? 'bg-emerald-600 text-white shadow-glow'
                    : 'bg-dark-card hover:bg-gray-800 text-white border border-gray-700'
                }`}
              >
                {added ? <Check className="w-5 h-5" /> : <ShoppingBag className="w-5 h-5 text-brand-400" />}
                {added ? 'Added to Shopping Cart' : 'Add to Cart'}
              </button>

              <button
                onClick={handleBuyNow}
                disabled={!product.inStock}
                className="py-4 rounded-2xl font-bold text-sm bg-gradient-to-r from-brand-600 to-accent-purple hover:brightness-110 text-white shadow-glow flex items-center justify-center gap-2"
              >
                <CreditCard className="w-5 h-5" />
                Buy Now with Stripe
              </button>
            </div>
          </div>

          {/* Trust Guarantees */}
          <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-800 text-center">
            <div className="p-3 rounded-xl bg-dark-card/50 border border-gray-800 space-y-1">
              <Truck className="w-5 h-5 text-brand-400 mx-auto" />
              <div className="text-[11px] font-semibold text-white">Express Delivery</div>
            </div>
            <div className="p-3 rounded-xl bg-dark-card/50 border border-gray-800 space-y-1">
              <RotateCcw className="w-5 h-5 text-accent-purple mx-auto" />
              <div className="text-[11px] font-semibold text-white">30 Days Returns</div>
            </div>
            <div className="p-3 rounded-xl bg-dark-card/50 border border-gray-800 space-y-1">
              <ShieldCheck className="w-5 h-5 text-accent-emerald mx-auto" />
              <div className="text-[11px] font-semibold text-white">2-Year Warranty</div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
