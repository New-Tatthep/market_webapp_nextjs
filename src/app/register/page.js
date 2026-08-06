// src/app/register/page.js
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    user_name: '',
    first_name: '',
    last_name: '',
    email: '',
    mobile_no: '',
    password: '',
    confirmPassword: '',
    user_type: 'USER', // กำหนดค่าเริ่มต้นตามระบบ
  });
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');

    if (formData.password !== formData.confirmPassword) {
      setErrorMessage('Passwords do not match.');
      setLoading(false);
      return;
    }

    try {
      // จัดเตรียม Payload ให้ตรงกับ EmployeeRequest struct ของ Golang
      const payload = {
        user_code: `EMP-${Date.now().toString().slice(-6)}`, // สร้างรหัสพนักงานเบื้องต้น หรือปล่อยให้ Backend จัดการ
        user_name: formData.user_name,
        user_type: formData.user_type,
        first_name: formData.first_name,
        last_name: formData.last_name,
        email: formData.email,
        mobile_no: formData.mobile_no,
        password: formData.password,
        birth_day: 0, // หรือแปลงค่าวันที่เป็น Unix Epoch ถ้ามีช่องกรอกวันเกิด
        profile_image: '',
        status: 'ACTIVE',
        create_time: Math.floor(Date.now() / 1000),
      };

      const response = await fetch('http://localhost:5001/market-service/v1/employee/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Failed to create employee account.');
      }

      console.log('Employee registered successfully:', result);

      // สมัครสมาชิกสำเร็จ พาไปหน้า Login
      router.push('/login');
      
    } catch (err) {
      console.error('Register error:', err);
      setErrorMessage(err.message || 'Failed to create account. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF9F5] flex flex-col justify-center py-16 px-6 lg:px-8">
      
      {/* Brand Header */}
      <div className="sm:mx-auto sm:w-full sm:max-w-lg text-center">
        <Link href="/" className="inline-block">
          <span className="text-2xl font-normal tracking-[0.3em] uppercase text-zinc-900">
            TT<span className="text-amber-700">.</span>
          </span>
        </Link>
        <h2 className="mt-6 text-2xl font-light tracking-tight text-zinc-900">
          Create an account
        </h2>
        <p className="text-xs font-light text-zinc-500 mt-2">
          Join TT Marketplace to start your journey.
        </p>
      </div>

      {/* Form Container */}
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-lg">
        <div className="bg-white/80 backdrop-blur-xl py-10 px-6 shadow-sm border border-stone-200/60 rounded-3xl sm:px-10">
          
          {errorMessage && (
            <div className="mb-6 p-3 bg-rose-50 border border-rose-100 text-rose-600 text-xs font-light rounded-2xl text-center">
              {errorMessage}
            </div>
          )}

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-light uppercase tracking-widest text-zinc-700 mb-2">
                  Username
                </label>
                <input
                  name="user_name"
                  type="text"
                  required
                  value={formData.user_name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 text-sm text-zinc-900 bg-stone-50/50 border border-stone-200 rounded-2xl focus:outline-none focus:border-zinc-400 focus:bg-white transition-all"
                  placeholder="username"
                />
              </div>
              <div>
                <label className="block text-[11px] font-light uppercase tracking-widest text-zinc-700 mb-2">
                  Email
                </label>
                <input
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 text-sm text-zinc-900 bg-stone-50/50 border border-stone-200 rounded-2xl focus:outline-none focus:border-zinc-400 focus:bg-white transition-all"
                  placeholder="name@example.com"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-light uppercase tracking-widest text-zinc-700 mb-2">
                  First Name
                </label>
                <input
                  name="first_name"
                  type="text"
                  required
                  value={formData.first_name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 text-sm text-zinc-900 bg-stone-50/50 border border-stone-200 rounded-2xl focus:outline-none focus:border-zinc-400 focus:bg-white transition-all"
                  placeholder="First name"
                />
              </div>
              <div>
                <label className="block text-[11px] font-light uppercase tracking-widest text-zinc-700 mb-2">
                  Last Name
                </label>
                <input
                  name="last_name"
                  type="text"
                  required
                  value={formData.last_name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 text-sm text-zinc-900 bg-stone-50/50 border border-stone-200 rounded-2xl focus:outline-none focus:border-zinc-400 focus:bg-white transition-all"
                  placeholder="Last name"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-light uppercase tracking-widest text-zinc-700 mb-2">
                Mobile Number
              </label>
              <input
                name="mobile_no"
                type="text"
                value={formData.mobile_no}
                onChange={handleChange}
                className="w-full px-4 py-3 text-sm text-zinc-900 bg-stone-50/50 border border-stone-200 rounded-2xl focus:outline-none focus:border-zinc-400 focus:bg-white transition-all"
                placeholder="0812345678"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-light uppercase tracking-widest text-zinc-700 mb-2">
                  Password
                </label>
                <input
                  name="password"
                  type="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-3 text-sm text-zinc-900 bg-stone-50/50 border border-stone-200 rounded-2xl focus:outline-none focus:border-zinc-400 focus:bg-white transition-all"
                  placeholder="••••••••"
                />
              </div>
              <div>
                <label className="block text-[11px] font-light uppercase tracking-widest text-zinc-700 mb-2">
                  Confirm Password
                </label>
                <input
                  name="confirmPassword"
                  type="password"
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full px-4 py-3 text-sm text-zinc-900 bg-stone-50/50 border border-stone-200 rounded-2xl focus:outline-none focus:border-zinc-400 focus:bg-white transition-all"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 px-4 bg-zinc-900 text-white text-xs font-medium uppercase tracking-widest rounded-full hover:bg-zinc-800 focus:outline-none transition-all shadow-sm disabled:opacity-50"
              >
                {loading ? 'Creating account...' : 'Register'}
              </button>
            </div>
          </form>

          {/* Footer link inside card */}
          <div className="mt-8 text-center">
            <p className="text-xs font-light text-zinc-500">
              Already have an account?{' '}
              <Link href="/login" className="font-medium text-zinc-900 hover:text-amber-700 transition-colors">
                Sign in
              </Link>
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}