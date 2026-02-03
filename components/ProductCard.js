'use client'; // Add this at the top

import Link from 'next/link';

export default function ProductCard({ product }) {
  const emojis = ['🧥', '🐾', '🍖', '🦴', '🥾', '🧤', '🧣', '🎒'];
  const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
  
  // Get ID (try both formats)
  const productId = product._id || product.id;

  // DEBUG: Check console to see if ID is printing
  console.log("Product:", product.title, "ID:", productId);

  if (!productId) {
    return <div className="bg-red-100 p-4">Error: Missing Product ID</div>;
  }

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition transform hover:-translate-y-2">
      <div className={`h-48 bg-gradient-to-br ${product.gradient || 'from-blue-400 to-blue-600'} flex items-center justify-center text-8xl`}>
        {product.emoji || randomEmoji}
      </div>
     <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold text-gray-900">{product.title}</h3>
          <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
            {product.category}
          </span>
        </div>
        <p className="text-gray-600 mb-4 line-clamp-2">
          {product.shortDescription}
        </p>
        <div className="flex justify-between items-center">
          <span className="text-2xl font-bold text-blue-600">${product.price}</span>
          
          {/* LINK TO DETAIL PAGE */}
          <Link 
            href={`/products/${productId}`}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Details
          </Link>
        </div>
      </div>
    </div>
  );
}