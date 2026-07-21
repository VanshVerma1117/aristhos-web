import { useNavigate } from "react-router-dom";
import Button from "../../../../components/UI/Button/Button";
import styles from "./HomeHero.module.css";

export default function HomeHero() {
  const navigate = useNavigate();

  return (
    <section className={styles.heroFullscreen}>
      <div className={styles.tintOverlay}>
        <div className={styles.textContainer}>
          <h1>The Art of Saharanpur</h1>
          <p className={styles.description}>
            Exquisite hand-carved teak furniture, crafted by master artisans in
            the heart of Saharanpur. Experience centuries of tradition, delivered
            to your doorstep.
          </p>
          
          {/* Global button classes stay as plain strings */}
          <Button variant="gold" text="EXPLORE COLLECTION" onClick={() => navigate("/shop")} />
        </div>
      </div>
    </section>
  );
}