// src/app/components/FeaturedProducts.js
"use client";

import useProducts from '../hooks/UseProducts';
import ProductCard from './ProductCard';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Grid } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/grid";

export default function FeaturedProducts() {
  const { products, loading, error } = useProducts();
  const product_data = products?.data?.datas || [];

  if (loading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-center text-red-600">Error: {error.message}</p>;

  return (
    <section className="py-16">
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold text-center mb-8">
          Featured Products
        </h2>

        <Swiper
          modules={[Navigation, Grid]}
          navigation
          grid={{
            rows: 2,
            fill: "row",
          }}
          spaceBetween={24}
          slidesPerView={4}
          breakpoints={{
            0: { slidesPerView: 1 },
            640: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
          }}
          className="px-4"
        >
          {product_data.map((product) => (
            <SwiperSlide key={product.code}>
              <ProductCard product={product} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
