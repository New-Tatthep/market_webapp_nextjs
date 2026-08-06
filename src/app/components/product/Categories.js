// src/app/components/Categories.js
export default function Categories() {
  const categories = [
    { name: "Apparel", image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=800", count: "12 Items" },
    { name: "Objects", image: "https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&q=80&w=800", count: "8 Items" },
    { name: "Living", image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&q=80&w=800", count: "15 Items" },
  ];

  return (
    <section className="py-28 px-6 lg:px-12 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
        <div>
          <span className="text-xs uppercase tracking-[0.2em] text-amber-700 font-medium">Categories</span>
          <h2 className="text-3xl md:text-4xl font-light text-zinc-900 mt-2 tracking-tight">Curated Spaces</h2>
        </div>
        <p className="text-xs font-light text-zinc-500 max-w-xs mt-4 md:mt-0">
          สำรวจหมวดหมู่สินค้าที่ถูกคัดสรรมาเพื่อตอบโจทย์วิถีชีวิตที่เหนือกว่า
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {categories.map((cat, index) => (
          <div 
            key={index}
            className="group relative h-[420px] rounded-2xl overflow-hidden cursor-pointer bg-stone-200"
          >
            <img 
              src={cat.image} 
              alt={cat.name} 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-zinc-950/20 to-transparent transition-opacity" />
            <div className="absolute bottom-0 left-0 right-0 p-8 text-white flex justify-between items-end">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-stone-300">{cat.count}</span>
                <h3 className="text-2xl font-light mt-1 tracking-wide">{cat.name}</h3>
              </div>
              <span className="h-10 w-10 rounded-full border border-white/30 flex items-center justify-center group-hover:bg-white group-hover:text-zinc-900 transition-all">
                →
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}