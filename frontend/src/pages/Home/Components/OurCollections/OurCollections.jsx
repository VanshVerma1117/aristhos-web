import { useNavigate } from "react-router-dom";
import styles from "./OurCollections.module.css";
import ItemCard from "../../../../components/UI/ItemCard/ItemCard";

const COLLECTIONS_DATA = [
  {
    id: "living-room",
    title: "Living Room",
    image: "/home_assets/Livingroom.png",
    description: "Bespoke lounge statements, hand-carved coffee tables, and regal seating tailored for grand hosting.",
    category: "Living Room"
  },
  {
    id: "bedroom",
    title: "Bedroom",
    image: "/home_assets/Bedroom.png",
    description: "Sanctuaries of rest featuring live-edge solid teak headboards and monumental architectural framing.",
    category: "Bedroom"
  },
  {
    id: "dining-room",
    title: "Dining",
    image: "/home_assets/Dining.png",
    description: "Statement banquet configurations and hand-chiseled tables crafted for multi-generational lineage.",
    category: "Dining Room"
  }
];

export default function OurCollections() {
  const navigate = useNavigate();

  const handleCategoryClick = (categoryName) => {
    navigate(`/shop?category=${encodeURIComponent(categoryName)}`);
  };

  return (
    <section className={styles.sectionContainer}>
      <h2>Our Collections</h2>
      <figure className={styles.cardGrid}>
        {COLLECTIONS_DATA.map((collection) => (
          <ItemCard 
            key={collection.id}
            image={collection.image} 
            title={collection.title} 
            description={collection.description} 
            onClick={() => handleCategoryClick(collection.category)}
          />
        ))}
      </figure>
    </section>
  );
}