'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ShoppingBag, Search, ShieldCheck, LayoutDashboard, History, Menu, X, Sparkles } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export function Navbar() {
  const pathname = usePathname();
  const { totalItems, setIsCartOpen } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Shop Products', href: '/products' },
    { name: 'Order History', href: '/orders', icon: History },
    { name: 'Admin Dashboard', href: '/admin', icon: LayoutDashboard },
  ];

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-dark-bg/80 border-b border-gray-800 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 via-accent-purple to-accent-pink p-0.5 shadow-glow group-hover:scale-105 transition-transform duration-300">
              <div className="w-full h-full bg-dark-bg rounded-[10px] flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-brand-400 group-hover:rotate-12 transition-transform duration-300" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-brand-300">
                AURA<span className="text-brand-500">STORE</span>
              </span>
              <span className="text-[10px] tracking-widest text-gray-400 uppercase font-semibold">Luxury Tech & Lifestyle</span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-2 text-sm font-medium transition-all duration-200 hover:text-white ${
                    isActive ? 'text-brand-400 font-semibold' : 'text-gray-300'
                  }`}
                >
                  {Icon && <Icon className="w-4 h-4 text-brand-400" />}
                  {link.name}
                  {isActive && (
                    <span className="block w-1.5 h-1.5 rounded-full bg-brand-400 animate-pulse ml-0.5"></span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Controls */}
          <div className="flex items-center gap-4">
            
            {/* Quick Search Button */}
            <Link
              href="/products"
              className="p-2.5 text-gray-300 hover:text-white rounded-xl hover:bg-gray-800/60 transition-colors"
              title="Search Products"
            >
              <Search className="w-5 h-5" />
            </Link>

            {/* Cart Button with Count Badge */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 text-white bg-gradient-to-r from-brand-600 to-accent-purple rounded-xl hover:brightness-110 shadow-glow transition-all duration-300 flex items-center gap-2 px-4 group"
            >
              <ShoppingBag className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
              <span className="hidden sm:inline text-sm font-semibold">Cart</span>
              {totalItems > 0 && (
                <span className="ml-1 bg-white text-brand-700 text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-md animate-fade-in">
                  {totalItems}
                </span>
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-gray-300 hover:text-white focus:outline-none"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-dark-card border-b border-gray-800 px-4 pt-3 pb-6 space-y-3 animate-fade-in">
          {navLinks.map((link) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                  pathname === link.href ? 'bg-brand-600/20 text-brand-300 border border-brand-500/30' : 'text-gray-300 hover:bg-gray-800'
                }`}
              >
                {Icon && <Icon className="w-5 h-5 text-brand-400" />}
                {link.name}
              </Link>
            );
          })}
        </div>
      )}
    </header>
  );
}
