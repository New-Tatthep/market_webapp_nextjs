// src/app/components/Categories.js
export default function Categories() {
  return (
    <section className="py-16">
      <div class="container flex flex-col mx-auto ">
          <h2 className="text-4xl font-bold text-center mb-8">Shop by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {/* Example Category Card */}
            <div className="bg-white shadow-md hover:shadow-lg transition p-4 text-center rounded-lg">
              <img src="/path/to/category-image.jpg" alt="Category" className="w-full h-32 object-cover mb-2 rounded" />
              <h3 className="text-lg font-semibold">Category Name</h3>
            </div>
            {/* Repeat for other categories */}
          </div>
        </div>
    </section>
  );
}