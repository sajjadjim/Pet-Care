'use client';
import Link from 'next/link';

export default function ProductCard({ product }) {
  const productId = product._id?.toString() || product.id;

  return (
    <div className="bg-white rounded-3xl shadow-sm hover:shadow-2xl transition-all border border-gray-100 overflow-hidden flex flex-col">
      <div className={`h-48 bg-gradient-to-br ${product.gradient || 'from-blue-400 to-blue-600'} flex items-center justify-center text-7xl`}>
        {product.emoji || '🐾'}
      </div>
      <div className="p-6 flex-grow flex flex-col">
        <div className="flex justify-between items-start mb-4">
          <h3 className="font-bold text-gray-900 text-lg leading-tight">{product.title}</h3>
          <span className="text-[10px] bg-blue-50 text-blue-600 px-2 py-1 rounded-md font-black uppercase">{product.category}</span>
        </div>
        <div className="mt-auto flex justify-between items-center">
          <span className="text-2xl font-black text-gray-900">${product.price}</span>
          <Link href={`/products/${productId}`} className="bg-gray-900 text-white px-5 py-2 rounded-xl font-bold hover:bg-blue-600 transition">
            Details
          </Link>
        </div>
      </div>
    </div>
  );
}