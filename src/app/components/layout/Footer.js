// src/app/components/layout/Footer.js
export default function Footer() {
  return (
    <footer className="bg-zinc-950 text-white font-sans mt-auto rounded-t-[40px] mx-4 lg:mx-8 mb-4">
      <div className="max-w-7xl px-8 lg:px-16 py-20 mx-auto">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-4">
          
          <div className="lg:col-span-2">
            <span className="text-xl font-normal tracking-[0.25em] uppercase text-white">
              TT<span className="text-amber-600">.</span>
            </span>
            <p className="text-xs font-light text-stone-400 mt-4 mb-8 max-w-sm leading-relaxed">
              พื้นที่รวบรวมสินค้าไลฟ์สไตล์ดีไซน์ประณีต เพื่อยกระดับประสบการณ์การใช้ชีวิตในทุกๆ วันของคุณ
            </p>

            <div className="flex flex-col sm:flex-row gap-3 max-w-md">
              <input 
                type="email" 
                className="px-5 py-3 text-xs text-white bg-white/5 border border-white/10 rounded-full focus:outline-none focus:border-white/30 transition-colors flex-grow" 
                placeholder="Enter your email address" 
              />
              <button className="px-6 py-3 text-[11px] font-medium tracking-widest uppercase text-zinc-900 bg-white rounded-full hover:bg-stone-200 transition-all">
                Subscribe
              </button>
            </div>
          </div>

          <div>
            <p className="text-xs font-medium tracking-widest uppercase text-stone-400 mb-6">Navigation</p>
            <ul className="flex flex-col space-y-3 text-xs font-light text-stone-300">
              <li><a href="#" className="hover:text-white transition-colors">Catalog</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Collections</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Our Philosophy</a></li>
            </ul>
          </div>

          <div>
            <p className="text-xs font-medium tracking-widest uppercase text-stone-400 mb-6">Connect</p>
            <ul className="flex flex-col space-y-3 text-xs font-light text-stone-300">
              <li><a href="#" className="hover:text-white transition-colors">Instagram</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Pinterest</a></li>
              <li><a href="#" className="hover:text-white transition-colors">LinkedIn</a></li>
            </ul>
          </div>
        </div>
        
        <hr className="my-12 border-white/10" />
        
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-xs font-light text-stone-500 gap-4">
          <p>© 2026 TT Marketplace. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-stone-300 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-stone-300 transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}