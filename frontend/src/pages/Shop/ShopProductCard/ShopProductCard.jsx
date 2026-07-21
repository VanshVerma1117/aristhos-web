import styles from './ShopProductCard.module.css';

export default function ShopProductCard({ item, onClick }) {
  // Data Normalization 
  const displayCategory = Array.isArray(item.category) ? item.category[0] : item.category;
  const displayPrice = item.price ? `₹${item.price.toLocaleString('en-IN')}` : 'Price on Request';

  {/* 1. Remove onClick from the article. It is just a visual container now. */}
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
          {/* 2. The accessible trigger. The CSS for this button will stretch over the card. */}
          <button 
            onClick={onClick} 
            className={styles.mainClickTarget}
            aria-label={`View details for ${item.name}`}
          >
            {item.name}
          </button>
        </h3>
        <p className={styles.price}>{displayPrice}</p>
        
        {/* 3. Future nested buttons go here. 
            As long as their CSS z-index is higher than the stretched button above, 
            they will click cleanly without triggering the modal or needing e.stopPropagation(). */}
      </div>
    </article>
  );
}