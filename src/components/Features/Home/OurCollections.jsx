// src/Components/Features/Home/OurCollections.jsx
import { useNavigate } from "react-router-dom";
import "../../../styles/index.css";
import ItemCard from "../../ItemCard";
import livingroom from "/index_assets/Livingroom.png"
import bedroom from "/index_assets/Bedroom.png"
import diningroom from "/index_assets/Dining.png"

export default function OurCollections() {
  const navigate = useNavigate();

  const handleCategoryClick = (categoryName) => {
    navigate(`/shop?category=${encodeURIComponent(categoryName)}`);
  };

  return (
    <section className="OurCollection">
      <h2>Our Collections</h2>
      <figure className="collection-card-container">
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