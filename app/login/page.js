'use client';

import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function LoginPage() {
const { user, signInWithGoogle, signInWithEmail, signUpWithEmail, loading } = useAuth();
  const router = useRouter();



const [isSignUp, setIsSignUp] = useState(false);
const [formData, setFormData] = useState({
  email: '',
  password: '',
  displayName: ''
});
const [formLoading, setFormLoading] = useState(false);
const [error, setError] = useState('');



  useEffect(() => {
    if (user) {
      router.push('/');
    }
  }, [user, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl">Loading...</div>
      </div>
    );
  }


  const handleInputChange = (e) => {
  setFormData({
    ...formData,
    [e.target.name]: e.target.value
  });
  setError(''); // Clear error when typing
};

const handleEmailAuth = async (e) => {
  e.preventDefault();
  setFormLoading(true);
  setError('');

  // Validation
  if (!formData.email || !formData.password) {
    setError('Please fill in all fields');
    setFormLoading(false);
    return;
  }

  if (formData.password.length < 6) {
    setError('Password must be at least 6 characters');
    setFormLoading(false);
    return;
  }

  if (isSignUp && !formData.displayName) {
    setError('Please enter your name');
    setFormLoading(false);
    return;
  }

  try {
    let result;
    if (isSignUp) {
      result = await signUpWithEmail(formData.email, formData.password, formData.displayName);
    } else {
      result = await signInWithEmail(formData.email, formData.password);
    }

    if (result.success) {
      router.push('/');
    } else {
      setError(result.error || 'Authentication failed');
    }
  } catch (err) {
    setError('Something went wrong. Please try again.');
  } finally {
    setFormLoading(false);
  }
};

const toggleMode = () => {
  setIsSignUp(!isSignUp);
  setError('');
  setFormData({ email: '', password: '', displayName: '' });
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 px-4 pt-16">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="text-6xl mb-4">🐕</div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back!</h2>
            <p className="text-gray-600">Sign in to manage your winter dog care products</p>
          </div>

          {/* Google Sign In Button */}
          <button
            onClick={signInWithGoogle}
            className="w-full bg-white border-2 border-gray-300 text-gray-700 px-6 py-4 rounded-lg font-semibold hover:bg-gray-50 transition flex items-center justify-center gap-3 mb-4"
          >
            <svg className="w-6 h-6" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continue with Google
          </button>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500">Or sign in with email</span>
            </div>
          </div>

         {/* Email/Password Form (NOW ACTIVE) */}
<form onSubmit={handleEmailAuth} className="space-y-4">
  {/* Show error message */}
  {error && (
    <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
      {error}
    </div>
  )}

  {/* Name field (only for sign up) */}
  {isSignUp && (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Full Name
      </label>
      <input
        type="text"
        name="displayName"
        value={formData.displayName}
        onChange={handleInputChange}
        className="w-full text-gray-900 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        placeholder="John Doe"
        required
      />
    </div>
  )}

  {/* Email field */}
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-2">
      Email Address
    </label>
    <input
      type="email"
      name="email"
      value={formData.email}
      onChange={handleInputChange}
      className="w-full text-gray-900 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      placeholder="you@example.com"
      required
    />
  </div>

  {/* Password field */}
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-2">
      Password
    </label>
    <input
      type="password"
      name="password"
      value={formData.password}
      onChange={handleInputChange}
      className="w-full text-gray-900 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      placeholder="••••••••"
      minLength={6}
      required
    />
    {isSignUp && (
      <p className="text-xs text-gray-500 mt-1">At least 6 characters</p>
    )}
  </div>

  {/* Submit button */}
  <button
    type="submit"
    disabled={formLoading}
    className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition disabled:bg-blue-300 disabled:cursor-not-allowed"
  >
    {formLoading ? (
      <span className="flex items-center justify-center">
        <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
        {isSignUp ? 'Creating Account...' : 'Signing In...'}
      </span>
    ) : (
      isSignUp ? 'Create Account' : 'Sign In with Email'
    )}
  </button>
</form>

          {/* Footer */}
        <div className="mt-6 text-center text-sm text-gray-600">
  <p>
    {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
    <button
      type="button"
      onClick={toggleMode}
      className="text-blue-600 hover:text-blue-700 font-semibold"
    >
      {isSignUp ? 'Sign In' : 'Sign Up'}
    </button>
  </p>
</div>

        </div>

        {/* Back to Home */}
        <div className="text-center mt-6">
          <button
            onClick={() => router.push('/')}
            className="text-blue-600 hover:text-blue-700 font-semibold"
          >
            ← Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}