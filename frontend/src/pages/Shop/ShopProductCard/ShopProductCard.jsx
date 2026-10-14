import styles from './ShopProductCard.module.css';

export default function ShopProductCard({ item, onClick }) {
  const displayCategory = Array.isArray(item.category) ? item.category[0] : item.category;
  const displayPrice = item.price ? `₹${item.price.toLocaleString('en-IN')}` : 'Price on Request';

  return (
    <article className={styles.card}>
      <div className={styles.imageContainer}>
        {item.imageUrl ? (
          <img src={item.imageUrl} alt={item.name} className={styles.image} />
        ) : (
          <div className={styles.imagePlaceholder}>
            <i className="fas fa-image"></i>
          </div>
        )}
        <div className={styles.categoryBadge}>{displayCategory}</div>
      </div>
      
      <div className={styles.content}>
        <h3 className={styles.title}>
          <button 
            onClick={onClick} 
            className={styles.mainClickTarget}
            aria-label={`View details for ${item.name}`}
          >
            {item.name}
          </button>
        </h3>
        <p className={styles.price}>{displayPrice}</p>
      </div>
    </article>
  );
}