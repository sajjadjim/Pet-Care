'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { FaHome , FaProductHunt , FaPhoneSquareAlt } from "react-icons/fa";
import { IoInformationCircle } from "react-icons/io5";

export default function Navbar() {
  const { user, signOut } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSignOut = async () => {
    await signOut();
    router.push('/');
  };

  return (
    <nav className={`fixed w-full top-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white shadow-lg' : 'bg-white/95 backdrop-blur-sm'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl">🐕</span>
            <span className="text-xl font-bold text-pink-600">Pet Care</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="group text-gray-700 border-2 border-gray-100  rounded-lg px-3 py-1.5 shadow-sm flex items-center space-x-1 hover:text-pink-600 hover:border-pink-500 transition">
             <FaHome className='group-hover:scale-105 transition-transform'></FaHome> <span>Home</span>
            </Link>
            <Link href="/products" className="group text-gray-700 border-2 border-gray-100  rounded-lg px-3 py-1.5 shadow-sm flex items-center space-x-1 hover:text-pink-600 hover:border-pink-500 transition">
             <FaProductHunt></FaProductHunt> <span>Products</span>
            </Link>
            <Link href="/#about" className="group text-gray-700 border-2 border-gray-100  rounded-lg px-3 py-1.5 shadow-sm flex items-center space-x-1 hover:text-pink-600 hover:border-pink-500 transition">
             <IoInformationCircle></IoInformationCircle> <span>About</span>
            </Link>
            <Link href="/#contact" className="group text-gray-700 border-2 border-gray-100  rounded-lg px-3 py-1.5 shadow-sm flex items-center space-x-1 hover:text-pink-600 hover:border-pink-500 transition">
             <FaPhoneSquareAlt></FaPhoneSquareAlt> <span>Contact</span>
            </Link>

            {/* Auth Section */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center space-x-2 bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-700 transition"
                >
                  <img 
                    src={user.photoURL || '/default-avatar.png'} 
                    alt="Profile" 
                    className="w-8 h-8 rounded-full"
                  />
                  <span className="text-sm">{user.displayName?.split(' ')[0]}</span>
                </button>

                {/* Dropdown */}
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl py-2 border">
                    <div className="px-4 py-2 border-b">
                      <p className="text-sm font-semibold text-gray-900">{user.displayName}</p>
                      <p className="text-xs text-gray-500 truncate">{user.email}</p>
                    </div>
                    <Link
                      href="/add-product"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-pink-50 transition"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      ➕ Add Product
                    </Link>
                    <Link
                      href="/manage-products"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-pink-50 transition"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      📦 Manage Products
                    </Link>
                    <button
                      onClick={handleSignOut}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition"
                    >
                      🚪 Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                href="/login"
                className="bg-pink-600 text-white px-6 py-2 rounded-lg hover:bg-pink-500 transition"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-gray-700"
          >
            <svg className="w-6 h-6 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 grid gap-2 border-t">
            <Link href="/" className="group gap-3 text-gray-700 border-2 border-gray-100  rounded-lg px-3 py-1.5 shadow-sm flex items-center space-x-1  hover:border-none hover:bg-pink-500 hover:text-white transition">
            <FaHome className='group-hover:scale-105 transition-transform'></FaHome>  Home
            </Link>
            <Link href="/products" className="group gap-3 text-gray-700 border-2 border-gray-100  rounded-lg px-3 py-1.5 shadow-sm flex items-center space-x-1 hover:bg-pink-500 hover:text-white transition">
             <FaProductHunt></FaProductHunt>  Products
            </Link>
            <Link href="/#about" className="group gap-3 text-gray-700 border-2 border-gray-100  rounded-lg px-3 py-1.5 shadow-sm flex items-center space-x-1 hover:bg-pink-500 hover:text-white transition">
            <IoInformationCircle></IoInformationCircle>   About
            </Link>
            <Link href="/#contact" className="group gap-3 text-gray-700 border-2 border-gray-100  rounded-lg px-3 py-1.5 shadow-sm flex items-center space-x-1 hover:bg-pink-500 hover:text-white transition">
              <FaPhoneSquareAlt></FaPhoneSquareAlt>   Contact
            </Link>
            {user ? (
              <>
               <div className='flex justify-center gap-2 mt-2'>
                 <Link href="/add-product" className="group text-gray-700 border-2 border-gray-100  rounded-lg px-3 py-1.5 shadow-sm flex items-center space-x-1 hover:text-pink-600 hover:border-pink-500 transition">
                  Add Product
                </Link>
                <Link href="/manage-products" className="group text-gray-700 border-2 border-gray-100  rounded-lg px-3 py-1.5 shadow-sm flex items-center space-x-1 hover:text-pink-600 hover:border-pink-500 transition">
                  Manage Products
                </Link>
               </div>
               <div className='grid justify-center mt-2'>
                <button onClick={handleSignOut} className="group mt-2  cursor-pointer text-red-600 border-2 border-red-100  rounded-lg px-3 py-1.5 shadow-sm flex items-center space-x-1 hover:text-red-600 hover:border-red-500 transition">
                  Sign Out
                </button>
               </div>
              </>
            ) : (
              <Link href="/login" className="group text-blue-600 border-2 border-blue-100  rounded-lg px-3 py-1.5 shadow-sm flex items-center space-x-1 hover:text-blue-600 hover:border-blue-500 transition">
                Login
              </Link>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}