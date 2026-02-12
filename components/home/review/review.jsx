// src/components/Testimonials.tsx
const testimonials = [
  {
    initial: "S",
    name: "Sarah Johnson",
    color: "bg-pink-600",
    rate: "⭐⭐⭐⭐⭐",
    text: "The winter coat is amazing! My Golden Retriever loves wearing it and stays warm during our morning walks.",
  },
  {
    initial: "M",
    name: "Mike Chen",
    color: "bg-purple-600",
    rate: "⭐⭐⭐⭐",
    text: "Finally found boots that actually stay on! Great quality and my husky can run comfortably in the snow.",
  },
  {
    initial: "E",
    name: "Emily Rodriguez",
    color: "bg-green-600",
    rate: "⭐⭐⭐⭐⭐",
    text: "Best investment for winter! The nutrition pack has really helped my birds maintain energy levels.",
  },
    {
    initial: "E",
    name: "Emily Rodriguez",
    color: "bg-green-600",
    rate: "⭐⭐⭐⭐",
    text: "Best investment for winter! The nutrition pack has really helped my senior cat maintain energy levels.",
  },
];

export default function Review() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">What People Say</h2>
          <p className="text-xl text-gray-600">Real reviews from happy customers</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((item, index) => (
            <div key={index} className="bg-pink-100 rounded-xl p-8 hover:shadow-xl transition">
              <div className="flex items-center mb-4">
                <div className={`w-12 h-12 ${item.color} rounded-full flex items-center justify-center text-white text-xl font-bold`}>
                  {item.initial}
                </div>
                <div className="ml-4">
                  <h4 className="font-bold text-gray-900">{item.name}</h4>
                  <div className="text-yellow-500">{item.rate}</div>
                </div>
              </div>
              <p className="text-gray-600 italic">`{item.text}`</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}