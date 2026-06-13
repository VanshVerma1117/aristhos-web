// src/Components/Features/Home/Feedback.jsx
import "../../../styles/index.css";
import danielimg from "/index_assets/Daniel.png";
import vivanimg from "/index_assets/Vivan.png";
import tarunimg from "/index_assets/Tarun.png";

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
    // 🚀 CLEANED UP: Polished grammar while keeping the beautiful mention of the natural teak wood scent
    quote: "The Maharaja Sofa is spectacular. The frame offers absolute comfort, and you can instantly smell the rich, organic aroma of premium seasoned wood."
  }
];

export default function Feedback() {
  return (
    <section className="Client-voices">
      <h2 className="textwhite">Client Voices</h2>
      <div className="feedback-container">
        {REVIEWS.map((review) => (
          <div key={review.id} className="testimonial-card">
            <p className="quote">“{review.quote}”</p>
            <div className="author-info">
              <img src={review.img} alt={review.name} className="profile-pic" />
              <div className="name-box">
                <span className="name">{review.name}</span>
                <span className="role">{review.role}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
