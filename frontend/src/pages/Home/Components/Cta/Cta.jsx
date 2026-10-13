import styles from "./Cta.module.css";
import Button from "../../../../components/UI/Button/Button";
import apiClient from '../../../../utils/axiosInstance';

const WHATSAPP_NUMBER = "917409965346";
const WHATSAPP_MESSAGE = "Hello, I am interested in commissioning a custom handcrafted furniture piece. I would love to discuss a bespoke design.";

export default function Cta() {
  const handleCustomOrder = async () => {
    try {
      await apiClient.post("/inquiries", {
        source: "cta_custom_order",
        status: "pending_whatsapp",
      });
    } catch (error) {
      console.error("Inquiry logging failed, proceeding to WhatsApp anyway:", error);
    }

    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`,
      "_blank"
    );
  };

  return (
    <section className={styles.ctaContainer}>
      <h2 className={styles.heading}>BRING YOUR VISION TO LIFE</h2>
      <div className={styles.buttonGroup}>
        <Button
          text="Start Custom Order"
          variant="btn-black"
          onClick={handleCustomOrder}
        />
        <Button 
          text="Contact Gallery" 
          variant="btn-light" 
          to="/about" 
        />
      </div>
    </section>
  );
}