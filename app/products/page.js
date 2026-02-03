'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext'; // Import Auth
import ProductCard from '@/components/ProductCard'; // Import Card
import Link from 'next/link';

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  // 1. Get User
  const { user, loading: authLoading } = useAuth();

  useEffect(() => {
    // Only fetch if user is logged in
    if (user) {
      fetchProducts();
    }
  }, [user]);

  const fetchProducts = async () => {
    try {
      // 2. FIX: Fetch ALL products (Removed ?userId=...)
      // We want to see the whole catalog, not just what we created
      const response = await fetch('/api/products'); 
      const data = await response.json();
      
      if (data.products) {
        const productsData = data.products.map(product => ({
          ...product,
          id: product._id.toString(),
        }));
        setProducts(productsData);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  // Filter products
  const filteredProducts = products.filter(product => {
    const matchesSearch = (product.title || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (product.shortDescription || '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // 3. Loading State (Auth or Data)
  if (authLoading || (loading && user)) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-16">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mb-4"></div>
          <p className="text-xl text-gray-600">Loading catalog...</p>
        </div>
      </div>
    );
  }

  // 4. Protect the Page (Redirect or Show Login Msg)
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-16">
        <div className="text-center">
          <div className="text-6xl mb-4">🔒</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Login Required</h2>
          <p className="text-gray-600 mb-6">You must be logged in to view our products.</p>
          <Link href="/login" className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition">
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  // 5. Show the Products
  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Winter Dog Care Catalog
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Welcome back, {user.displayName || user.email}!
          </p>
        </div>

        {/* Search/Filter Bar */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <div className="grid md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 border text-gray-900 border-gray-300 rounded-lg"
            />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-4 py-3 border text-gray-900 border-gray-300 rounded-lg"
            >
              <option value="all">All Categories</option>
              <option value="Clothing">Clothing</option>
              <option value="Accessories">Accessories</option>
              <option value="Nutrition">Nutrition</option>
              <option value="Bedding">Bedding</option>
              <option value="Toys">Toys</option>
            </select>
          </div>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        
        {filteredProducts.length === 0 && (
          <p className="text-center text-gray-500">No products found.</p>
        )}
      </div>
    </div>
  );
}