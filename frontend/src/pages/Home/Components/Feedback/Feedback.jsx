import styles from "./Feedback.module.css";
import danielimg from "/home_assets/Daniel.png";
import vivanimg from "/home_assets/Vivan.png";
import tarunimg from "/home_assets/Tarun.png";

const REVIEWS = [
  {
    id: 1,
    name: "Daniel Evans",
    role: "Architect, London",
    img: danielimg,
    quote: "The structural joinery and attention to detail on my dining table is incredible. A true masterpiece of heritage art!"
  },
  {
    id: 2,
    name: "Vivan Malhotra",
    role: "Estate Owner, New Delhi",
    img: vivanimg,
    quote: "Unmatched teak craftsmanship. The grain selection is immaculate, and the hand-polished semi-gloss finish is incredibly high-end."
  },
  {
    id: 3,
    name: "Tarun Sharma",
    role: "Interior Designer, Mumbai",
    img: tarunimg,
    quote: "The Maharaja Sofa is spectacular. The frame offers absolute comfort, and you can instantly smell the rich, organic aroma of premium seasoned wood."
  }
];

export default function Feedback() {
  return (
    <section className={styles.sectionContainer}>
      <h2 className={styles.headerText}>Client Voices</h2>
      <div className={styles.grid}>
        {REVIEWS.map((review) => (
          <div key={review.id} className={styles.card}>
            <p className={styles.quote}>“{review.quote}”</p>
            <div className={styles.authorInfo}>
              <img src={review.img} alt={review.name} className={styles.profilePic} />
              <div className={styles.nameBox}>
                <span className={styles.name}>{review.name}</span>
                <span className={styles.role}>{review.role}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
