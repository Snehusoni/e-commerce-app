'use client';

import React from 'react';
import { ShoppingBag, CheckCircle2 } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export function Toast() {
  const { toastMessage } = useCart();

  if (!toastMessage) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-slide-up">
      <div className="bg-dark-card border border-brand-500/40 text-white px-5 py-3.5 rounded-2xl shadow-glow flex items-center gap-3 backdrop-blur-md">
        <CheckCircle2 className="w-5 h-5 text-emerald-400" />
        <span className="text-sm font-medium text-gray-100">{toastMessage}</span>
      </div>
    </div>
  );
}
