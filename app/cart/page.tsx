'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ShoppingBag, Trash2, Plus, Minus, CreditCard, Lock, ArrowRight, ShieldCheck, Truck } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { ShippingAddress } from '@/lib/types';

export default function CartPage() {
  const router = useRouter();
  const { cart, removeFromCart, updateQuantity, clearCart, subtotal } = useCart();
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'stripe' | 'cod'>('stripe');

  const [shippingAddress, setShippingAddress] = useState<ShippingAddress>({
    fullName: 'Alexander Wright',
    email: 'alexander@example.com',
    address: '742 Evergreen Terrace',
    city: 'Seattle',
    state: 'WA',
    postalCode: '98101',
    country: 'United States',
  });

  const tax = Math.round(subtotal * 0.08 * 100) / 100;
  const shippingCost = subtotal >= 150 ? 0 : 15.0;
  const grandTotal = Math.round((subtotal + tax + shippingCost) * 100) / 100;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShippingAddress({ ...shippingAddress, [e.target.name]: e.target.value });
  };

  const handleCheckoutSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;

    setLoading(true);
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: cart,
          shippingAddress,
          paymentMethod,
        }),
      });

      const data = await res.json();
      if (data.success && data.url) {
        clearCart();
        window.location.href = data.url;
      } else {
        alert(data.error || 'Checkout process failed');
      }
    } catch (err) {
      console.error('Checkout error:', err);
      alert('An unexpected error occurred during checkout.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header */}
      <div className="border-b border-gray-800 pb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-extrabold text-white">Shopping Cart & Checkout</h1>
          <p className="text-sm text-gray-400 mt-1">Review your selected items and enter your shipping details.</p>
        </div>
        {cart.length > 0 && (
          <button
            onClick={clearCart}
            className="text-xs text-red-400 hover:text-red-300 font-semibold flex items-center gap-1"
          >
            <Trash2 className="w-3.5 h-3.5" /> Empty Cart
          </button>
        )}
      </div>

      {cart.length === 0 ? (
        <div className="py-20 text-center bg-dark-card border border-gray-800 rounded-3xl space-y-4">
          <div className="w-16 h-16 rounded-full bg-gray-800 flex items-center justify-center mx-auto text-gray-500">
            <ShoppingBag className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-bold text-white">Your Cart is Currently Empty</h2>
          <p className="text-xs text-gray-400 max-w-sm mx-auto">
            Browse our catalog to add noise-canceling headphones, mechanical keyboards, and luxury tech gear.
          </p>
          <Link
            href="/products"
            className="inline-block px-6 py-3 bg-brand-600 hover:bg-brand-500 text-white font-semibold rounded-xl text-sm transition-colors"
          >
            Shop Products Now
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Cart Product List */}
          <div className="lg:col-span-7 space-y-4">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-brand-400" />
              Cart Items ({cart.length})
            </h2>

            <div className="space-y-3">
              {cart.map((item) => (
                <div
                  key={item.product._id}
                  className="p-4 rounded-2xl bg-dark-card border border-gray-800 flex gap-4 items-center"
                >
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-20 h-20 object-cover rounded-xl bg-gray-800"
                  />
                  
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-bold text-white truncate">{item.product.name}</h3>
                    <p className="text-xs text-gray-400">{item.product.category}</p>
                    <div className="text-sm font-extrabold text-brand-400 mt-1">
                      ${item.product.price.toFixed(2)}
                    </div>
                  </div>

                  {/* Quantity controls */}
                  <div className="flex items-center gap-3">
                    <div className="flex items-center border border-gray-700 rounded-lg bg-gray-800">
                      <button
                        onClick={() => updateQuantity(item.product._id, item.quantity - 1)}
                        className="p-1.5 text-gray-400 hover:text-white"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="px-3 text-xs font-bold text-white">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.product._id, item.quantity + 1)}
                        className="p-1.5 text-gray-400 hover:text-white"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.product._id)}
                      className="p-2 text-gray-500 hover:text-red-400 transition-colors"
                      title="Remove product"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Delivery Highlight */}
            <div className="p-4 rounded-2xl bg-brand-500/10 border border-brand-500/30 flex items-center gap-3 text-xs text-brand-300">
              <Truck className="w-5 h-5 text-brand-400 flex-shrink-0" />
              <span>Orders ship within 24 hours with real-time order tracking code.</span>
            </div>
          </div>

          {/* Right Column: Checkout & Shipping Form */}
          <div className="lg:col-span-5 bg-dark-card border border-gray-800 rounded-3xl p-6 space-y-6 shadow-2xl">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Lock className="w-5 h-5 text-emerald-400" />
              Checkout & Shipping Info
            </h2>

            <form onSubmit={handleCheckoutSubmit} className="space-y-4">
              
              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  required
                  value={shippingAddress.fullName}
                  onChange={handleInputChange}
                  className="w-full bg-dark-bg border border-gray-700 text-white rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-brand-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">Email Address</label>
                <input
                  type="email"
                  name="email"
                  required
                  value={shippingAddress.email}
                  onChange={handleInputChange}
                  className="w-full bg-dark-bg border border-gray-700 text-white rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-brand-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">Street Address</label>
                <input
                  type="text"
                  name="address"
                  required
                  value={shippingAddress.address}
                  onChange={handleInputChange}
                  className="w-full bg-dark-bg border border-gray-700 text-white rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-brand-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">City</label>
                  <input
                    type="text"
                    name="city"
                    required
                    value={shippingAddress.city}
                    onChange={handleInputChange}
                    className="w-full bg-dark-bg border border-gray-700 text-white rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-brand-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">Postal Code</label>
                  <input
                    type="text"
                    name="postalCode"
                    required
                    value={shippingAddress.postalCode}
                    onChange={handleInputChange}
                    className="w-full bg-dark-bg border border-gray-700 text-white rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-brand-500"
                  />
                </div>
              </div>

              {/* Payment Method Selector */}
              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-2">Payment Method</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('stripe')}
                    className={`p-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                      paymentMethod === 'stripe'
                        ? 'bg-brand-600/20 border-brand-500 text-brand-300 shadow-glow'
                        : 'bg-dark-bg border-gray-700 text-gray-400'
                    }`}
                  >
                    <CreditCard className="w-4 h-4" /> Stripe / Card
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('cod')}
                    className={`p-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                      paymentMethod === 'cod'
                        ? 'bg-brand-600/20 border-brand-500 text-brand-300 shadow-glow'
                        : 'bg-dark-bg border-gray-700 text-gray-400'
                    }`}
                  >
                    Cash on Delivery
                  </button>
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="pt-4 border-t border-gray-800 space-y-2 text-xs">
                <div className="flex justify-between text-gray-400">
                  <span>Subtotal</span>
                  <span className="text-white font-medium">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>Sales Tax (8%)</span>
                  <span className="text-white font-medium">${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>Shipping Fee</span>
                  <span className="text-white font-medium">
                    {shippingCost === 0 ? 'FREE' : `$${shippingCost.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between text-base font-extrabold text-white pt-2 border-t border-gray-800">
                  <span>Total Amount</span>
                  <span className="text-brand-400">${grandTotal.toFixed(2)}</span>
                </div>
              </div>

              {/* Submit Payment Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-gradient-to-r from-brand-600 via-accent-purple to-accent-pink hover:brightness-110 text-white font-extrabold rounded-2xl shadow-glow text-base transition-all duration-300 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <span>Processing Stripe Payment...</span>
                ) : (
                  <>
                    <span>Pay ${grandTotal.toFixed(2)} via Stripe</span>
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>

              <div className="text-center">
                <span className="text-[11px] text-gray-500 flex items-center justify-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  Encrypted & Secured by Stripe Payments Gateway
                </span>
              </div>

            </form>
          </div>

        </div>
      )}

    </div>
  );
}
