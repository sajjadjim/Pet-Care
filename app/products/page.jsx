'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext'; 
import ProductCard from '@/components/ProductCard'; 

// --- SKELETON COMPONENT (Defined here to fix your error) ---
const ProductSkeleton = () => (
  <div className="bg-white rounded-3xl p-4 h-[380px] border border-gray-100 flex flex-col shadow-sm">
    <div className="h-48 w-full bg-gray-200 rounded-2xl animate-pulse mb-6 flex items-center justify-center">
      <span className="text-4xl opacity-20">🐾</span>
    </div>
    <div className="px-2 space-y-4 flex-grow">
      <div className="flex justify-between">
        <div className="h-6 w-2/3 bg-gray-200 rounded-lg animate-pulse"></div>
        <div className="h-4 w-10 bg-gray-100 rounded-md animate-pulse"></div>
      </div>
      <div className="h-4 w-full bg-gray-100 rounded-lg animate-pulse"></div>
      <div className="pt-4 mt-auto flex justify-between items-center border-t border-gray-50">
        <div className="h-8 w-16 bg-gray-200 rounded-lg animate-pulse"></div>
        <div className="h-10 w-24 bg-blue-600/10 rounded-xl animate-pulse"></div>
      </div>
    </div>
  </div>
);

const CATEGORIES = ['all', 'Clothing', 'Accessories', 'Nutrition', 'Bedding', 'Toys'];

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const { user, loading: authLoading } = useAuth();

  useEffect(() => {
    if (user) fetchProducts();
  }, [user]);

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/products'); 
      const data = await response.json();
      if (data.success) setProducts(data.products);
    } catch (error) {
      console.error('Fetch error:', error);
    } finally {
      setLoading(false);
    }
  };

  const filtered = products.filter(p => {
    const matchesSearch = p.title?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat = selectedCategory === 'all' || p.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="min-h-screen bg-[#F8FAFC] pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header Section */}
        <header className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="text-5xl font-black text-gray-900 mb-2 tracking-tight">
              Pet Care Store
            </h1>
            <div className="flex items-center gap-2">
              <span className="text-gray-500 font-medium">
                {authLoading || loading ? (
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-blue-600 rounded-full animate-ping"></span>
                    Sniffing for the best deals...
                  </span>
                ) : (
                  `Welcome back, ${user?.displayName || 'Pet Lover'}! 🐾`
                )}
              </span>
            </div>
          </div>
        </header>

        {/* Search & Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-12">
          <div className="relative flex-grow group">
             <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl">🔍</span>
             <input 
                type="text" 
                placeholder="Search items..." 
                className="w-full p-4 pl-12 rounded-2xl border-none shadow-sm focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white transition-all outline-none"
                onChange={(e) => setSearchTerm(e.target.value)}
              />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {CATEGORIES.map(cat => (
              <button 
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-6 py-3 rounded-xl font-bold whitespace-nowrap transition-all duration-300 ${
                  selectedCategory === cat 
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-200 -translate-y-1' 
                  : 'bg-white text-gray-500 hover:bg-gray-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid / Skeleton Loading */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {authLoading || loading ? (
            // Show 8 Skeletons using the defined component above
            [...Array(8)].map((_, i) => <ProductSkeleton key={i} />)
          ) : filtered.length > 0 ? (
            // Show Actual Products
            filtered.map(p => <ProductCard key={p._id} product={p} />)
          ) : (
            // Empty State
            <div className="col-span-full py-20 text-center bg-white rounded-[40px] border-2 border-dashed border-gray-200">
              <div className="text-6xl mb-4 animate-bounce">🦴</div>
              <h3 className="text-2xl font-bold text-gray-800">No treats found!</h3>
              <p className="text-gray-500 mt-2">Try a different category or search term.</p>
              <button 
                onClick={() => {setSearchTerm(''); setSelectedCategory('all');}}
                className="mt-6 text-blue-600 font-bold hover:underline"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}