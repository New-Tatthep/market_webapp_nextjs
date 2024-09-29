// src/app/components/FeaturedProducts.js
"use client";

import useProducts from '../hooks/UseProducts';
import ProductCard from './ProductCard';

export default function FeaturedProducts() {
  const { products, loading, error } = useProducts();

  if (loading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-center text-red-600">Error: {error.message}</p>;

  return (
    <section className="py-16">
      <h2 className="text-4xl font-bold text-center mb-8">Featured Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}