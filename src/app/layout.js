import localFont from "next/font/local";
import "./globals.css";
import './styles/index.css';

export const metadata = {
  title: 'Curated Market — Minimalist Luxury',
  description: 'A curated marketplace for modern lifestyle.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="th">
      <body className="bg-[#FAF9F5] text-zinc-900 font-sans antialiased selection:bg-zinc-900 selection:text-white">
        {children}
      </body>
    </html>
  );
}