import styles from "./ProductModal.module.css";
import apiClient from "../../../utils/axiosInstance";

export default function ProductModal({ product, onClose }) {
  if (!product) return null;
  
  const WHATSAPP_NUMBER = "917409965346"; 
  
  const handleWhatsAppInquiry = async () => {
    try {
      // 1. Securely log the intent to the database FIRST
      const response = await apiClient.post('/inquiries', {
        source: 'custom_order_form',
        status: 'pending_whatsapp'
      });
      
      const trackingId = response.data.inquiryId;
      
      // 2. Inject the tracking reference into the payload
      const message = encodeURIComponent(
        `Hello Aristhos Woodcraft, I am interested in the "${product.name}" (Ref: ${trackingId}). Can you provide more details?`
      );
      window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, '_blank', 'noopener,noreferrer');
      
    } catch (error) {
      console.error("Database tracking failed, falling back to direct redirect:", error);
      // Production Fallback: Do not block the customer if the server fails
      const fallbackMessage = encodeURIComponent(
        `Hello Aristhos Woodcraft, I am interested in the "${product.name}". Can you provide more details?`
      );
      window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${fallbackMessage}`, '_blank', 'noopener,noreferrer');
    }
  };

  // Safe data normalization for Mongoose schemas
  const displayCategory = Array.isArray(product.category) ? product.category[0] : product.category;
  const displayPrice = product.price ? `₹${product.price.toLocaleString('en-IN')}` : 'Price on Request';

  return (
    <div className={styles.overlay}>
      <div className={styles.content}>
        
        <button onClick={onClose} className={styles.closeBtn} aria-label="Close modal">
          <i className="fas fa-times"></i>
        </button>
        
        <div className={styles.bodyLayout}>
          <div className={styles.imagePanel}>
            {product.imageUrl ? (
              <img src={product.imageUrl} alt={product.name} />
            ) : (
              // Inline fallback styles mapping to your specific CSS dimensions
              <div style={{ height: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #222', color: '#666' }}>
                <i className="fas fa-image" style={{ fontSize: '3rem' }}></i>
              </div>
            )}
          </div>
          
          <div className={styles.detailsPanel}>
            <div className={styles.labelTag}>{displayCategory}</div>
            <h2 className={styles.title}>{product.name}</h2>
            <p className={styles.price}>{displayPrice}</p>
            
            <hr className={styles.divider} />
            
            <div className={styles.metaRow}>
              <strong>Status:</strong>
              {/* Dynamic inline color assignment based on actual inventory state */}
              <span style={{ color: product.inStock ? '#10b981' : '#ef4444' }}>
                {product.inStock ? 'In Stock & Ready to Ship' : 'Currently Out of Stock'}
              </span>
            </div>
            
            <p className={styles.desc}>{product.description}</p>
            
            {/* Switched from <a> to <button> because this triggers a JavaScript function, not a direct HREF */}
            <button onClick={handleWhatsAppInquiry} className={styles.actionBtn}>
              <i className="fab fa-whatsapp" style={{ marginRight: '10px', fontSize: '1.2rem', verticalAlign: 'middle' }}></i> 
              Inquire via WhatsApp
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}