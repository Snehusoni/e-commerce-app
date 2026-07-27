'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { History, Package, Truck, CheckCircle2, Clock, Search, ArrowRight, ExternalLink } from 'lucide-react';
import { Order } from '@/lib/types';

export default function OrderHistoryPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    async function fetchOrders() {
      try {
        const res = await fetch('/api/orders');
        const data = await res.json();
        if (data.success && data.orders) {
          setOrders(data.orders);
        }
      } catch (err) {
        console.error('Error loading order history', err);
      } finally {
        setLoading(false);
      }
    }
    fetchOrders();
  }, []);

  const filteredOrders = orders.filter((o) => {
    const matchesFilter = selectedFilter === 'All' || o.orderStatus.toLowerCase() === selectedFilter.toLowerCase();
    const matchesSearch =
      o.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.items.some((i) => i.name.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  const getStatusBadge = (status: Order['orderStatus']) => {
    switch (status) {
      case 'delivered':
        return (
          <span className="inline-flex items-center gap-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
            <CheckCircle2 className="w-3.5 h-3.5" /> Delivered
          </span>
        );
      case 'shipped':
        return (
          <span className="inline-flex items-center gap-1 bg-brand-500/10 text-brand-400 border border-brand-500/30 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
            <Truck className="w-3.5 h-3.5" /> On The Way
          </span>
        );
      case 'processing':
        return (
          <span className="inline-flex items-center gap-1 bg-amber-500/10 text-amber-400 border border-amber-500/30 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
            <Clock className="w-3.5 h-3.5" /> Processing
          </span>
        );
      default:
        return (
          <span className="bg-gray-800 text-gray-400 px-3 py-1 rounded-full text-xs font-bold uppercase">
            {status}
          </span>
        );
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header */}
      <div className="space-y-2 border-b border-gray-800 pb-6">
        <div className="flex items-center gap-2 text-xs font-semibold text-brand-400 uppercase tracking-widest">
          <History className="w-4 h-4" />
          <span>Customer Portal</span>
        </div>
        <h1 className="text-3xl font-extrabold text-white">Your Order History</h1>
        <p className="text-sm text-gray-400">Track shipments, download invoices, and manage past purchases.</p>
      </div>

      {/* Filters & Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto">
          {['All', 'Processing', 'Shipped', 'Delivered'].map((status) => (
            <button
              key={status}
              onClick={() => setSelectedFilter(status)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                selectedFilter === status
                  ? 'bg-brand-600 text-white shadow-glow'
                  : 'bg-dark-card border border-gray-800 text-gray-400 hover:text-white'
              }`}
            >
              {status}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search order number or item..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-dark-card border border-gray-800 text-white text-xs pl-9 pr-4 py-2.5 rounded-xl focus:outline-none focus:border-brand-500"
          />
        </div>
      </div>

      {/* Order List Cards */}
      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((n) => (
            <div key={n} className="bg-dark-card h-40 rounded-3xl border border-gray-800 animate-pulse" />
          ))}
        </div>
      ) : filteredOrders.length === 0 ? (
        <div className="py-20 text-center bg-dark-card border border-gray-800 rounded-3xl space-y-4">
          <Package className="w-12 h-12 text-gray-500 mx-auto" />
          <h3 className="text-lg font-bold text-white">No Orders Found</h3>
          <p className="text-xs text-gray-400">You haven't placed any orders matching this criteria yet.</p>
          <Link href="/products" className="inline-block px-5 py-2.5 bg-brand-600 text-white text-xs font-semibold rounded-xl">
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {filteredOrders.map((order) => (
            <div
              key={order._id}
              className="bg-dark-card border border-gray-800 rounded-3xl overflow-hidden shadow-xl hover:border-gray-700 transition-colors"
            >
              {/* Order Card Top Bar */}
              <div className="p-6 border-b border-gray-800/80 bg-dark-surface/40 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-2xl bg-brand-600/10 text-brand-400 border border-brand-500/20">
                    <Package className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-base font-extrabold text-white font-mono">{order.orderNumber}</span>
                      {getStatusBadge(order.orderStatus)}
                    </div>
                    <p className="text-xs text-gray-400 mt-0.5">
                      Placed on {new Date(order.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-lg font-black text-white">${order.total.toFixed(2)}</div>
                  <span className="text-xs text-emerald-400 font-semibold uppercase">{order.paymentStatus}</span>
                </div>
              </div>

              {/* Order Card Body Items */}
              <div className="p-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3 p-3 rounded-xl bg-dark-bg/60 border border-gray-800">
                      <img src={item.image} alt={item.name} className="w-14 h-14 rounded-lg object-cover bg-gray-800" />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs font-bold text-white truncate">{item.name}</h4>
                        <p className="text-[11px] text-gray-400 mt-0.5">Qty: {item.quantity} × ${item.price.toFixed(2)}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Delivery Tracker Bar */}
                <div className="pt-4 border-t border-gray-800/80 flex items-center justify-between text-xs">
                  <span className="text-gray-400">
                    Shipping to: <span className="text-white font-medium">{order.shippingAddress.fullName} ({order.shippingAddress.city}, {order.shippingAddress.state})</span>
                  </span>
                  <Link
                    href={`/checkout/success?orderId=${order._id}`}
                    className="text-brand-400 hover:text-brand-300 font-semibold flex items-center gap-1"
                  >
                    View Invoice & Details <ExternalLink className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

            </div>
          ))}
        </div>
      )}

    </div>
  );
}
