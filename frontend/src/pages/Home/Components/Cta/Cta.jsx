import styles from "./Cta.module.css";
import Button from "../../../../components/UI/Button/Button";
import apiClient from '../../../../utils/axiosInstance';

export default function Cta() {
  const handleCustomOrder = async () => {
    try {
      await apiClient.post("/inquiries", {
        source: "cta_custom_order",
        status: "pending_whatsapp",
      });
    } catch (error) {
      console.error(
        "Inquiry logging failed, proceeding to WhatsApp anyway:",
        error,
      );
    }

    const message =
      "Hello, I am interested in commissioning a custom handcrafted furniture piece. I would love to discuss a bespoke design.";
    window.open(
      `https://wa.me/917409965346?text=${encodeURIComponent(message)}`,
      "_blank",
    );
  };

  return (
    <section className={styles.ctaContainer}>
      <h2 className={styles.heading}>BRING YOUR VISION TO LIFE</h2>
      <div className={styles.buttonGroup}>
        {/*Button component safely passes global variant strings */}
        <Button
          text="Start Custom Order"
          variant="btn-black"
          onClick={handleCustomOrder}
        />
        <Button text="Contact Gallery" variant="btn-light" to={"/about"} />
      </div>
    </section>
  );
}
