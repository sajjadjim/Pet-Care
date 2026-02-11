export default function ProductSkeleton() {
  return (
    <div className="bg-white rounded-3xl p-4 h-[380px] border border-gray-100 flex flex-col shadow-sm">
      {/* Image Area Skeleton */}
      <div className="h-48 w-full bg-gray-200 rounded-2xl animate-pulse mb-6 flex items-center justify-center">
        <span className="text-4xl opacity-20">🐾</span>
      </div>
      
      {/* Content Skeletons */}
      <div className="px-2 space-y-4 flex-grow">
        <div className="flex justify-between items-start">
          <div className="h-6 w-2/3 bg-gray-200 rounded-lg animate-pulse"></div>
          <div className="h-4 w-12 bg-gray-100 rounded-md animate-pulse"></div>
        </div>
        <div className="h-4 w-full bg-gray-100 rounded-lg animate-pulse"></div>
        
        {/* Price and Button Area */}
        <div className="pt-4 mt-auto flex justify-between items-center border-t border-gray-50">
          <div className="h-8 w-20 bg-gray-200 rounded-lg animate-pulse"></div>
          <div className="h-10 w-24 bg-gray-900/10 rounded-xl animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}