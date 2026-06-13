import { useNavigate } from "react-router-dom"; /* 🚀 Import navigation hook */
import "../../../styles/index.css";

export default function HomeHero() {
  const navigate = useNavigate(); /* 🚀 Initialize navigation engine */

  return (
    <section className="home-hero-fullscreen">
      <div className="home-hero-tint-overlay">
        <div className="home-hero-text-container">
          <h1>The Art of Saharanpur</h1>
          <p className="textgrey">
            Exquisite hand-carved teak furniture, crafted by master artisans in
            the heart of Saharanpur. Experience centuries of tradition, delivered
            to your doorstep.
          </p>
          
          {/* 🚀 JAVASCRIPT CLICK BINDING: Snaps user straight to catalog tracks */}
          <button className="btn btn-gold" onClick={() => navigate("/shop")}>
            EXPLORE COLLECTION
          </button>
        </div>
      </div>
    </section>
  );
}