import { useNavigate } from 'react-router-dom';
import styles from './SignaturePieces.module.css';

export default function SignaturePieces({ products, loading }) {
  const navigate = useNavigate();

  if (loading) {
    return (
      <section className={styles.section}>
        <div className={styles.loading}>Loading signature collection...</div>
      </section>
    );
  }

  if (!products || products.length === 0) return null; // Gracefully hide section if no products exist

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.title}>Signature Masterpieces</h2>
        <p className={styles.subtitle}>Hand-selected works exhibiting our finest woodworking standards.</p>
        
        <div className={styles.grid}>
          {products.map((product) => (
            <div key={product._id} className={styles.card}>
              <div className={styles.imageContainer}>
                {product.imageUrl ? (
                  <img src={product.imageUrl} alt={product.name} className={styles.image} />
                ) : (
                  <div className={styles.noImage}>No Image Provided</div>
                )}
              </div>
              <div className={styles.content}>
                <span className={styles.category}>
                  {Array.isArray(product.category) ? product.category[0] : product.category}
                </span>
                <h3 className={styles.itemTitle}>{product.name}</h3>
                <p className={styles.price}>₹{product.price.toLocaleString('en-IN')}</p>
                
                {/* Direct deep-link interaction to open the product modal on the shop page */}
                <button 
                  onClick={() => navigate(`/shop?productId=${product._id}`)}
                  className={styles.viewBtn}
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
