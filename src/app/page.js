// src/app/page.js
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Categories from './components/product/Categories';
import FeaturedProducts from './components/product/FeaturedProducts';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-[#FAF9F5]">
      <Header />
      
      <main className="flex-grow">
        {/* Editorial Hero Section */}
        <section className="relative h-[85vh] min-h-[600px] flex items-center justify-center overflow-hidden bg-zinc-900 mx-4 lg:mx-8 mt-4 rounded-3xl">
          <div className="absolute inset-0 z-0 opacity-60">
            <img 
              src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=1920" 
              alt="Hero Background" 
              className="w-full h-full object-cover object-center scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent" />
          </div>
          
          <div className="relative z-10 container mx-auto px-6 text-center max-w-4xl text-white">
            <span className="inline-block text-xs uppercase tracking-[0.3em] font-light text-stone-300 mb-4 border border-white/20 px-4 py-1.5 rounded-full backdrop-blur-md">
              TT Official Market
            </span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-light tracking-tight leading-[1.1] mb-6">
              Welcome to <span className="italic font-normal">TT</span> Marketplace.
            </h1>
            <p className="text-sm md:text-base font-light text-stone-300 max-w-xl mx-auto mb-10 leading-relaxed">
              แพลตฟอร์มซื้อขายสินค้าคัดสรรพิเศษ ดีไซน์เรียบหรู เหนือระดับในทุกมิติ
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link 
                href="/products" 
                className="w-full sm:w-auto px-8 py-4 bg-white text-zinc-900 text-xs font-medium uppercase tracking-widest rounded-full hover:bg-stone-100 transition-all shadow-lg"
              >
                Explore Collection
              </Link>
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <Categories /> 

        {/* Featured Products Section */}
        <FeaturedProducts />
      </main>

      <Footer />
    </div>
  );
}