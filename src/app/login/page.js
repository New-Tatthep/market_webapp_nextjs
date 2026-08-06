// src/app/login/page.js
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    force_login: false,
  });
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({
      ...formData,
      [e.target.name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');

    try {
      const payload = {
        username: formData.username,
        password: formData.password,
        ip_address: '',
        user_agent: typeof window !== 'undefined' ? navigator.userAgent : '',
        machine_id: '',
        force_login: formData.force_login,
      };

      const response = await fetch('http://localhost:5001/market-service/v1/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok || result.status_code !== 200) {
        throw new Error(result.message || 'Invalid username or password.');
      }

      const loginData = result.data?.data || result.data;
      const token = loginData?.token;

      if (!token) {
        throw new Error('Authentication token not found in response.');
      }

      const profileImage = loginData.profile_image || loginData.user_profile?.profile_image || '';

      localStorage.setItem('market_token', token);
      localStorage.setItem('market_username', formData.username);
      localStorage.setItem('market_avatar', profileImage);
      
      if (loginData.subscribe_channel) {
        localStorage.setItem('subscribe_channel', loginData.subscribe_channel);
      }

      window.dispatchEvent(new Event('auth-change'));

      router.push('/');
      
    } catch (err) {
      console.error('Login error:', err);
      setErrorMessage(err.message || 'Failed to sign in. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF9F5] flex flex-col justify-center py-12 px-6 lg:px-8">
      
      {/* Brand Header */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Link href="/" className="inline-block">
          <span className="text-2xl font-normal tracking-[0.3em] uppercase text-zinc-900">
            TT<span className="text-amber-700">.</span>
          </span>
        </Link>
        <h2 className="mt-6 text-2xl font-light tracking-tight text-zinc-900">
          Welcome back
        </h2>
        <p className="text-xs font-light text-zinc-500 mt-2">
          Please enter your details to sign in.
        </p>
      </div>

      {/* Form Container */}
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white/85 backdrop-blur-xl py-10 px-6 shadow-sm border border-stone-200/60 rounded-3xl sm:px-10">
          
          {errorMessage && (
            <div className="mb-6 p-3 bg-rose-50 border border-rose-100 text-rose-600 text-xs font-light rounded-2xl text-center">
              {errorMessage}
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-[11px] font-light uppercase tracking-widest text-zinc-700 mb-2">
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                required
                value={formData.username}
                onChange={handleChange}
                className="w-full px-4 py-3 text-sm text-zinc-900 bg-stone-50/50 border border-stone-200 rounded-2xl focus:outline-none focus:border-zinc-400 focus:bg-white transition-all"
                placeholder="Enter your username"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-[11px] font-light uppercase tracking-widest text-zinc-700">
                  Password
                </label>
              </div>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-3 text-sm text-zinc-900 bg-stone-50/50 border border-stone-200 rounded-2xl focus:outline-none focus:border-zinc-400 focus:bg-white transition-all"
                placeholder="••••••••"
              />
            </div>

            {/* Force Login Option */}
            <div className="flex items-center">
              <input
                id="force_login"
                name="force_login"
                type="checkbox"
                checked={formData.force_login}
                onChange={handleChange}
                className="h-4 w-4 rounded border-stone-300 text-zinc-900 focus:ring-zinc-900 cursor-pointer"
              />
              <label htmlFor="force_login" className="ml-2 block text-xs font-light text-zinc-600 cursor-pointer">
                Force login (Sign out other devices)
              </label>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 px-4 bg-zinc-900 text-white text-xs font-medium uppercase tracking-widest rounded-full hover:bg-zinc-800 focus:outline-none transition-all shadow-sm disabled:opacity-50"
              >
                {loading ? 'Signing in...' : 'Sign In'}
              </button>
            </div>
          </form>

          {/* Footer link inside card */}
          <div className="mt-8 text-center flex items-center justify-between text-xs font-light text-zinc-500">
            <Link href="/" className="hover:text-zinc-900 transition-colors">
              ← Storefront
            </Link>
            <Link href="/register" className="font-medium text-zinc-900 hover:text-amber-700 transition-colors">
              Create account
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}