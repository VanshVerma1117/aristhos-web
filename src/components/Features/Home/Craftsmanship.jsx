// src/Components/Features/Home/Craftsmanship.jsx
import React, { useState } from "react";
import "../../../styles/index.css";

// 🚀 CRITICAL FIX: Upgraded premium copy and resolved your placeholder duplicate text bug
const CRAFT_DATA = [
  {
    id: "wood",
    title: "Seasoned Teak Wood",
    description: "Meticulously selected grade-A teak, air-seasoned for over twelve months to eradicate moisture, preventing warping and ensuring generational longevity.",
    image: "/index_assets/Craftsmanship.png" // Your original baseline image asset
  },
  {
    id: "artisans",
    title: "Master Artisans",
    description: "Hand-chiseled by hereditary master carvers using ancestral tools, preserving traditional intricate pattern work unique to the culture.",
    image: "/shop-assets/Maharaja throne.png" // Reusing an existing crisp texture asset for context switching
  },
  {
    id: "delivery",
    title: "Global Delivery",
    description: "White-glove, international logistical transit packed in specialized climate-controlled crates to secure museum-quality arrival at your estate.",
    image: "/index_assets/Livingroom.png"
  }
];

export default function Craftsmanship() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="craftsmanship">
      <div className="craft-content">
        <h2>Craftsmanship Over Everything</h2>
        <dl>
          {CRAFT_DATA.map((item, index) => {
            const isActive = index === activeIndex;
            return (
              <div 
                key={item.id} 
                className={`qualities ${isActive ? "active-pillar" : ""}`}
                onClick={() => setActiveIndex(index)}
                style={{ cursor: "pointer" }}
              >
                {/* Dynamically shifts from textgrey to gold when active */}
                <dt className={isActive ? "gold-title" : "textgrey"}>
                  {item.title}
                </dt>
                <dd className="textgrey">
                  {item.description}
                </dd>
              </div>
            );
          })}
        </dl>

        <div className="button-group">
          <button className="btn btn-gold" onClick={() => alert("Workshop Tour Video Coming Up!")}>
            View Workshop
          </button>
          {/* 🚀 TOKENS ALIGNMENT: Reverted 'btn-white' to match your global 'btn-black' background rule safely */}
          <button className="btn btn-black" onClick={() => alert("Heritage Story Page Coming Up!")}>
            Read Our Story
          </button>
        </div>
      </div>

      {/* The image container updates on the fly with a smooth transition wrapper rule */}
      <div className="craft-image">
        <img 
          key={CRAFT_DATA[activeIndex].image} /* Key attribute forces clean image remount transitions */
          src={CRAFT_DATA[activeIndex].image} 
          alt={CRAFT_DATA[activeIndex].title} 
        />
      </div>
    </section>
  );
} 