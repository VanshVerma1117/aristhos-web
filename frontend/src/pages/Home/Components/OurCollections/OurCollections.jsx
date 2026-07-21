import { useNavigate } from "react-router-dom";
import styles from "./OurCollections.module.css";
import ItemCard from "../../../../components/UI/ItemCard/ItemCard";
import livingroom from "/home_assets/Livingroom.png";
import bedroom from "/home_assets/Bedroom.png";
import diningroom from "/home_assets/Dining.png";

export default function OurCollections() {
  const navigate = useNavigate();

  const handleCategoryClick = (categoryName) => {
    navigate(`/shop?category=${encodeURIComponent(categoryName)}`);
  };

  return (
    <section className={styles.sectionContainer}>
      <h2>Our Collections</h2>
      <figure className={styles.cardGrid}>
        <ItemCard 
          image={livingroom} 
          title="Living Room" 
          description="Bespoke lounge statements, hand-carved coffee tables, and regal seating tailored for grand hosting." 
          onClick={() => handleCategoryClick("Living Room")}
        />
        <ItemCard 
          image={bedroom} 
          title="Bedroom" 
          description="Sanctuaries of rest featuring live-edge solid teak headboards and monumental architectural framing." 
          onClick={() => handleCategoryClick("Bedroom")}
        />
        <ItemCard 
          image={diningroom} 
          title="Dining" 
          description="Statement banquet configurations and hand-chiseled tables crafted for multi-generational lineage." 
          onClick={() => handleCategoryClick("Dining Room")}
        />
      </figure>
    </section>
  );
}