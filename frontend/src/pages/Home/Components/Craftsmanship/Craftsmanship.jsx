import React, { useState } from "react";
import { Link } from 'react-router-dom';
import Button from "../../../../components/UI/Button/Button";
import styles from "./Craftsmanship.module.css";

const CRAFT_DATA = [
  {
    id: "wood",
    title: "Seasoned Teak Wood",
    description: "Meticulously selected grade-A teak, air-seasoned for over twelve months to eradicate moisture, preventing warping and ensuring generational longevity.",
    image: "/home_assets/Craftsmanship.png"
  },
  {
    id: "artisans",
    title: "Master Artisans",
    description: "Hand-chiseled by hereditary master carvers using ancestral tools, preserving traditional intricate pattern work unique to the culture.",
    image: "/shop-assets/Maharaja throne.png"
  },
  {
    id: "delivery",
    title: "Global Delivery",
    description: "White-glove, international logistical transit packed in specialized climate-controlled crates to secure museum-quality arrival at your estate.",
    image: "/home_assets/Livingroom.png"
  }
];

export default function Craftsmanship() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className={styles.container}>
      <div className={styles.content}>
        <h2>Craftsmanship Over Everything</h2>
        <dl className={styles.list}>
          {CRAFT_DATA.map((item, index) => {
            const isActive = index === activeIndex;
            return (
              <div 
                key={item.id} 
                className={`${styles.qualityItem} ${isActive ? styles.activeItem : ""}`}
                onClick={() => setActiveIndex(index)}
                style={{ cursor: "pointer" }}
              >
                <dt className={`${styles.qualityTitle} ${isActive ? styles.goldTitle : ""}`}>
                  {item.title}
                </dt>
                <dd className={styles.qualityDesc}>
                  {item.description}
                </dd>
              </div>
            );
          })}
        </dl>

        <div className={styles.buttonGroup}>
          <Button to="/heritage" variant="black" text="Read Our Story" />
        </div>
      </div>

      <div className={styles.imageContainer}>
        <img 
          key={CRAFT_DATA[activeIndex].image}
          src={CRAFT_DATA[activeIndex].image} 
          alt={CRAFT_DATA[activeIndex].title} 
          className={styles.image}
        />
      </div>
    </section>
  );
}