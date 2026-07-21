import styles from "./ShopSidebar.module.css";

export default function ShopSidebar({ activeCategory, setActiveCategory }) {
  const categories = [
    "All Collections", 
    "Living Room", 
    "Bedroom", 
    "Dining Room", 
    "Bespoke / Custom"
  ];

  return (
    <aside className={styles.sidebarContainer}>
      <h2 className={styles.brandTitle}>CATEGORIES</h2>
      <ul className={styles.linksList}>
        {categories.map(cat => (
          <li key={cat}>
            <button
              onClick={() => setActiveCategory(cat)}
              className={`${styles.linkItem} ${activeCategory === cat ? styles.active : ''}`}
            >
              {cat}
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
}