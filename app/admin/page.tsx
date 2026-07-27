'use client';

import React, { useState, useEffect } from 'react';
import { LayoutDashboard, DollarSign, ShoppingBag, Package, Users, Plus, Trash2, Edit, TrendingUp, AlertTriangle, CheckCircle2, X } from 'lucide-react';
import { Product, Order, AdminStats } from '@/lib/types';

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'products' | 'orders'>('overview');

  // Modal State for adding new product
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    category: 'Audio',
    image: '',
    stockCount: '15',
    description: '',
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [statsRes, productsRes, ordersRes] = await Promise.all([
        fetch('/api/admin/stats'),
        fetch('/api/products'),
        fetch('/api/orders'),
      ]);

      const statsData = await statsRes.json();
      const productsData = await productsRes.json();
      const ordersData = await ordersRes.json();

      if (statsData.success) setStats(statsData.stats);
      if (productsData.success) setProducts(productsData.products);
      if (ordersData.success) setOrders(ordersData.orders);
    } catch (err) {
      console.error('Error fetching admin data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...newProduct,
          price: Number(newProduct.price),
          stockCount: Number(newProduct.stockCount),
        }),
      });

      const data = await res.json();
      if (data.success) {
        setIsModalOpen(false);
        setNewProduct({ name: '', price: '', category: 'Audio', image: '', stockCount: '15', description: '' });
        fetchData();
      }
    } catch (err) {
      console.error('Failed to create product', err);
    }
  };

  const handleDeleteProduct = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;
    try {
      const res = await fetch(`/api/products/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        fetchData();
      }
    } catch (err) {
      console.error('Delete error', err);
    }
  };

  const handleUpdateOrderStatus = async (orderId: string, status: Order['orderStatus']) => {
    try {
      const res = await fetch('/api/orders', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderId, orderStatus: status }),
      });
      const data = await res.json();
      if (data.success) {
        fetchData();
      }
    } catch (err) {
      console.error('Order status update error', err);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-800 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-brand-400 uppercase tracking-widest">
            <LayoutDashboard className="w-4 h-4" />
            <span>Store Administrator</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white">Admin Management Dashboard</h1>
          <p className="text-sm text-gray-400">Monitor store revenue, manage product stock, and handle incoming customer orders.</p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-5 py-3 bg-gradient-to-r from-brand-600 to-accent-purple hover:brightness-110 text-white font-bold rounded-xl text-sm shadow-glow flex items-center justify-center gap-2"
        >
          <Plus className="w-5 h-5" /> Add New Product
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-800 space-x-6 text-sm font-semibold">
        <button
          onClick={() => setActiveTab('overview')}
          className={`pb-3 transition-colors ${activeTab === 'overview' ? 'text-brand-400 border-b-2 border-brand-400' : 'text-gray-400 hover:text-white'}`}
        >
          Overview & Revenue
        </button>
        <button
          onClick={() => setActiveTab('products')}
          className={`pb-3 transition-colors ${activeTab === 'products' ? 'text-brand-400 border-b-2 border-brand-400' : 'text-gray-400 hover:text-white'}`}
        >
          Products Inventory ({products.length})
        </button>
        <button
          onClick={() => setActiveTab('orders')}
          className={`pb-3 transition-colors ${activeTab === 'orders' ? 'text-brand-400 border-b-2 border-brand-400' : 'text-gray-400 hover:text-white'}`}
        >
          Manage Orders ({orders.length})
        </button>
      </div>

      {loading ? (
        <div className="space-y-6 animate-pulse">
          <div className="grid grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((n) => (
              <div key={n} className="bg-dark-card h-32 rounded-2xl border border-gray-800" />
            ))}
          </div>
        </div>
      ) : (
        <>
          {/* TAB 1: OVERVIEW & ANALYTICS */}
          {activeTab === 'overview' && stats && (
            <div className="space-y-8">
              
              {/* Analytics Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                
                <div className="p-6 rounded-2xl bg-dark-card border border-gray-800 space-y-2">
                  <div className="flex items-center justify-between text-gray-400">
                    <span className="text-xs font-semibold uppercase">Total Revenue</span>
                    <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
                      <DollarSign className="w-5 h-5" />
                    </div>
                  </div>
                  <div className="text-3xl font-black text-white">${stats.totalRevenue.toFixed(2)}</div>
                  <div className="flex items-center gap-1 text-xs text-emerald-400 font-semibold">
                    <TrendingUp className="w-3.5 h-3.5" /> +14.2% from last month
                  </div>
                </div>

                <div className="p-6 rounded-2xl bg-dark-card border border-gray-800 space-y-2">
                  <div className="flex items-center justify-between text-gray-400">
                    <span className="text-xs font-semibold uppercase">Total Orders</span>
                    <div className="p-2 rounded-lg bg-brand-500/10 text-brand-400">
                      <ShoppingBag className="w-5 h-5" />
                    </div>
                  </div>
                  <div className="text-3xl font-black text-white">{stats.totalOrders}</div>
                  <div className="flex items-center gap-1 text-xs text-brand-400 font-semibold">
                    <TrendingUp className="w-3.5 h-3.5" /> +8.5% order growth
                  </div>
                </div>

                <div className="p-6 rounded-2xl bg-dark-card border border-gray-800 space-y-2">
                  <div className="flex items-center justify-between text-gray-400">
                    <span className="text-xs font-semibold uppercase">Active Products</span>
                    <div className="p-2 rounded-lg bg-accent-purple/10 text-accent-purple">
                      <Package className="w-5 h-5" />
                    </div>
                  </div>
                  <div className="text-3xl font-black text-white">{stats.totalProducts}</div>
                  <div className="text-xs text-gray-400">
                    <span className="text-amber-400 font-bold">{stats.outOfStockCount} items</span> out of stock
                  </div>
                </div>

                <div className="p-6 rounded-2xl bg-dark-card border border-gray-800 space-y-2">
                  <div className="flex items-center justify-between text-gray-400">
                    <span className="text-xs font-semibold uppercase">Total Customers</span>
                    <div className="p-2 rounded-lg bg-accent-pink/10 text-accent-pink">
                      <Users className="w-5 h-5" />
                    </div>
                  </div>
                  <div className="text-3xl font-black text-white">{stats.totalCustomers}</div>
                  <div className="text-xs text-gray-400">Registered users</div>
                </div>

              </div>

              {/* Monthly Revenue Visual Bar Chart */}
              <div className="p-6 rounded-3xl bg-dark-card border border-gray-800 space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-white">Monthly Sales Performance</h3>
                  <span className="text-xs text-gray-400">2026 Financial Year</span>
                </div>

                <div className="h-64 flex items-end justify-between gap-4 pt-8 px-4 border-b border-gray-800 pb-2">
                  {stats.monthlyRevenue.map((item) => {
                    const heightPercent = (item.revenue / 12000) * 100;
                    return (
                      <div key={item.month} className="flex-1 flex flex-col items-center gap-2 group">
                        <span className="text-[11px] font-bold text-gray-400 group-hover:text-brand-300 opacity-0 group-hover:opacity-100 transition-opacity">
                          ${item.revenue}
                        </span>
                        <div
                          className="w-full bg-gradient-to-t from-brand-600 to-accent-purple rounded-t-lg transition-all duration-500 group-hover:brightness-125"
                          style={{ height: `${heightPercent}%` }}
                        />
                        <span className="text-xs font-semibold text-gray-400">{item.month}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>
          )}

          {/* TAB 2: PRODUCT MANAGEMENT TABLE */}
          {activeTab === 'products' && (
            <div className="bg-dark-card border border-gray-800 rounded-3xl overflow-hidden shadow-xl">
              <div className="p-6 border-b border-gray-800 flex justify-between items-center">
                <h3 className="text-lg font-bold text-white">Inventory Management</h3>
                <span className="text-xs text-gray-400">Click on trash icon to remove item from catalog</span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-dark-surface/60 text-gray-400 font-semibold uppercase tracking-wider">
                    <tr>
                      <th className="p-4">Product Name</th>
                      <th className="p-4">Category</th>
                      <th className="p-4">Price</th>
                      <th className="p-4">Stock</th>
                      <th className="p-4">Rating</th>
                      <th className="p-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-800 text-gray-300">
                    {products.map((prod) => (
                      <tr key={prod._id} className="hover:bg-gray-800/40 transition-colors">
                        <td className="p-4 font-semibold text-white flex items-center gap-3">
                          <img src={prod.image} alt={prod.name} className="w-10 h-10 rounded-lg object-cover bg-gray-800" />
                          <span>{prod.name}</span>
                        </td>
                        <td className="p-4 text-brand-400 font-medium">{prod.category}</td>
                        <td className="p-4 font-bold text-white">${prod.price.toFixed(2)}</td>
                        <td className="p-4">
                          <span className={`px-2.5 py-1 rounded-full font-bold ${
                            prod.inStock ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'
                          }`}>
                            {prod.stockCount} in stock
                          </span>
                        </td>
                        <td className="p-4 font-semibold text-amber-400">★ {prod.rating}</td>
                        <td className="p-4 text-right">
                          <button
                            onClick={() => handleDeleteProduct(prod._id)}
                            className="p-2 text-gray-500 hover:text-red-400 transition-colors"
                            title="Delete Product"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 3: ORDER STATUS MANAGER */}
          {activeTab === 'orders' && (
            <div className="bg-dark-card border border-gray-800 rounded-3xl overflow-hidden shadow-xl">
              <div className="p-6 border-b border-gray-800 flex justify-between items-center">
                <h3 className="text-lg font-bold text-white">Customer Orders</h3>
                <span className="text-xs text-gray-400">Update shipping status in real-time</span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-dark-surface/60 text-gray-400 font-semibold uppercase tracking-wider">
                    <tr>
                      <th className="p-4">Order ID</th>
                      <th className="p-4">Customer</th>
                      <th className="p-4">Date</th>
                      <th className="p-4">Total</th>
                      <th className="p-4">Payment</th>
                      <th className="p-4">Status Selector</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-800 text-gray-300">
                    {orders.map((ord) => (
                      <tr key={ord._id} className="hover:bg-gray-800/40 transition-colors">
                        <td className="p-4 font-mono font-bold text-white">{ord.orderNumber}</td>
                        <td className="p-4">
                          <div className="font-semibold text-white">{ord.customerName}</div>
                          <div className="text-[11px] text-gray-400">{ord.customerEmail}</div>
                        </td>
                        <td className="p-4 text-gray-400">
                          {new Date(ord.createdAt).toLocaleDateString('en-US')}
                        </td>
                        <td className="p-4 font-black text-white">${ord.total.toFixed(2)}</td>
                        <td className="p-4 text-emerald-400 font-bold uppercase">{ord.paymentStatus}</td>
                        <td className="p-4">
                          <select
                            value={ord.orderStatus}
                            onChange={(e) => handleUpdateOrderStatus(ord._id, e.target.value as any)}
                            className="bg-dark-bg border border-gray-700 text-white rounded-lg px-3 py-1.5 text-xs font-semibold focus:outline-none focus:border-brand-500"
                          >
                            <option value="processing">Processing</option>
                            <option value="shipped">Shipped</option>
                            <option value="delivered">Delivered</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </>
      )}

      {/* Add New Product Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
          <div className="bg-dark-card border border-gray-800 rounded-3xl max-w-lg w-full p-6 space-y-4 shadow-2xl relative">
            <div className="flex items-center justify-between border-b border-gray-800 pb-3">
              <h3 className="text-lg font-bold text-white">Add Product to Store</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateProduct} className="space-y-3 text-xs">
              <div>
                <label className="block text-gray-300 font-semibold mb-1">Product Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Wireless Noise Canceling Headphones"
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                  className="w-full bg-dark-bg border border-gray-700 text-white rounded-xl px-3.5 py-2.5"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-300 font-semibold mb-1">Price ($ USD)</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    placeholder="199.99"
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                    className="w-full bg-dark-bg border border-gray-700 text-white rounded-xl px-3.5 py-2.5"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 font-semibold mb-1">Category</label>
                  <select
                    value={newProduct.category}
                    onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                    className="w-full bg-dark-bg border border-gray-700 text-white rounded-xl px-3.5 py-2.5"
                  >
                    <option value="Mobile">Mobile</option>
                    <option value="Laptop">Laptop</option>
                    <option value="TV">TV</option>
                    <option value="Refrigerator">Refrigerator</option>
                    <option value="Air Conditioner">Air Conditioner</option>
                    <option value="Audio">Audio</option>
                    <option value="Electronics">Electronics</option>
                    <option value="Wearables">Wearables</option>
                    <option value="Accessories">Accessories</option>
                    <option value="Furniture">Furniture</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-gray-300 font-semibold mb-1">Image URL (Unsplash or direct URL)</label>
                <input
                  type="text"
                  placeholder="https://images.unsplash.com/photo-..."
                  value={newProduct.image}
                  onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
                  className="w-full bg-dark-bg border border-gray-700 text-white rounded-xl px-3.5 py-2.5"
                />
              </div>

              <div>
                <label className="block text-gray-300 font-semibold mb-1">Product Description</label>
                <textarea
                  rows={3}
                  placeholder="Describe key features, specs, and details..."
                  value={newProduct.description}
                  onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                  className="w-full bg-dark-bg border border-gray-700 text-white rounded-xl px-3.5 py-2.5"
                />
              </div>

              <div className="pt-3 flex gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 py-3 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-xl font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 bg-brand-600 hover:bg-brand-500 text-white rounded-xl font-bold shadow-glow"
                >
                  Save & Publish
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
