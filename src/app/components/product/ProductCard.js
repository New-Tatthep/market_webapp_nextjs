// src/app/components/ProductCard.js
"use client";

import Link from "next/link";
import "../../styles/index.css";

export default function ProductCard({ product, onAddToCart }) {
  return (
    <div className="group flex flex-col h-full bg-transparent">
      {/* Image Container (Clickable to Details) */}
      <div className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl bg-stone-100 mb-4">
        <Link href={`/products/${product.code}`}>
          <img
            src={product.image?.public_url || "/placeholder.jpg"}
            alt={product.name || "Product"}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
          />
        </Link>

        {/* Status Badge */}
        {product.status && product.status !== 'ACTIVE' && (
          <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-md text-zinc-900 text-[9px] uppercase tracking-widest px-3 py-1 rounded-full">
            {product.status}
          </span>
        )}

        {/* Quick Add Button (Appears on Hover) */}
        <button
          onClick={(e) => {
            e.preventDefault();
            onAddToCart(product);
          }}
          className="absolute bottom-3 right-3 bg-zinc-900 text-white p-3 rounded-full shadow-lg opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 hover:bg-amber-700"
          title="Add to Cart"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
        </button>
      </div>

      {/* Info Container */}
      <div className="flex flex-col flex-grow text-left">
        <Link href={`/products/${product.code}`}>
          <h3 className="text-sm font-light text-zinc-900 tracking-wide line-clamp-1 group-hover:text-amber-700 transition-colors">
            {product.name}
          </h3>
        </Link>
        <p className="text-xs font-light text-zinc-400 mt-1 line-clamp-1 mb-3">
          {product.description || "Minimalist designer piece."}
        </p>
        
        <div className="mt-auto pt-2 flex items-center justify-between">
          <span className="text-sm font-normal text-zinc-900 tracking-tight">
            {product.price ? `฿${Number(product.price).toLocaleString()}` : "On Request"}
          </span>
          
          <Link 
            href={`/products/${product.code}`}
            className="text-[11px] font-medium uppercase tracking-widest text-zinc-900 border-b border-zinc-900 pb-0.5 hover:text-amber-700 hover:border-amber-700 transition-colors"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}