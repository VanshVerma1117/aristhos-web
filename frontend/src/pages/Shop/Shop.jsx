import { useState, useEffect } from "react"; 
import { useSearchParams } from "react-router-dom"; 
import apiClient from "../../utils/axiosInstance"; 
import Navbar from "../../components/Layout/Navbar/Navbar";
import Footer from "../../components/Layout/Footer/Footer";
import ShopSidebar from "./ShopSidebar/ShopSidebar";
import ShopProductCard from "./ShopProductCard/ShopProductCard";
import ProductModal from "./ProductModal/ProductModal";
import styles from "./Shop.module.css";

export default function Shop() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [activeCategory, setActiveCategory] = useState("All Collections");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const fetchCatalog = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const response = await apiClient.get('/products');
        const fetchedProducts = response.data?.data || response.data || [];
        
        setProducts(fetchedProducts);

        const productIdParam = searchParams.get("productId");
        if (productIdParam) {
          const matchedProduct = fetchedProducts.find(
            (item) => item._id === productIdParam || item.id === productIdParam
          );
          
          if (matchedProduct) {
            setSelectedProduct(matchedProduct);
            const cat = Array.isArray(matchedProduct.category) 
              ? matchedProduct.category[0] 
              : matchedProduct.category;
            if (cat) setActiveCategory(cat);
          }
        }
      } catch (err) {
        console.error("Catalog Fetch Error:", err);
        setError("Unable to load the catalog at this time. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCatalog();
  }, [searchParams]);

  useEffect(() => {
    const categoryParam = searchParams.get("category");
    if (categoryParam) setActiveCategory(categoryParam);
  }, [searchParams]);

  const filteredProducts = products.filter((item) => {
    if (activeCategory === "All Collections") return true;
    
    if (Array.isArray(item.category)) {
      return item.category.includes(activeCategory);
    }
    return item.category === activeCategory;
  });

  return (
    <div className={styles.pageWrapper}>
      <Navbar />

      <main className={styles.layout}>
        <ShopSidebar 
          activeCategory={activeCategory} 
          setActiveCategory={setActiveCategory} 
        />

        <section className={styles.catalogContainer}>
          <div className={styles.topBar}>
            <span className={styles.resultsCount}>
              {isLoading 
                ? "Loading catalog..." 
                : `Showing ${filteredProducts.length} ${filteredProducts.length === 1 ? "result" : "results"}`}
            </span>
          </div>

          <div className={styles.gridDisplay}>
            {isLoading ? (
              <p className={styles.loadingState}>Loading showcase pieces...</p>
            ) : error ? (
              <p className={styles.errorState}>{error}</p>
            ) : filteredProducts.length > 0 ? (
              filteredProducts.map((item) => (
                <ShopProductCard 
                  key={item._id || item.id} 
                  item={item} 
                  onClick={() => setSelectedProduct(item)} 
                />
              ))
            ) : (
              <p className={styles.emptyState}>
                No showcase pieces added to this collection yet.
              </p>
            )}
          </div>
        </section>
      </main>

      <ProductModal 
        product={selectedProduct} 
        onClose={() => setSelectedProduct(null)} 
      />

      <Footer />
    </div>
  );
}