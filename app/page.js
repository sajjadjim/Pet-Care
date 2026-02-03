'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

const gradientColors = [
  'from-blue-400 to-blue-600',
  'from-purple-400 to-purple-600',
  'from-green-400 to-green-600',
  'from-pink-400 to-pink-600',
  'from-yellow-400 to-yellow-600',
  'from-red-400 to-red-600',
  'from-indigo-400 to-indigo-600',
  'from-teal-400 to-teal-600',
  'from-orange-400 to-orange-600',
  'from-cyan-400 to-cyan-600'
];

export default function Home() {
   const [data, setData] = useState({ section: {}, products: [] });
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => {
        setData(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="py-20 text-center">Loading...</div>;
  }

  return (
    <div className="pt-16">
      {/* 1. HERO SECTION */}
      <section className="relative bg-gradient-to-br from-blue-50 to-blue-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
                Keep Your Dog <span className="text-blue-600">Warm & Happy</span> This Winter
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Premium winter care products designed to protect your furry friends from harsh cold weather.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/products"
                  className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition text-center"
                >
                  Shop Now 🛒
                </Link>
                <Link
                  href="#about"
                  className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-50 transition text-center"
                >
                  Learn More
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="bg-white rounded-2xl shadow-2xl p-8 transform hover:scale-105 transition duration-300">
                <div className="text-9xl text-center mb-4">🐕‍🦺</div>
                <p className="text-center text-gray-600 text-lg">Trusted by 10,000+ Pet Parents</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. FEATURES SECTION */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose Us?</h2>
            <p className="text-xl text-gray-600">Everything your dog needs for a cozy winter</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-blue-50 rounded-xl p-8 hover:shadow-xl transition transform hover:-translate-y-2">
              <div className="text-6xl mb-4">🧥</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Premium Quality</h3>
              <p className="text-gray-600">
                High-quality materials that provide maximum warmth and comfort for your pets.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-blue-50 rounded-xl p-8 hover:shadow-xl transition transform hover:-translate-y-2">
              <div className="text-6xl mb-4">🏆</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Vet Approved</h3>
              <p className="text-gray-600">
                All products are tested and recommended by professional veterinarians.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-blue-50 rounded-xl p-8 hover:shadow-xl transition transform hover:-translate-y-2">
              <div className="text-6xl mb-4">🚚</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Fast Delivery</h3>
              <p className="text-gray-600">
                Free shipping on orders over $50. Get your products delivered in 2-3 days.
              </p>
            </div>
          </div>
        </div>
      </section>
{/* popular products  */}
      <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Popular Products
          </h2>
          <p className="text-xl text-gray-600">
            Best sellers this winter season
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {(data.products || []).slice(0, 3).map((product, index) => (
             <div 
                key={product._id || index}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition transform hover:-translate-y-2"
              >
                <div className={`h-48 bg-gradient-to-br ${product.gradient || gradientColors[index % gradientColors.length]} flex items-center justify-center text-8xl`}>
                  {product.emoji}
                </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold text-gray-900">
                    {product.title}
                  </h3>
                  <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                    {product.category}
                  </span>
                </div>
                <p className="text-gray-600 mb-4">
                  {product.shortDescriptio}
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-blue-600">
                    ${product.price}
                  </span>
                  {/* LINK TO DYNAMIC ID PAGE */}
                    <Link 
                      href={`/products/${product._id}`} 
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                    >
                      View
                    </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
            <Link
              href="/products"
              className="inline-block bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition"
            >
              View All Products →
            </Link>
        </div>
      </div>
    </section>
      {/* 4. TESTIMONIALS SECTION */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">What Pet Parents Say</h2>
            <p className="text-xl text-gray-600">Real reviews from happy customers</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-blue-50 rounded-xl p-8 hover:shadow-xl transition">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white text-xl font-bold">
                  S
                </div>
                <div className="ml-4">
                  <h4 className="font-bold text-gray-900">Sarah Johnson</h4>
                  <div className="text-yellow-500">⭐⭐⭐⭐⭐</div>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "The winter coat is amazing! My Golden Retriever loves wearing it and stays warm during our morning walks."
              </p>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-blue-50 rounded-xl p-8 hover:shadow-xl transition">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-white text-xl font-bold">
                  M
                </div>
                <div className="ml-4">
                  <h4 className="font-bold text-gray-900">Mike Chen</h4>
                  <div className="text-yellow-500">⭐⭐⭐⭐⭐</div>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "Finally found boots that actually stay on! Great quality and my husky can run comfortably in the snow."
              </p>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-blue-50 rounded-xl p-8 hover:shadow-xl transition">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center text-white text-xl font-bold">
                  E
                </div>
                <div className="ml-4">
                  <h4 className="font-bold text-gray-900">Emily Rodriguez</h4>
                  <div className="text-yellow-500">⭐⭐⭐⭐⭐</div>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "Best investment for winter! The nutrition pack has really helped my senior dog maintain energy levels."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. WINTER CARE TIPS SECTION */}
      <section className="py-20 bg-gradient-to-br from-blue-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Winter Care Tips</h2>
            <p className="text-xl text-blue-100">Essential advice for keeping your dog safe and healthy</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/20 transition">
              <div className="text-4xl mb-3">❄️</div>
              <h3 className="text-xl font-bold mb-2">Limit Outdoor Time</h3>
              <p className="text-blue-100 text-sm">Keep walks shorter during extreme cold weather.</p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/20 transition">
              <div className="text-4xl mb-3">🐾</div>
              <h3 className="text-xl font-bold mb-2">Check Paws Often</h3>
              <p className="text-blue-100 text-sm">Look for cracks, ice buildup between paw pads.</p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/20 transition">
              <div className="text-4xl mb-3">💧</div>
              <h3 className="text-xl font-bold mb-2">Stay Hydrated</h3>
              <p className="text-blue-100 text-sm">Dogs need water in winter just as much as summer.</p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/20 transition">
              <div className="text-4xl mb-3">🏠</div>
              <h3 className="text-xl font-bold mb-2">Warm Shelter</h3>
              <p className="text-blue-100 text-sm">Provide a cozy, draft-free sleeping area indoors.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. ABOUT US SECTION */}
      <section id="about" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">About WinterDogCare</h2>
              <p className="text-lg text-gray-600 mb-4">
                Founded in 2020, we're passionate about keeping dogs safe, warm, and happy during the cold winter months.
              </p>
              <p className="text-lg text-gray-600 mb-4">
                Our team of pet care experts and veterinarians carefully curate each product to ensure the highest quality and safety standards.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                With over 10,000 satisfied customers and counting, we're proud to be your trusted partner in winter dog care.
              </p>
              <div className="flex gap-8">
                <div>
                  <div className="text-4xl font-bold text-blue-600">10K+</div>
                  <div className="text-gray-600">Happy Customers</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-blue-600">50+</div>
                  <div className="text-gray-600">Premium Products</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-blue-600">100%</div>
                  <div className="text-gray-600">Satisfaction Rate</div>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl p-12 text-center">
              <div className="text-9xl mb-4">🐕</div>
              <p className="text-white text-xl font-semibold">Your Dog's Winter Wellness Matters to Us</p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. CONTACT/CTA SECTION */}
      <section id="contact" className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">Ready to Keep Your Dog Warm?</h2>
          <p className="text-xl text-gray-600 mb-8">
            Join thousands of pet parents who trust us for their winter dog care needs.
          </p>

          <div className="bg-blue-50 rounded-2xl p-8 mb-8">
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div>
                <div className="text-3xl mb-2">📧</div>
                <div className="font-semibold text-gray-900">Email Us</div>
                <div className="text-gray-600">support@winterdogcare.com</div>
              </div>
              <div>
                <div className="text-3xl mb-2">📞</div>
                <div className="font-semibold text-gray-900">Call Us</div>
                <div className="text-gray-600">1-800-DOG-CARE</div>
              </div>
              <div>
                <div className="text-3xl mb-2">💬</div>
                <div className="font-semibold text-gray-900">Live Chat</div>
                <div className="text-gray-600">Available 24/7</div>
              </div>
            </div>
          </div>

          <Link
            href="/products"
            className="inline-block bg-blue-600 text-white px-12 py-5 rounded-lg text-xl font-semibold hover:bg-blue-700 transition transform hover:scale-105"
          >
            Start Shopping Now 🛒
          </Link>

          <p className="mt-6 text-gray-500">Free shipping on orders over $50 • 30-day money-back guarantee</p>
        </div>
      </section>
    </div>
  );
}