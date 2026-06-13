// src/Pages/Shop.jsx
import { useState, useEffect } from "react"; /* 🚀 Added useEffect */
import { useSearchParams } from "react-router-dom"; /* 🚀 Added useSearchParams */
import "../styles/shop.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Features/Home/Footer";
import { products } from "../data/products";

export default function Shop() {
  const [activeCategory, setActiveCategory] = useState("All Collections");

  // 🚀 STATE MEMORY: Remembers which product is currently selected for detail viewing
  const [selectedProduct, setSelectedProduct] = useState(null);
  
  // 🚀 INTERACTIVE LINKING ENGINE: Tracks URL string parameter values on page mount
  const [searchParams] = useSearchParams();

  useEffect(() => {
    // 1. Capture category parameter from Home page (OurCollections)
    const categoryParam = searchParams.get("category");
    if (categoryParam) {
      setActiveCategory(categoryParam);
    }

    // 2. Capture specific product ID parameter from Home page (SignaturePieces)
    const productIdParam = searchParams.get("productId");
    if (productIdParam) {
      const targetId = parseInt(productIdParam, 10);
      const matchedProduct = products.find((item) => item.id === targetId);
      
      if (matchedProduct) {
        setSelectedProduct(matchedProduct);
        
        // Automatically align sidebar category tab to highlight the opened item's category
        if (matchedProduct.category && matchedProduct.category.length > 0) {
          setActiveCategory(matchedProduct.category[0]);
        }
      }
    }
  }, [searchParams]);

  const filteredProducts = products.filter((item) => {
    if (activeCategory === "All Collections") return true;
    return item.category.includes(activeCategory);
  });

  return (
    <div className="shop-page-wrapper">
      <Navbar />

      <main className="shop-layout">
        {/* LEFT SIDEBAR PANEL */}
        <aside className="shop-sidebar-container">
          <div className="sidebar-brand-title">COLLECTIONS</div>
          <ul className="sidebar-links-list">
            {[
              "All Collections",
              "Living Room",
              "Bedroom",
              "Dining Room",
              "Bespoke / Custom",
            ].map((catName) => (
              <li
                key={catName}
                className={`sidebar-link-item ${activeCategory === catName ? "active" : ""}`}
                onClick={() => setActiveCategory(catName)}
              >
                {catName}
              </li>
            ))}
          </ul>
        </aside>

        {/* RIGHT CATALOG PANEL */}
        <section className="shop-catalog-container">
          <div className="catalog-top-bar">
            <span className="results-count">
              Showing {filteredProducts.length}{" "}
              {filteredProducts.length === 1 ? "result" : "results"}
            </span>
          </div>

          {/* Product Items Display Panel */}
          <div className="product-grid-display">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((item) => (
                <div key={item.id} className="product-card">
                  {/* 🚀 CLICK TRIGGER ON IMAGE CONTAINER */}
                  <div
                    className="product-card-image-wrapper"
                    onClick={() => setSelectedProduct(item)}
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="product-card-img"
                      style={{ objectPosition: item.objectPosition || "center" }}
                    />
                  </div>

                  <div className="product-card-info">
                    {/* 🚀 CLICK TRIGGER ON VIEW DETAILS LINK */}
                    <span
                      className="view-details-link"
                      onClick={() => setSelectedProduct(item)}
                    >
                      View Details
                    </span>

                    <div className="product-card-header">
                      <h3 className="product-card-title">{item.title}</h3>
                    </div>

                    <p className="product-card-desc">{item.description}</p>
                  </div>
                </div>
              ))
            ) : (
              <p
                style={{
                  color: "#666",
                  gridColumn: "1 / -1",
                  marginTop: "2rem",
                }}
              >
                No showcase pieces added to this collection yet.
              </p>
            )}
          </div>
        </section>
      </main>

      {/* 🚀 THE DETAIL MODAL OVERLAY PORTAL */}
      {selectedProduct && (
        <div className="modal-overlay" onClick={() => setSelectedProduct(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button
              className="modal-close-btn"
              onClick={() => setSelectedProduct(null)}
            >
              ✕
            </button>

            <div className="modal-body-layout">
              <div className="modal-image-panel">
                <img src={selectedProduct.image} alt={selectedProduct.title} />
              </div>

              <div className="modal-details-panel">
                <span className="modal-label-tag">Signature Collection</span>
                <h2 className="modal-product-title">{selectedProduct.title}</h2>
                <p className="modal-product-price">
                  {selectedProduct.price || "Pricing on Request"}
                </p>

                <hr className="modal-divider" />

                <p className="modal-product-desc">
                  {selectedProduct.description}
                </p>

                <div className="modal-meta-row">
                  <strong>Material:</strong>{" "}
                  <span>
                    {selectedProduct.material ||
                      "Premium Handcrafted Solid Wood"}
                  </span>
                </div>

                <div className="modal-meta-row">
                  <strong>Availability:</strong>{" "}
                  <span>Bespoke (Made to Order)</span>
                </div>

                {/* Luxury Custom Call-to-Action Link */}
                <a
                  href={`https://wa.me/91XXXXXXXXXX?text=Hello,%20I%20am%20interested%20in%20inquiring%20about%20the%20${encodeURIComponent(selectedProduct.title)}.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="modal-action-btn"
                >
                  Inquire via WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
