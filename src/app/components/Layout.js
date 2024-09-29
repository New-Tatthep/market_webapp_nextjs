import '../styles/globals.css';  // Adjust the path if needed

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}