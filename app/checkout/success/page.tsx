'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { CheckCircle2, Package, ArrowRight, Printer, Sparkles, Truck } from 'lucide-react';
import { Order } from '@/lib/types';

function CheckoutSuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId');
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchOrder() {
      if (!orderId) {
        setLoading(false);
        return;
      }
      try {
        const res = await fetch('/api/orders');
        const data = await res.json();
        if (data.success && data.orders) {
          const found = data.orders.find((o: Order) => o._id === orderId || o.orderNumber === orderId);
          if (found) setOrder(found);
        }
      } catch (err) {
        console.error('Failed to fetch order confirmation', err);
      } finally {
        setLoading(false);
      }
    }
    fetchOrder();
  }, [orderId]);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-8">
      
      {/* Success Banner */}
      <div className="text-center space-y-4 bg-dark-card border border-brand-500/30 p-8 sm:p-12 rounded-3xl shadow-glow relative overflow-hidden">
        <div className="w-20 h-20 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto text-emerald-400">
          <CheckCircle2 className="w-10 h-10 animate-bounce" />
        </div>

        <div className="space-y-1">
          <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest flex items-center justify-center gap-1">
            <Sparkles className="w-4 h-4" /> Payment Successful & Confirmed
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white">Thank You For Your Order!</h1>
          <p className="text-sm text-gray-300">
            Order <span className="font-mono text-brand-400 font-bold">{order?.orderNumber || 'ORD-84922'}</span> has been received and is now processing.
          </p>
        </div>

        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-800 text-xs font-medium text-gray-300">
          <Truck className="w-4 h-4 text-brand-400" />
          Estimated Delivery: <span className="text-white font-bold">{order?.estimatedDelivery || 'In 3 to 4 Business Days'}</span>
        </div>
      </div>

      {/* Order Details Breakdown */}
      {order && (
        <div className="bg-dark-card border border-gray-800 rounded-3xl p-6 space-y-6 shadow-xl">
          <div className="flex items-center justify-between border-b border-gray-800 pb-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Package className="w-5 h-5 text-brand-400" />
              Order Receipt Summary
            </h3>
            <button
              onClick={() => window.print()}
              className="text-xs font-semibold text-gray-400 hover:text-white flex items-center gap-1"
            >
              <Printer className="w-4 h-4" /> Print Receipt
            </button>
          </div>

          {/* Purchased Items List */}
          <div className="space-y-3">
            {order.items.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-dark-bg/60 border border-gray-800">
                <div className="flex items-center gap-3">
                  <img src={item.image} alt={item.name} className="w-12 h-12 rounded-lg object-cover bg-gray-800" />
                  <div>
                    <h4 className="text-sm font-bold text-white">{item.name}</h4>
                    <span className="text-xs text-gray-400">Qty: {item.quantity} × ${item.price.toFixed(2)}</span>
                  </div>
                </div>
                <span className="text-sm font-bold text-brand-400">${(item.quantity * item.price).toFixed(2)}</span>
              </div>
            ))}
          </div>

          {/* Delivery Address & Customer Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-gray-800 text-xs">
            <div>
              <h4 className="font-bold text-gray-300 uppercase tracking-wider mb-1">Shipping Destination</h4>
              <p className="text-white font-medium">{order.shippingAddress.fullName}</p>
              <p className="text-gray-400">{order.shippingAddress.address}</p>
              <p className="text-gray-400">{order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.postalCode}</p>
              <p className="text-gray-400">{order.shippingAddress.country}</p>
            </div>
            <div>
              <h4 className="font-bold text-gray-300 uppercase tracking-wider mb-1">Payment Status</h4>
              <p className="text-emerald-400 font-bold uppercase">Payment Confirmed via Stripe</p>
              <p className="text-gray-400 mt-1">Confirmation sent to: <span className="text-white">{order.customerEmail}</span></p>
            </div>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <Link
          href="/orders"
          className="w-full sm:w-auto px-8 py-3.5 bg-brand-600 hover:bg-brand-500 text-white font-bold rounded-2xl text-sm transition-colors text-center"
        >
          View Order History
        </Link>
        <Link
          href="/products"
          className="w-full sm:w-auto px-8 py-3.5 bg-dark-card hover:bg-gray-800 text-gray-200 border border-gray-700 font-semibold rounded-2xl text-sm transition-colors text-center flex items-center justify-center gap-2"
        >
          Continue Shopping <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

    </div>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense fallback={<div className="text-center py-20 text-gray-400">Loading Order Confirmation...</div>}>
      <CheckoutSuccessContent />
    </Suspense>
  );
}
