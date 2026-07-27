export interface Product {
  _id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  originalPrice?: number;
  category: string;
  image: string;
  gallery?: string[];
  inStock: boolean;
  stockCount: number;
  rating: number;
  reviewCount: number;
  badge?: string;
  tags?: string[];
  features?: string[];
  createdAt?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor?: string;
  selectedSize?: string;
}

export interface ShippingAddress {
  fullName: string;
  email: string;
  address: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export interface OrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export interface Order {
  _id: string;
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  shippingAddress: ShippingAddress;
  items: OrderItem[];
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  paymentMethod: 'stripe' | 'card' | 'cod';
  paymentStatus: 'paid' | 'pending' | 'failed';
  orderStatus: 'processing' | 'shipped' | 'delivered' | 'cancelled';
  stripeSessionId?: string;
  createdAt: string;
  estimatedDelivery?: string;
}

export interface AdminStats {
  totalRevenue: number;
  revenueChange: number;
  totalOrders: number;
  ordersChange: number;
  totalProducts: number;
  outOfStockCount: number;
  totalCustomers: number;
  recentOrders: Order[];
  monthlyRevenue: { month: string; revenue: number }[];
}
