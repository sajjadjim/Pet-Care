'use client';
import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';

export default function Details({ params }) {
  const { id } = use(params);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetch(`/api/products/${id}`)
      .then(res => res.json())
      .then(data => {
        if (data.success) setProduct(data.product);
        setLoading(false);
      });
  }, [id]);

if (loading) {
  return (
    <div className="min-h-screen bg-gray-50 pt-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Skeleton */}
        <div className="mb-10 space-y-3">
          <div className="h-12 w-64 bg-gray-200 rounded-2xl animate-pulse"></div>
          <div className="h-4 w-48 bg-gray-200 rounded-lg animate-pulse"></div>
        </div>

        {/* Filter Skeleton */}
        <div className="flex gap-4 mb-10 overflow-hidden">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-12 w-24 bg-gray-200 rounded-xl animate-pulse flex-shrink-0"></div>
          ))}
        </div>

        {/* Grid Skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="bg-white rounded-3xl p-4 h-80 border border-gray-100 space-y-4">
              <div className="h-40 w-full bg-gray-100 rounded-2xl animate-pulse"></div>
              <div className="h-6 w-3/4 bg-gray-100 rounded-lg animate-pulse"></div>
              <div className="h-10 w-full bg-gray-100 rounded-xl animate-pulse mt-auto"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
  if (!product) return <div className="p-20 text-center text-red-500 font-bold">Product not found!</div>;

  return (
    <div className="min-h-screen bg-white pt-24 px-6">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <div className={`h-[500px] rounded-[40px] bg-gradient-to-br ${product.gradient} flex items-center justify-center text-[200px] shadow-2xl`}>
          {product.emoji}
        </div>
        <div>
          <span className="text-blue-600 font-black uppercase tracking-widest">{product.category}</span>
          <h1 className="text-5xl font-black text-gray-900 mt-2 mb-6">{product.title}</h1>
          <p className="text-gray-500 text-xl leading-relaxed mb-8">{product.fullDescription || product.shortDescription}</p>
          <div className="text-5xl font-black text-gray-900 mb-10">${product.price}</div>
          <button className="w-full bg-blue-600 text-white py-5 rounded-2xl text-xl font-bold shadow-xl shadow-blue-100 hover:bg-blue-700 transition">
            Add to Cart 🛒
          </button>
        </div>
      </div>
    </div>
  );
}