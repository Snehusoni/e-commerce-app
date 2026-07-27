import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Truck, RotateCcw, CreditCard, Sparkles, Mail } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-dark-bg border-t border-gray-800 text-gray-400 mt-20">
      
      {/* Value Proposition Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-b border-gray-800/80">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="flex items-center gap-4 p-4 rounded-xl bg-dark-card/50 border border-gray-800">
            <div className="p-3 rounded-lg bg-brand-500/10 text-brand-400">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-semibold text-sm">Free Express Shipping</h4>
              <p className="text-xs text-gray-400">On all orders over $150</p>
            </div>
          </div>
          <div className="flex items-center gap-4 p-4 rounded-xl bg-dark-card/50 border border-gray-800">
            <div className="p-3 rounded-lg bg-accent-purple/10 text-accent-purple">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-semibold text-sm">2-Year Warranty</h4>
              <p className="text-xs text-gray-400">Full manufacturer guarantee</p>
            </div>
          </div>
          <div className="flex items-center gap-4 p-4 rounded-xl bg-dark-card/50 border border-gray-800">
            <div className="p-3 rounded-lg bg-accent-pink/10 text-accent-pink">
              <RotateCcw className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-semibold text-sm">30-Day Money Back</h4>
              <p className="text-xs text-gray-400">Hassle-free return policy</p>
            </div>
          </div>
          <div className="flex items-center gap-4 p-4 rounded-xl bg-dark-card/50 border border-gray-800">
            <div className="p-3 rounded-lg bg-accent-emerald/10 text-accent-emerald">
              <CreditCard className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-semibold text-sm">Stripe Secured</h4>
              <p className="text-xs text-gray-400">256-bit encrypted checkout</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 md:grid-cols-5 gap-10">
        
        {/* Brand Summary */}
        <div className="md:col-span-2 space-y-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-brand-400" />
            <span className="text-xl font-extrabold text-white">AURA<span className="text-brand-500">STORE</span></span>
          </div>
          <p className="text-sm text-gray-400 max-w-sm leading-relaxed">
            Curating state-of-the-art electronics, ergonomic furniture, and premium lifestyle gear engineered for modern innovators.
          </p>
          <div className="pt-2 flex items-center gap-3">
            <input
              type="email"
              placeholder="Enter your email"
              className="bg-dark-card border border-gray-700 text-white rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-brand-500 flex-1 max-w-xs"
            />
            <button className="bg-brand-600 hover:bg-brand-500 text-white font-medium px-4 py-2 rounded-lg text-sm transition-colors flex items-center gap-1">
              <Mail className="w-4 h-4" /> Subscribe
            </button>
          </div>
        </div>

        {/* Navigation Categories */}
        <div>
          <h4 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">Shop</h4>
          <ul className="space-y-2.5 text-sm">
            <li><Link href="/products?category=Audio" className="hover:text-white transition-colors">Audio & Headphones</Link></li>
            <li><Link href="/products?category=Electronics" className="hover:text-white transition-colors">Electronics & Gear</Link></li>
            <li><Link href="/products?category=Wearables" className="hover:text-white transition-colors">Smart Wearables</Link></li>
            <li><Link href="/products?category=Accessories" className="hover:text-white transition-colors">Accessories</Link></li>
            <li><Link href="/products?category=Furniture" className="hover:text-white transition-colors">Ergonomic Furniture</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">Account</h4>
          <ul className="space-y-2.5 text-sm">
            <li><Link href="/orders" className="hover:text-white transition-colors">Track Order</Link></li>
            <li><Link href="/orders" className="hover:text-white transition-colors">Order History</Link></li>
            <li><Link href="/cart" className="hover:text-white transition-colors">Shopping Cart</Link></li>
            <li><Link href="/admin" className="hover:text-white transition-colors">Admin Dashboard</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">Payments & Tech</h4>
          <p className="text-xs text-gray-400 mb-3">Powered by Next.js 14, Tailwind CSS, MongoDB, and Stripe Payments API.</p>
          <div className="flex flex-wrap gap-2 text-xs font-mono">
            <span className="bg-gray-800 text-gray-300 px-2.5 py-1 rounded-md border border-gray-700">TypeScript</span>
            <span className="bg-gray-800 text-gray-300 px-2.5 py-1 rounded-md border border-gray-700">Stripe</span>
            <span className="bg-gray-800 text-gray-300 px-2.5 py-1 rounded-md border border-gray-700">MongoDB</span>
            <span className="bg-gray-800 text-gray-300 px-2.5 py-1 rounded-md border border-gray-700">Tailwind</span>
          </div>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="border-t border-gray-800/60 py-6 text-center text-xs text-gray-500">
        <p>© 2026 AuraStore Inc. All rights reserved. Designed with precision and style.</p>
      </div>
    </footer>
  );
}
