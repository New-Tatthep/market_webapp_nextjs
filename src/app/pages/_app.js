import Layout from '../components/Layout';
import '../styles/global.css'; // Import global styles

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
export default MyApp;