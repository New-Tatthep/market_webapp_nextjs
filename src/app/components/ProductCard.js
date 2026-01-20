// src/app/components/ProductCard.js
import "../styles/index.css";

export default function ProductCard({ product }) {
  return (
    <div className="card-product-main border rounded-2xl shadow-lg m-5 p-4 flex flex-col items-center text-center">
      <img
        src={product.image?.public_url || "/placeholder.jpg"}
        alt={product.name || "Product image"}
        className="w-full object-cover rounded-md mb-4"
      />
      <h3 className="text-lg font-semibold">{product.name}</h3>
      <p className="text-gray-600">{product.description || "No description."}</p>
      <p className="mt-2 font-bold text-blue-600">
        {product.price ? `${product.price} ฿` : "Price not available"}
      </p>
      <button className="mt-4 px-4 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300">ดูเพิ่มเติม</button>
    </div>
  );
}