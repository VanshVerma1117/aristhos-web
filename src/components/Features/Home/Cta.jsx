import "../../../styles/index.css";
import Button from "../../Button";

export default function Cta() {
  const handleCustomOrder = () => {
    const message = "Hello, I am interested in commissioning a custom handcrafted furniture piece. I would love to discuss a bespoke design.";
    window.open(`https://wa.me/91XXXXXXXXXX?text=${encodeURIComponent(message)}`, "_blank");
  };

  const handleContactGallery = () => {
    const footerElement = document.querySelector("footer");
    if (footerElement) {
      footerElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="cta">
      <h2>BRING YOUR VISION TO LIFE</h2>
      <div className="cta-buttons">
        <Button 
          text="Start Custom Order" 
          variant="btn-black" 
          onClick={handleCustomOrder} 
        />
        <Button 
          text="Contact Gallery" 
          variant="btn-light" 
          onClick={handleContactGallery} 
        />
      </div>
    </section>
  );
}