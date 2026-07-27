'use client';

import React from 'react';
import Link from 'next/link';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, ShieldCheck } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export function CartDrawer() {
  const { cart, isCartOpen, setIsCartOpen, removeFromCart, updateQuantity, subtotal, totalItems } = useCart();

  if (!isCartOpen) return null;

  const freeShippingThreshold = 150;
  const progressPercent = Math.min(100, (subtotal / freeShippingThreshold) * 100);
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-fade-in">
      {/* Backdrop overlay */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-dark-card border-l border-gray-800 shadow-2xl flex flex-col justify-between">
          
          {/* Header */}
          <div className="p-6 border-b border-gray-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-brand-500/10 text-brand-400">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <h2 className="text-lg font-bold text-white">Your Shopping Cart</h2>
              <span className="text-xs bg-gray-800 text-gray-300 font-semibold px-2.5 py-0.5 rounded-full">
                {totalItems} items
              </span>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="text-gray-400 hover:text-white p-1 rounded-lg hover:bg-gray-800 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Free Shipping Meter */}
          <div className="px-6 py-3 bg-dark-surface/60 border-b border-gray-800">
            <div className="flex items-center justify-between text-xs mb-1.5">
              {remainingForFreeShipping === 0 ? (
                <span className="text-emerald-400 font-semibold flex items-center gap-1">
                  🎉 You unlocked FREE Express Shipping!
                </span>
              ) : (
                <span className="text-gray-300">
                  Add <span className="text-brand-400 font-bold">${remainingForFreeShipping.toFixed(2)}</span> more for FREE shipping
                </span>
              )}
            </div>
            <div className="w-full bg-gray-800 h-2 rounded-full overflow-hidden">
              <div
                className="bg-gradient-to-r from-brand-500 to-accent-emerald h-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cart.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-16 h-16 rounded-full bg-gray-800 flex items-center justify-center mx-auto text-gray-500">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="text-base font-semibold text-white">Your cart is currently empty</h3>
                <p className="text-xs text-gray-400 max-w-xs mx-auto">
                  Explore our premium tech and lifestyle products to start shopping.
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="inline-block mt-2 px-6 py-2.5 bg-brand-600 hover:bg-brand-500 text-white text-sm font-semibold rounded-xl transition-colors"
                >
                  Browse Store Products
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.product._id}
                  className="flex gap-4 p-3 rounded-xl bg-dark-bg/50 border border-gray-800 hover:border-gray-700 transition-colors"
                >
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-20 h-20 object-cover rounded-lg bg-gray-800"
                  />
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="text-sm font-semibold text-white line-clamp-1">{item.product.name}</h4>
                        <button
                          onClick={() => removeFromCart(item.product._id)}
                          className="text-gray-500 hover:text-red-400 transition-colors"
                          title="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="text-xs text-brand-400 font-medium">${item.product.price.toFixed(2)}</p>
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      {/* Quantity Controls */}
                      <div className="flex items-center border border-gray-700 rounded-lg bg-gray-800/80">
                        <button
                          onClick={() => updateQuantity(item.product._id, item.quantity - 1)}
                          className="p-1 text-gray-400 hover:text-white"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="px-3 text-xs font-semibold text-white">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.product._id, item.quantity + 1)}
                          className="p-1 text-gray-400 hover:text-white"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <span className="text-sm font-bold text-white">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Checkout Summary */}
          {cart.length > 0 && (
            <div className="p-6 border-t border-gray-800 bg-dark-bg space-y-4">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-gray-400">
                  <span>Subtotal</span>
                  <span className="text-white font-medium">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>Estimated Tax (8%)</span>
                  <span className="text-white font-medium">${(subtotal * 0.08).toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>Shipping</span>
                  <span className="text-white font-medium">
                    {subtotal >= freeShippingThreshold ? 'FREE' : '$15.00'}
                  </span>
                </div>
                <div className="flex justify-between text-base font-bold text-white pt-2 border-t border-gray-800">
                  <span>Total</span>
                  <span className="text-brand-400">
                    ${(subtotal + subtotal * 0.08 + (subtotal >= freeShippingThreshold ? 0 : 15)).toFixed(2)}
                  </span>
                </div>
              </div>

              <div className="flex gap-3">
                <Link
                  href="/cart"
                  onClick={() => setIsCartOpen(false)}
                  className="flex-1 text-center py-3 bg-gray-800 hover:bg-gray-700 text-white font-semibold rounded-xl text-sm transition-colors"
                >
                  View Full Cart
                </Link>
                <Link
                  href="/cart"
                  onClick={() => setIsCartOpen(false)}
                  className="flex-1 flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-brand-600 to-accent-purple hover:brightness-110 text-white font-semibold rounded-xl text-sm shadow-glow transition-all"
                >
                  Checkout <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              <p className="text-[11px] text-gray-500 text-center flex items-center justify-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                256-Bit SSL Encrypted Checkout via Stripe
              </p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
