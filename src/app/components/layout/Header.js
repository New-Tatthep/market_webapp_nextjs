// src/app/components/layout/Header.js
'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Header() {
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileDropdown, setProfileDropdown] = useState(false);
  
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userAvatar, setUserAvatar] = useState('');
  const [loadingLogout, setLoadingLogout] = useState(false);
  
  const dropdownRef = useRef(null);
  const cartCount = 2;

  const checkAuthStatus = () => {
    const token = localStorage.getItem('market_token');
    const avatar = localStorage.getItem('market_avatar') || '';
    
    if (token) {
      setIsLoggedIn(true);
      setUserAvatar(avatar);
    } else {
      setIsLoggedIn(false);
      setUserAvatar('');
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);

    checkAuthStatus();
    window.addEventListener('auth-change', checkAuthStatus);

    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setProfileDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('auth-change', checkAuthStatus);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    try {
      setLoadingLogout(true);
      const token = localStorage.getItem('market_token');

      const payload = {
        ip_address: '',
        user_agent: typeof window !== 'undefined' ? navigator.userAgent : '',
      };

      const response = await fetch('/api/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { 'x-auth-token': token } : {}),
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (response.ok && result.status_code === 200 && result.message === 'success') {
        localStorage.removeItem('market_token');
        localStorage.removeItem('market_username');
        localStorage.removeItem('market_avatar');
        localStorage.removeItem('subscribe_channel');
        
        setIsLoggedIn(false);
        setUserAvatar('');
        setProfileDropdown(false);
        window.dispatchEvent(new Event('auth-change'));
        router.push('/'); 
      } else {
        console.error('Logout failed:', result.message);
      }
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      setLoadingLogout(false);
    }
  };

  return (
    <header className={`sticky top-0 z-50 transition-all duration-500 mx-4 lg:mx-12 mt-4`}>
      <div className={`mx-auto transition-all duration-500 rounded-full px-8 py-4 flex items-center justify-between ${
        scrolled 
          ? 'bg-white/90 backdrop-blur-2xl shadow-sm border border-stone-200/50' 
          : 'bg-white/60 backdrop-blur-xl border border-stone-200/30'
      }`}>

        {/* Left: Navigation Menu */}
        <nav className="hidden md:flex items-center gap-8">
          <Link href="/products" className="text-[11px] font-light uppercase tracking-[0.2em] text-zinc-600 hover:text-zinc-900 transition-colors">
            Catalog
          </Link>
          <Link href="/categories" className="text-[11px] font-light uppercase tracking-[0.2em] text-zinc-600 hover:text-zinc-900 transition-colors">
            Collections
          </Link>
        </nav>

        {/* Mobile Toggle Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-zinc-900 focus:outline-none p-1"
        >
          <span className="text-xs uppercase tracking-widest font-light">Menu</span>
        </button>

        {/* Center: Brand Logo TT */}
        <Link href="/" className="absolute left-1/2 -translate-x-1/2 flex items-center">
          <span className="text-xl font-normal tracking-[0.3em] uppercase text-zinc-900">
            TT<span className="text-amber-700">.</span>
          </span>
        </Link>

        {/* Right: Actions (Cart & Auth) */}
        <div className="flex items-center gap-4 sm:gap-6">
          <Link href="/cart" className="relative text-zinc-900 hover:text-amber-700 transition-colors flex items-center gap-1.5">
            <span className="text-sm">🛒</span>
            <span className="text-[11px] font-light hidden sm:inline">Cart</span>
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-amber-700 text-white text-[9px] font-medium rounded-full h-4 w-4 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>

          <div className="hidden sm:block h-3 w-[1px] bg-stone-300" />

          {/* ตรวจสอบสถานะการล็อกอิน: แสดง Avatar หรือปุ่ม Sign In */}
          {isLoggedIn ? (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setProfileDropdown(!profileDropdown)}
                className="w-10 h-10 rounded-full overflow-hidden border border-stone-300 bg-stone-100 text-zinc-600 flex items-center justify-center hover:opacity-90 transition-all shadow-sm focus:outline-none"
              >
                {userAvatar ? (
                  <img src={userAvatar} alt="User Avatar" className="w-full h-full object-cover" />
                ) : (
                  /* Unknown Avatar (SVG ไอคอนรูปคน) */
                  <svg className="w-5 h-5 text-stone-500" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                  </svg>
                )}
              </button>

              {/* Profile Dropdown Menu */}
              {profileDropdown && (
                <div className="absolute right-0 mt-3 w-48 bg-white/95 backdrop-blur-2xl border border-stone-200/80 rounded-2xl shadow-xl py-2 animate-in fade-in duration-200">
                  <div className="px-4 py-2 border-b border-stone-100">
                    <p className="text-[10px] uppercase tracking-wider text-stone-400">Signed in as</p>
                    <p className="text-xs font-medium text-zinc-900 truncate">Active Session</p>
                  </div>
                  <Link 
                    href="/profile" 
                    onClick={() => setProfileDropdown(false)}
                    className="block px-4 py-2 text-xs font-light text-zinc-700 hover:bg-stone-50 transition-colors"
                  >
                    My Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    disabled={loadingLogout}
                    className="w-full text-left px-4 py-2 text-xs font-light text-rose-600 hover:bg-rose-50 transition-colors disabled:opacity-50"
                  >
                    {loadingLogout ? 'Signing out...' : 'Sign Out'}
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="hidden sm:flex items-center gap-3">
              <Link
                href="/login"
                className="px-5 py-2 text-[11px] font-light uppercase tracking-[0.2em] text-zinc-900 hover:text-amber-700 transition-colors"
              >
                Sign In
              </Link>
              <Link
                href="/register"
                className="px-5 py-2 text-[11px] font-medium uppercase tracking-[0.2em] bg-zinc-900 text-white rounded-full hover:bg-zinc-800 transition-all shadow-sm"
              >
                Register
              </Link>
            </div>
          )}
        </div>

      </div>

      {/* Mobile Fullscreen Overlay Menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 bg-zinc-950/40 backdrop-blur-md md:hidden flex flex-col justify-end">
          <div className="bg-white rounded-t-[32px] p-8 pb-12 shadow-2xl animate-in slide-in-from-bottom duration-300">
            <div className="flex justify-between items-center mb-8">
              <span className="text-lg font-normal tracking-[0.25em] uppercase text-zinc-900">TT.</span>
              <button 
                onClick={() => setMenuOpen(false)}
                className="text-xs uppercase tracking-widest text-zinc-500 hover:text-zinc-900"
              >
                Close [X]
              </button>
            </div>
            <nav className="flex flex-col gap-6 text-center">
              <Link href="/products" onClick={() => setMenuOpen(false)} className="text-sm font-light uppercase tracking-widest text-zinc-900">Catalog</Link>
              <Link href="/categories" onClick={() => setMenuOpen(false)} className="text-sm font-light uppercase tracking-widest text-zinc-900">Collections</Link>
              <Link href="/about" onClick={() => setMenuOpen(false)} className="text-sm font-light uppercase tracking-widest text-zinc-900">About</Link>
              <hr className="border-stone-100 my-2" />
              
              {isLoggedIn ? (
                <button 
                  onClick={() => { handleLogout(); setMenuOpen(false); }} 
                  disabled={loadingLogout}
                  className="w-full py-3 text-xs uppercase tracking-widest text-rose-600 border border-rose-200 rounded-full disabled:opacity-50"
                >
                  {loadingLogout ? 'Signing out...' : 'Sign Out'}
                </button>
              ) : (
                <div className="flex flex-col gap-3 pt-2">
                  <Link href="/login" onClick={() => setMenuOpen(false)} className="w-full py-3 text-xs uppercase tracking-widest text-zinc-900 border border-zinc-200 rounded-full">Sign In</Link>
                  <Link href="/register" onClick={() => setMenuOpen(false)} className="w-full py-3 bg-zinc-900 text-white text-xs uppercase tracking-widest rounded-full">Register</Link>
                </div>
              )}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}