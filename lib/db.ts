import { Product, Order, AdminStats } from './types';
import { INITIAL_PRODUCTS, INITIAL_ORDERS } from './mockData';

// Memory store for immediate runtime performance if MongoDB is not active
let productsStore: Product[] = [...INITIAL_PRODUCTS];
let ordersStore: Order[] = [...INITIAL_ORDERS];

export async function getProducts(params?: { category?: string; search?: string; sort?: string; maxPrice?: number }): Promise<Product[]> {
  let result = [...productsStore];

  if (params?.category && params.category !== 'All') {
    result = result.filter(p => p.category.toLowerCase() === params.category!.toLowerCase());
  }

  if (params?.search) {
    const q = params.search.toLowerCase();
    result = result.filter(p => 
      p.name.toLowerCase().includes(q) || 
      p.description.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.tags?.some(t => t.toLowerCase().includes(q))
    );
  }

  if (params?.maxPrice) {
    result = result.filter(p => p.price <= params.maxPrice!);
  }

  if (params?.sort) {
    if (params.sort === 'price-low') {
      result.sort((a, b) => a.price - b.price);
    } else if (params.sort === 'price-high') {
      result.sort((a, b) => b.price - a.price);
    } else if (params.sort === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    } else if (params.sort === 'newest') {
      result.sort((a, b) => b._id.localeCompare(a._id));
    }
  }

  return result;
}

export async function getProductById(id: string): Promise<Product | null> {
  const found = productsStore.find(p => p._id === id || p.slug === id);
  return found || null;
}

export async function createProduct(productData: Partial<Product>): Promise<Product> {
  const newProduct: Product = {
    _id: `prod_${Date.now()}`,
    name: productData.name || 'New Product',
    slug: (productData.name || 'new-product').toLowerCase().replace(/[^a-z0-9]+/g, '-'),
    description: productData.description || '',
    price: Number(productData.price) || 0,
    originalPrice: productData.originalPrice ? Number(productData.originalPrice) : undefined,
    category: productData.category || 'General',
    image: productData.image || 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=800&q=80',
    inStock: productData.stockCount ? productData.stockCount > 0 : true,
    stockCount: productData.stockCount ? Number(productData.stockCount) : 10,
    rating: 5.0,
    reviewCount: 1,
    badge: productData.badge,
    tags: productData.tags || ['New'],
    features: productData.features || ['Premium Build Quality']
  };

  productsStore.unshift(newProduct);
  return newProduct;
}

export async function updateProduct(id: string, productData: Partial<Product>): Promise<Product | null> {
  const index = productsStore.findIndex(p => p._id === id);
  if (index === -1) return null;

  productsStore[index] = {
    ...productsStore[index],
    ...productData,
  };

  return productsStore[index];
}

export async function deleteProduct(id: string): Promise<boolean> {
  const initialLength = productsStore.length;
  productsStore = productsStore.filter(p => p._id !== id);
  return productsStore.length < initialLength;
}

export async function getOrders(): Promise<Order[]> {
  return [...ordersStore];
}

export async function getOrderById(id: string): Promise<Order | null> {
  return ordersStore.find(o => o._id === id || o.orderNumber === id) || null;
}

export async function createOrder(orderData: Omit<Order, '_id' | 'orderNumber' | 'createdAt'>): Promise<Order> {
  const newOrder: Order = {
    ...orderData,
    _id: `ord_${Date.now()}`,
    orderNumber: `ORD-${Math.floor(10000 + Math.random() * 90000)}`,
    createdAt: new Date().toISOString(),
    estimatedDelivery: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    })
  };

  ordersStore.unshift(newOrder);
  return newOrder;
}

export async function updateOrderStatus(orderId: string, status: Order['orderStatus']): Promise<Order | null> {
  const order = ordersStore.find(o => o._id === orderId || o.orderNumber === orderId);
  if (!order) return null;
  order.orderStatus = status;
  return order;
}

export async function getAdminStats(): Promise<AdminStats> {
  const totalRevenue = ordersStore.reduce((acc, order) => acc + (order.paymentStatus === 'paid' ? order.total : 0), 0);
  const totalOrders = ordersStore.length;
  const totalProducts = productsStore.length;
  const outOfStockCount = productsStore.filter(p => !p.inStock || p.stockCount === 0).length;
  
  // Calculate unique customer count
  const customerSet = new Set(ordersStore.map(o => o.customerEmail));

  const monthlyRevenue = [
    { month: 'Jan', revenue: 4200 },
    { month: 'Feb', revenue: 5800 },
    { month: 'Mar', revenue: 7100 },
    { month: 'Apr', revenue: 6400 },
    { month: 'May', revenue: 8900 },
    { month: 'Jun', revenue: 10400 },
    { month: 'Jul', revenue: Math.round(totalRevenue) }
  ];

  return {
    totalRevenue,
    revenueChange: +14.2,
    totalOrders,
    ordersChange: +8.5,
    totalProducts,
    outOfStockCount,
    totalCustomers: customerSet.size + 15,
    recentOrders: ordersStore.slice(0, 5),
    monthlyRevenue
  };
}
