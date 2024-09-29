// src/app/components/ProductCard.js
export default function ProductCard({ product }) {
    return (
      <div className="bg-white shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105">
        <img src={product.image} alt={product.name} className="w-full h-48 object-cover mb-2" />
        <div className="p-4">
          <h3 className="text-lg font-semibold">{product.name}</h3>
          <p className="text-lg font-bold text-blue-600">{product.price}</p>
          <a
            href={`/product/${product.id}`}
            className="block mt-4 bg-blue-600 text-white text-center rounded-full py-2 hover:bg-blue-700 transition"
          >
            View Product
          </a>
        </div>
      </div>
    );
  }