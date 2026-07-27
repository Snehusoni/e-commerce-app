import { Product, CartItem } from './types';
import { getProducts, getOrders } from './db';

export interface AIResponse {
  message: string;
  recommendedProducts?: Product[];
  comparisonProducts?: Product[];
  suggestedAction?: string;
  promoCode?: string;
  intent?: 'recommend' | 'compare' | 'cart' | 'order' | 'discount' | 'policy' | 'general';
}

export async function processAIChatQuery(
  query: string,
  cartItems: CartItem[] = []
): Promise<AIResponse> {
  const products = await getProducts();
  const lowerQuery = query.toLowerCase().trim();

  // 1. Hinglish & English Intent Normalization
  const isCheap = lowerQuery.includes('sasta') || lowerQuery.includes('cheap') || lowerQuery.includes('low budget') || lowerQuery.includes('affordable') || lowerQuery.includes('under');
  const isPremium = lowerQuery.includes('mehanga') || lowerQuery.includes('best') || lowerQuery.includes('flagship') || lowerQuery.includes('top rated') || lowerQuery.includes('premium') || lowerQuery.includes('pro');
  const isCompare = lowerQuery.includes('compare') || lowerQuery.includes('vs') || lowerQuery.includes('difference') || lowerQuery.includes('antar') || lowerQuery.includes('kon sa lu');
  const isDiscount = lowerQuery.includes('discount') || lowerQuery.includes('coupon') || lowerQuery.includes('promo') || lowerQuery.includes('offer') || lowerQuery.includes('code') || lowerQuery.includes('deal') || lowerQuery.includes(' छूट');
  const isOrderTrack = lowerQuery.includes('track') || lowerQuery.includes('order status') || lowerQuery.includes('where is my order') || lowerQuery.includes('delivery') || lowerQuery.includes('kab aayega');
  const isCartQuery = lowerQuery.includes('cart') || lowerQuery.includes('bag') || lowerQuery.includes('my items') || lowerQuery.includes('total price');
  const isPolicyQuery = lowerQuery.includes('warranty') || lowerQuery.includes('return') || lowerQuery.includes('shipping fee') || lowerQuery.includes('guarantee') || lowerQuery.includes('support');

  // 2. Discount / Coupon Code Intent
  if (isDiscount) {
    return {
      intent: 'discount',
      message: '🎉 **Exclusive Aura AI Smart Discount Unlocked!**\n\nUse promo code **`TECH2026`** at checkout to get **25% INSTANT OFF** on all Mobiles, Laptops, OLED TVs, Fridges, and ACs!',
      recommendedProducts: products.slice(0, 3),
      promoCode: 'TECH2026',
      suggestedAction: 'Click to copy code TECH2026 or apply directly at checkout!'
    };
  }

  // 3. Cart Summary Intent
  if (isCartQuery) {
    if (cartItems.length === 0) {
      return {
        intent: 'cart',
        message: '🛒 Your shopping cart is currently empty! Would you like me to recommend top electronics like 5G Smartphones, M3 Laptops, or 4K Smart TVs?',
        recommendedProducts: products.slice(0, 3),
        suggestedAction: 'Ask: "Show me top 5G mobiles" or "Best laptops for work"'
      };
    }

    const totalCost = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
    const itemNames = cartItems.map(i => `• ${i.product.name} (x${i.quantity}) - $${(i.product.price * i.quantity).toFixed(2)}`).join('\n');

    return {
      intent: 'cart',
      message: `🛒 **Your Smart Cart Analysis:**\nYou currently have **${cartItems.reduce((a, b) => a + b.quantity, 0)} items** totaling **$${totalCost.toFixed(2)}**:\n\n${itemNames}\n\n💡 *Tip: Apply code **TECH2026** at checkout to save up to $${(totalCost * 0.25).toFixed(2)}!*`,
      suggestedAction: 'Proceed to Checkout or ask for complementary accessories!'
    };
  }

  // 4. Order Tracking Intent
  if (isOrderTrack) {
    const orders = await getOrders();
    const recentOrder = orders[0];

    if (recentOrder) {
      return {
        intent: 'order',
        message: `📦 **Latest Order Status:**\n\nOrder **#${recentOrder.orderNumber}**\n• Status: **${recentOrder.orderStatus.toUpperCase()}** 🚚\n• Total: **$${recentOrder.total.toFixed(2)}**\n• Expected Delivery: **${recentOrder.estimatedDelivery || 'In 2-3 Days'}**`,
        suggestedAction: 'Go to Order History tab to view full invoice & tracking.'
      };
    }

    return {
      intent: 'order',
      message: '📦 You have no active orders placed yet. Once you complete checkout, you can track live shipping updates right here!',
      suggestedAction: 'Start shopping our latest catalog!'
    };
  }

  // 5. Store Policies & Guarantee Intent
  if (isPolicyQuery) {
    return {
      intent: 'policy',
      message: '🛡️ **Aura Smart Care Guarantee:**\n\n1️⃣ **Free Express Shipping** on all orders above $99.\n2️⃣ **2-Year Comprehensive Brand Warranty** included automatically.\n3️⃣ **30-Day No-Questions-Asked Easy Returns**.\n4️⃣ 24/7 Dedicated Priority Support.',
      suggestedAction: 'Need help with a specific item warranty? Just ask me!'
    };
  }

  // 6. Price detection (e.g. "under 1000", "below 500", "under $1500")
  const priceMatch = lowerQuery.match(/(?:under|below|less than|budget|\$)\s*(\d+)/);
  const maxPrice = priceMatch ? parseFloat(priceMatch[1]) : null;

  // 7. Product Category & Spec Matcher
  let filtered = [...products];

  if (lowerQuery.includes('mobile') || lowerQuery.includes('phone') || lowerQuery.includes('smartphone') || lowerQuery.includes('5g') || lowerQuery.includes('fold') || lowerQuery.includes('titanium')) {
    filtered = filtered.filter(p => p.category === 'Mobile');
  } else if (lowerQuery.includes('laptop') || lowerQuery.includes('macbook') || lowerQuery.includes('notebook') || lowerQuery.includes('ultrabook') || lowerQuery.includes('m3')) {
    filtered = filtered.filter(p => p.category === 'Laptop');
  } else if (lowerQuery.includes('tv') || lowerQuery.includes('television') || lowerQuery.includes('oled') || lowerQuery.includes('qled') || lowerQuery.includes('4k')) {
    filtered = filtered.filter(p => p.category === 'TV' || p.category === 'Electronics');
  } else if (lowerQuery.includes('fridge') || lowerQuery.includes('refrigerator') || lowerQuery.includes('freezer') || lowerQuery.includes('cooling')) {
    filtered = filtered.filter(p => p.category === 'Refrigerator');
  } else if (lowerQuery.includes('ac') || lowerQuery.includes('air conditioner') || lowerQuery.includes('split') || lowerQuery.includes('inverter')) {
    filtered = filtered.filter(p => p.category === 'Air Conditioner');
  } else if (lowerQuery.includes('audio') || lowerQuery.includes('headphone') || lowerQuery.includes('sound') || lowerQuery.includes('speaker')) {
    filtered = filtered.filter(p => p.category === 'Audio');
  } else if (lowerQuery.includes('watch') || lowerQuery.includes('wearable') || lowerQuery.includes('fitness')) {
    filtered = filtered.filter(p => p.category === 'Wearables');
  }

  if (maxPrice) {
    filtered = filtered.filter(p => p.price <= maxPrice);
  }

  // Sorting based on user tone
  if (isCheap) {
    filtered.sort((a, b) => a.price - b.price);
  } else {
    filtered.sort((a, b) => b.rating - a.rating);
  }

  // 8. Comparison Mode Intent
  if (isCompare && products.length >= 2) {
    const compareItems = filtered.length >= 2 ? filtered.slice(0, 2) : products.slice(0, 2);
    return {
      intent: 'compare',
      message: `⚡ **Smart Product Comparison:**\nComparing **${compareItems[0].name}** vs **${compareItems[1].name}**`,
      comparisonProducts: compareItems,
      suggestedAction: 'Which features matter most to you? High speed, screen quality, or battery?'
    };
  }

  // 9. Standard Recommendation Response
  if (filtered.length > 0) {
    const topMatches = filtered.slice(0, 3);
    const headerMsg = maxPrice 
      ? `💡 **Smart Recommendations under $${maxPrice}:**` 
      : isCheap 
        ? `💰 **Best Budget-Friendly Picked for You:**`
        : `🤖 **Top-Rated AI Picks for "${query}":**`;

    return {
      intent: 'recommend',
      message: `${headerMsg}\n\nI matched our finest devices with verified 4.8+ ratings and full warranty coverage.`,
      recommendedProducts: topMatches,
      suggestedAction: 'Click item to view details or add directly to cart!'
    };
  }

  // 10. Fallback AI Response
  return {
    intent: 'general',
    message: `🤖 I analyzed our entire inventory for **"${query}"**. Here are our top flagship bestsellers that users love:`,
    recommendedProducts: products.slice(0, 3),
    suggestedAction: 'Try asking: "Top 5G Mobiles", "M3 Laptop vs TV", "Sasta laptop under 1000", or "Discount coupon"'
  };
}

