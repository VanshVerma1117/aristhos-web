import styles from "./ItemCard.module.css";

export default function ItemCard({ image, title, description, onClick }) {
  return (
    <div className={styles.card} onClick={onClick}>
      <img src={image} alt={title} className={styles.image} />
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.description}>{description}</p>
    </div>
  );
}