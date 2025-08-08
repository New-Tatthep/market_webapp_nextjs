// src/app/components/ProductCard.js
export default function ProductCard({ product }) {
  return (
    <div className="border rounded-2xl shadow-lg p-4 flex flex-col items-center text-center hover:shadow-xl transition duration-300">
      <img
        src={product.image?.public_url || "/placeholder.jpg"}
        alt={product.name || "Product image"}
        className="w-full h-48 object-cover rounded-md mb-4"
      />
      <h3 className="text-lg font-semibold">{product.name}</h3>
      <p className="text-gray-600">{product.description || "No description."}</p>
      <p className="mt-2 font-bold text-blue-600">
        {product.price ? `${product.price} ฿` : "Price not available"}
      </p>
    </div>
  );
}