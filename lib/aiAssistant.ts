import { Product } from './types';
import { getProducts } from './db';

export interface AIResponse {
  message: string;
  recommendedProducts: Product[];
  suggestedAction?: string;
}

export async function processAIChatQuery(query: string): Promise<AIResponse> {
  const products = await getProducts();
  const lowerQuery = query.toLowerCase();

  // Special Query 1: Promo Code / Discount
  if (lowerQuery.includes('discount') || lowerQuery.includes('coupon') || lowerQuery.includes('promo') || lowerQuery.includes('offer') || lowerQuery.includes('code')) {
    return {
      message: '🎉 Exclusive AI Offer Unlocked! Use promo code **TECH2026** at checkout for up to **25% OFF** across all Mobiles, Laptops, OLED TVs, Smart Fridges, and Inverter ACs!',
      recommendedProducts: products.slice(0, 3),
      suggestedAction: 'Copy code TECH2026 and apply it during checkout!'
    };
  }

  // Special Query 2: Order Tracking / Status
  if (lowerQuery.includes('track') || lowerQuery.includes('order status') || lowerQuery.includes('where is my order') || lowerQuery.includes('delivery')) {
    return {
      message: '📦 You can track all your recent orders live in your account portal! Your recent order **ORD-84920** (Apex Smartphone & Accessories) is on track and scheduled for Express Delivery in 2 days.',
      recommendedProducts: [],
      suggestedAction: 'Visit the Order History page from the top navigation menu.'
    };
  }

  // Price detection (e.g. "under 1000", "below $1500", "under $300")
  const priceMatch = lowerQuery.match(/(?:under|below|less than|\$)\s*(\d+)/);
  const maxPrice = priceMatch ? parseFloat(priceMatch[1]) : null;

  let matchedProducts = [...products];

  // Category & Keyword matching logic
  if (lowerQuery.includes('mobile') || lowerQuery.includes('phone') || lowerQuery.includes('smartphone') || lowerQuery.includes('5g') || lowerQuery.includes('fold') || lowerQuery.includes('titanium')) {
    matchedProducts = matchedProducts.filter(p => p.category === 'Mobile');
  } else if (lowerQuery.includes('laptop') || lowerQuery.includes('macbook') || lowerQuery.includes('notebook') || lowerQuery.includes('ultrabook') || lowerQuery.includes('m3')) {
    matchedProducts = matchedProducts.filter(p => p.category === 'Laptop');
  } else if (lowerQuery.includes('tv') || lowerQuery.includes('television') || lowerQuery.includes('oled') || lowerQuery.includes('qled') || lowerQuery.includes('8k') || lowerQuery.includes('4k')) {
    matchedProducts = matchedProducts.filter(p => p.category === 'TV' || p.category === 'Electronics');
  } else if (lowerQuery.includes('fridge') || lowerQuery.includes('refrigerator') || lowerQuery.includes('cooling') || lowerQuery.includes('freezer') || lowerQuery.includes('instaview')) {
    matchedProducts = matchedProducts.filter(p => p.category === 'Refrigerator');
  } else if (lowerQuery.includes('ac') || lowerQuery.includes('air conditioner') || lowerQuery.includes('split ac') || lowerQuery.includes('inverter ac') || lowerQuery.includes('ton')) {
    matchedProducts = matchedProducts.filter(p => p.category === 'Air Conditioner');
  } else if (lowerQuery.includes('headphone') || lowerQuery.includes('audio') || lowerQuery.includes('sound') || lowerQuery.includes('music') || lowerQuery.includes('speaker')) {
    matchedProducts = matchedProducts.filter(p => p.category === 'Audio');
  } else if (lowerQuery.includes('keyboard') || lowerQuery.includes('typing') || lowerQuery.includes('monitor') || lowerQuery.includes('electronics')) {
    matchedProducts = matchedProducts.filter(p => p.category === 'Electronics');
  } else if (lowerQuery.includes('watch') || lowerQuery.includes('fitness') || lowerQuery.includes('health') || lowerQuery.includes('wearable')) {
    matchedProducts = matchedProducts.filter(p => p.category === 'Wearables');
  } else if (lowerQuery.includes('chair') || lowerQuery.includes('furniture')) {
    matchedProducts = matchedProducts.filter(p => p.category === 'Furniture');
  } else if (lowerQuery.includes('bag') || lowerQuery.includes('leather') || lowerQuery.includes('charger') || lowerQuery.includes('dock') || lowerQuery.includes('accessory')) {
    matchedProducts = matchedProducts.filter(p => p.category === 'Accessories');
  }

  // Filter by price if mentioned
  if (maxPrice) {
    matchedProducts = matchedProducts.filter(p => p.price <= maxPrice);
  }

  // Rank by rating and relevance
  matchedProducts.sort((a, b) => b.rating - a.rating);
  const topRecommendations = matchedProducts.slice(0, 3);

  if (topRecommendations.length > 0) {
    let msg = `🤖 I analyzed our catalog for "${query}". Here are the top smart recommendations matched for you:`;
    if (maxPrice) {
      msg = `💡 Here are the best high-rated products under $${maxPrice}:`;
    }
    return {
      message: msg,
      recommendedProducts: topRecommendations,
      suggestedAction: 'Click any item to add directly to your cart with instant warranty coverage.'
    };
  }

  // Smart Fallback
  return {
    message: `🤖 I searched for "${query}". Here are our overall top-rated flagship bestsellers across Mobiles, Laptops, TVs, Fridges, and ACs:`,
    recommendedProducts: products.slice(0, 3),
    suggestedAction: 'Try asking: "Top 5G Mobiles", "M3 Laptop", "65 inch OLED TV", or "5 Star Inverter AC"'
  };
}
