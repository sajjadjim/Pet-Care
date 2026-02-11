'use client';

import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

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
            <div key={i} className="h-12 w-24 bg-gray-200 rounded-xl animate-pulse shrink-0"></div>
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
}

  if (!user) {
    return null;
  }

  return <>{children}</>;
}