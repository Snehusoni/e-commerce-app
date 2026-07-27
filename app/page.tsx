import React from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles, Shield, Zap, RefreshCw, Award, Star, ArrowUpRight } from 'lucide-react';
import { getProducts } from '@/lib/db';
import { ProductCard } from '@/components/ProductCard';

export const revalidate = 0;

export default async function HomePage() {
  const products = await getProducts();
  const featuredProducts = products.slice(0, 8);

  const categories = [
    { name: 'Mobile', icon: '📱', desc: 'Flagship 5G Titanium Smartphones & Foldables', count: 'Mobiles', color: 'from-blue-500/20 to-indigo-500/20' },
    { name: 'Laptop', icon: '💻', desc: 'Pro M3 Laptops & AI Touch Ultrabooks', count: 'Laptops', color: 'from-cyan-500/20 to-blue-500/20' },
    { name: 'TV', icon: '📺', desc: '65" 4K OLED & 8K Smart Televisions', count: 'Televisions', color: 'from-purple-500/20 to-pink-500/20' },
    { name: 'Refrigerator', icon: '❄️', desc: 'InstaView French Door & 5-Star Fridges', count: 'Refrigerators', color: 'from-sky-500/20 to-teal-500/20' },
    { name: 'Air Conditioner', icon: '💨', desc: '5-Star Inverter Split & Dual Cooling ACs', count: 'Air Conditioners', color: 'from-emerald-500/20 to-green-500/20' },
    { name: 'Audio', icon: '🎧', desc: 'Noise-Canceling Headphones & Studio Monitors', count: 'Audio Gear', color: 'from-indigo-500/20 to-purple-500/20' },
    { name: 'Electronics', icon: '⌨️', desc: 'Mechanical Keyboards & 4K Curved Displays', count: 'Electronics', color: 'from-amber-500/20 to-orange-500/20' },
    { name: 'Wearables', icon: '⌚', desc: 'Titanium Smartwatches & Fitness Trackers', count: 'Wearables', color: 'from-rose-500/20 to-red-500/20' },
  ];

  return (
    <div className="space-y-24 pb-12">
      
      {/* Hero Banner Section */}
      <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-32 border-b border-gray-800/60">
        
        {/* Decorative background glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-brand-600/20 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-1/3 right-10 w-[350px] h-[350px] bg-accent-purple/20 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Hero Left Text Column */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-500/10 border border-brand-500/30 text-brand-400 text-xs font-semibold uppercase tracking-wider shadow-glow">
                <Sparkles className="w-4 h-4 text-brand-400 animate-pulse" />
                <span>Top Mobiles, Laptops, TVs, Fridges & ACs</span>
              </div>

              <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white leading-none">
                Top Mobiles, Laptops, <br />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-400 via-accent-purple to-accent-pink">
                  TVs, Fridges & ACs
                </span>
              </h1>

              <p className="text-lg text-gray-300 max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
                Discover top-tier 5G Mobiles, M3 Max Laptops, 4K OLED Smart TVs, Smart French Door Fridges, and 5-Star Inverter ACs. Built with fast checkout and instant store delivery.
              </p>

              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <Link
                  href="/products"
                  className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-brand-600 to-accent-purple hover:brightness-110 text-white font-bold rounded-2xl shadow-glow text-base transition-all duration-300 flex items-center justify-center gap-3 group"
                >
                  Shop Top Products
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="/admin"
                  className="w-full sm:w-auto px-8 py-4 bg-dark-card hover:bg-gray-800 text-gray-200 border border-gray-700 font-semibold rounded-2xl text-base transition-colors flex items-center justify-center gap-2"
                >
                  Admin Dashboard
                  <ArrowUpRight className="w-4 h-4 text-gray-400" />
                </Link>
              </div>

              {/* Quick Specs Badges */}
              <div className="pt-8 grid grid-cols-3 gap-6 border-t border-gray-800/80">
                <div>
                  <div className="text-2xl font-black text-white">4.9 / 5</div>
                  <div className="text-xs text-gray-400 font-medium">Customer Rating</div>
                </div>
                <div>
                  <div className="text-2xl font-black text-white">100%</div>
                  <div className="text-xs text-gray-400 font-medium">Verified Warranty</div>
                </div>
                <div>
                  <div className="text-2xl font-black text-white">Express</div>
                  <div className="text-xs text-gray-400 font-medium">Doorstep Delivery</div>
                </div>
              </div>
            </div>

            {/* Hero Right Visual Teaser */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-3xl p-3 bg-gradient-to-b from-gray-800 via-dark-card to-dark-bg border border-gray-700/60 shadow-2xl overflow-hidden group">
                <img
                  src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=1000&q=80"
                  alt="Apex Ultra 5G Titanium Smartphone"
                  className="w-full h-[420px] object-cover rounded-2xl group-hover:scale-105 transition-transform duration-700"
                />
                
                {/* Floating Tag Card */}
                <div className="absolute bottom-8 left-8 right-8 p-4 rounded-2xl glass-panel border border-white/10 shadow-glass flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-brand-400">Featured Mobile Spotlight</span>
                    <h4 className="text-sm font-bold text-white">Apex Ultra 5G Titanium Phone</h4>
                    <p className="text-xs text-gray-300 font-medium">$1,199.99 <span className="line-through text-gray-500">$1,299.99</span></p>
                  </div>
                  <Link
                    href="/products/prod_m1"
                    className="p-3 rounded-xl bg-brand-600 hover:bg-brand-500 text-white shadow-md transition-colors"
                  >
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Category Grid Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-xs font-extrabold text-brand-400 uppercase tracking-widest">Explore Categories</span>
            <h2 className="text-3xl font-black text-white mt-1">Top Products Categories</h2>
          </div>
          <Link href="/products" className="text-sm font-semibold text-brand-400 hover:text-brand-300 flex items-center gap-1">
            View All Categories ({categories.length}) <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat) => (
            <Link
              key={cat.name}
              href={`/products?category=${encodeURIComponent(cat.name)}`}
              className={`group relative p-6 rounded-2xl bg-gradient-to-br ${cat.color} border border-gray-800 hover:border-brand-500/40 transition-all duration-300 hover:-translate-y-1 shadow-lg flex flex-col justify-between`}
            >
              <div>
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">{cat.icon}</div>
                <h3 className="text-lg font-bold text-white group-hover:text-brand-300 transition-colors">{cat.name}</h3>
                <p className="text-xs text-gray-400 mt-1 mb-3 leading-relaxed">{cat.desc}</p>
              </div>
              <span className="text-xs font-semibold text-brand-400">Explore {cat.count} →</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Top Featured Products Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-xs font-extrabold text-accent-purple uppercase tracking-widest">Handpicked Showcase</span>
            <h2 className="text-3xl font-black text-white mt-1">Top Mobile, Laptop, TV, Fridge & AC Products</h2>
          </div>
          <Link href="/products" className="text-sm font-semibold text-brand-400 hover:text-brand-300 flex items-center gap-1">
            Shop Full Catalog ({products.length} Products) <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </section>

      {/* Promo Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-gradient-to-r from-brand-950 via-dark-card to-accent-purple/20 p-8 sm:p-14 border border-brand-500/30 overflow-hidden shadow-2xl">
          <div className="relative z-10 max-w-xl space-y-6">
            <span className="px-3 py-1 rounded-full bg-accent-pink/20 text-accent-pink text-xs font-bold uppercase tracking-wider">
              Special Electronics Offer
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white leading-tight">
              Upgrade Your Home & Electronics with Up To 25% Off
            </h2>
            <p className="text-sm text-gray-300 leading-relaxed">
              Use promo code <span className="font-mono bg-dark-bg px-2 py-0.5 rounded border border-gray-700 text-brand-300 font-bold">TECH2026</span> at checkout for instant savings across Smart Mobiles, Laptops, 4K TVs, Fridges & ACs.
            </p>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-white text-dark-bg font-extrabold rounded-xl hover:bg-gray-100 transition-colors shadow-lg text-sm"
            >
              Shop Top Deals <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
