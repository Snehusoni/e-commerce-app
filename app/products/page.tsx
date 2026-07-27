'use client';

import React, { useState, useEffect } from 'react';
import { Search, Filter, SlidersHorizontal, RotateCcw, Sparkles } from 'lucide-react';
import { Product } from '@/lib/types';
import { ProductCard } from '@/components/ProductCard';

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Filter state
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('featured');
  const [maxPrice, setMaxPrice] = useState(3000);

  const categories = ['All', 'Mobile', 'Laptop', 'TV', 'Refrigerator', 'Air Conditioner', 'Audio', 'Electronics', 'Wearables', 'Accessories', 'Furniture'];

  useEffect(() => {
    // Read category query parameter if passed via URL
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const catParam = urlParams.get('category');
      if (catParam) setSelectedCategory(catParam);
    }
  }, []);

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      try {
        const queryParams = new URLSearchParams();
        if (selectedCategory !== 'All') queryParams.append('category', selectedCategory);
        if (search.trim()) queryParams.append('search', search.trim());
        if (sortBy !== 'featured') queryParams.append('sort', sortBy);
        if (maxPrice < 3000) queryParams.append('maxPrice', maxPrice.toString());

        const res = await fetch(`/api/products?${queryParams.toString()}`);
        const data = await res.json();
        if (data.success) {
          setProducts(data.products);
        }
      } catch (err) {
        console.error('Error loading products', err);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, [selectedCategory, search, sortBy, maxPrice]);

  const resetFilters = () => {
    setSearch('');
    setSelectedCategory('All');
    setSortBy('featured');
    setMaxPrice(3000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Page Header Title */}
      <div className="space-y-2 border-b border-gray-800 pb-6">
        <div className="flex items-center gap-2 text-xs font-semibold text-brand-400 uppercase tracking-widest">
          <Sparkles className="w-4 h-4" />
          <span>Product Catalog</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white">Explore All Products</h1>
        <p className="text-sm text-gray-400">Discover top Mobiles, Laptops, 4K Smart TVs, French Door Fridges, Split ACs & premium electronics.</p>
      </div>

      {/* Main Search & Control Bar */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
        
        {/* Search Bar */}
        <div className="md:col-span-6 relative">
          <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by Mobile, Laptop, TV, Fridge, AC, tag..."
            className="w-full bg-dark-card border border-gray-800 text-white pl-12 pr-4 py-3 rounded-xl focus:outline-none focus:border-brand-500 text-sm transition-colors"
          />
        </div>

        {/* Sort Selector */}
        <div className="md:col-span-3">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full bg-dark-card border border-gray-800 text-gray-200 px-4 py-3 rounded-xl focus:outline-none focus:border-brand-500 text-sm font-medium"
          >
            <option value="featured">Sort by: Featured</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
            <option value="newest">Newest Arrivals</option>
          </select>
        </div>

        {/* Price Slider Quick Filter */}
        <div className="md:col-span-3 bg-dark-card border border-gray-800 px-4 py-2.5 rounded-xl flex items-center gap-3">
          <div className="flex-1">
            <div className="flex justify-between text-xs text-gray-400 mb-1">
              <span>Max Price:</span>
              <span className="font-bold text-white">${maxPrice}</span>
            </div>
            <input
              type="range"
              min="100"
              max="3000"
              step="100"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-brand-500 cursor-pointer"
            />
          </div>
        </div>

      </div>

      {/* Category Pills & Reset Button */}
      <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
        <div className="flex flex-wrap items-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-200 ${
                selectedCategory === cat
                  ? 'bg-brand-600 text-white shadow-glow'
                  : 'bg-dark-card border border-gray-800 text-gray-400 hover:text-white hover:border-gray-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {(selectedCategory !== 'All' || search || sortBy !== 'featured' || maxPrice < 3000) && (
          <button
            onClick={resetFilters}
            className="flex items-center gap-1.5 text-xs text-brand-400 hover:text-brand-300 font-semibold"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Clear Filters
          </button>
        )}
      </div>

      {/* Products Grid & Loading State */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 animate-pulse">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
            <div key={n} className="bg-dark-card border border-gray-800 rounded-2xl h-80"></div>
          ))}
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-20 bg-dark-card/40 border border-gray-800 rounded-3xl space-y-4">
          <Filter className="w-12 h-12 text-gray-500 mx-auto" />
          <h3 className="text-lg font-bold text-white">No products found</h3>
          <p className="text-xs text-gray-400 max-w-sm mx-auto">
            Try adjusting your search criteria or resetting filters to view more products.
          </p>
          <button
            onClick={resetFilters}
            className="px-5 py-2.5 bg-brand-600 text-white font-semibold text-xs rounded-xl hover:bg-brand-500"
          >
            Reset All Filters
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="text-xs text-gray-400 font-medium">
            Showing <span className="text-white font-bold">{products.length}</span> results
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
