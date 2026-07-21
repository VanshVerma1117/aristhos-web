import { useState, useEffect } from 'react';
import apiClient from '../../utils/axiosInstance';
import Navbar from '../../components/Layout/Navbar/Navbar'; // Corrected case sensitivity boundary
import HomeHero from './Components/Homehero/HomeHero';
import OurCollections from './Components/OurCollections/OurCollections'; // Standardized relative pathing
import Craftsmanship from './Components/Craftsmanship/Craftsmanship';
import SignaturePieces from './Components/SignaturePieces/SignaturePieces';
import Feedback from './Components/Feedback/Feedback';
import Cta from './Components/Cta/Cta';
import Footer from '../../components/Layout/Footer/Footer';

export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Hydrate landing page with real, high-value database inventory
  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const response = await apiClient.get('/products?page=1&limit=3');
        // Defensive mapping matching Shop.jsx
        setFeaturedProducts(response.data?.data || response.data || []);
      } catch (error) {
        console.error('Failed to populate featured collections:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchFeatured();
  }, []);

  return (
    <>
      <Navbar />
      <HomeHero />
      <main className="main_content">
        <OurCollections />
        <Craftsmanship />
        {/* Pass down live database records instead of internal static arrays */}
        <SignaturePieces products={featuredProducts} loading={loading} />
        <Feedback />
      </main>
      <Cta />
      <Footer /> 
    </>
  );
}