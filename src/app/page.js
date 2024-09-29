// src/app/page.js
import Header from './components/Header';
import Footer from './components/Footer';
import Homepage from './components/Homepage';
import Categories from './components/Categories';
import FeaturedProducts from './components/FeaturedProducts';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      <main className="flex-grow">
        <Homepage />
        <Categories /> 
        {/* <FeaturedProducts /> */}
      </main>
      <Footer />
    </div>
  );
}