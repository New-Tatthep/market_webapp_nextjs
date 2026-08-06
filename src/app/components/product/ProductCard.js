// src/app/components/ProductCard.js
import "../../styles/index.css";

export default function ProductCard({ product }) {
  return (
    <div className="group flex flex-col h-full bg-transparent">
      {/* Image Container */}
      <div className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl bg-stone-100 mb-4">
        <img
          src={product.image?.public_url || "/placeholder.jpg"}
          alt={product.name || "Product"}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
        />
        {product.status && (
          <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-md text-zinc-900 text-[9px] uppercase tracking-widest px-3 py-1 rounded-full">
            {product.status}
          </span>
        )}
      </div>

      {/* Info Container */}
      <div className="flex flex-col flex-grow text-left">
        <h3 className="text-sm font-light text-zinc-900 tracking-wide line-clamp-1 group-hover:text-amber-700 transition-colors">
          {product.name}
        </h3>
        <p className="text-xs font-light text-zinc-400 mt-1 line-clamp-1 mb-3">
          {product.description || "Minimalist designer piece."}
        </p>
        
        <div className="mt-auto pt-2 flex items-center justify-between">
          <span className="text-sm font-normal text-zinc-900 tracking-tight">
            {product.price ? `฿${Number(product.price).toLocaleString()}` : "On Request"}
          </span>
          <button className="text-[11px] font-medium uppercase tracking-widest text-zinc-900 border-b border-zinc-900 pb-0.5 hover:text-amber-700 hover:border-amber-700 transition-colors">
            View Details
          </button>
        </div>
      </div>
    </div>
  );
}