// src/app/components/FeaturedProducts.js
"use client";

import useProducts from '../../hooks/UseProducts';
import ProductCard from './ProductCard';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

export default function FeaturedProducts({ onAddToCart }) { // 1. รับ onAddToCart เข้ามาที่นี่
  const { products, loading, error } = useProducts();
  const product_data = products?.data?.datas || [];

  if (loading) return <div className="py-28 text-center text-xs tracking-widest uppercase text-zinc-400">Loading collection...</div>;
  if (error) return <div className="py-28 text-center text-xs text-rose-600">Failed to load products</div>;

  return (
    <section className="py-28 border-t border-stone-200/60">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex items-end justify-between mb-16">
          <div>
            <span className="text-xs uppercase tracking-[0.2em] text-amber-700 font-medium">Selection</span>
            <h2 className="text-3xl md:text-4xl font-light text-zinc-900 mt-2 tracking-tight">Featured Drops</h2>
          </div>
        </div>

        {product_data.length === 0 ? (
          <p className="text-center text-xs tracking-widest uppercase text-zinc-400 py-12">No products found.</p>
        ) : (
          <Swiper
            modules={[Navigation]}
            navigation
            spaceBetween={30}
            slidesPerView={4}
            breakpoints={{
              0: { slidesPerView: 1 },
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 4 },
            }}
            className="pb-12"
          >
            {product_data.map((product) => (
              <SwiperSlide key={product.code} className="h-auto">
                <ProductCard 
                  product={product} 
                  onAddToCart={onAddToCart} // 2. ส่งต่อ onAddToCart ไปให้ ProductCard
                />
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </section>
  );
}