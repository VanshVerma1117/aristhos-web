// src/Components/Features/Home/SignaturePieces.jsx
import { useNavigate } from "react-router-dom";
import "../../../styles/index.css";
import ItemCard from "../../ItemCard";
import MaharajaSofa from "/index_assets/MaharajaSofa.png";
import VictorianMirrorFrame from "/index_assets/Victorianmirrorframe.png";

export default function SignaturePieces() {
  const navigate = useNavigate();

  const handleProductClick = (productId) => {
    // 🚀 Pushes the product ID directly into the URL stream
    navigate(`/shop?productId=${productId}`);
  };

  return (
    <section className="signature-pieces">
      <h2>Signature Pieces</h2>
      <div className="signature-container">
        <ItemCard
          image={MaharajaSofa}
          title="The Maharaja Sofa"
          description="Intricate floral carvings in premium mahogany."
          onClick={() => handleProductClick(3)} /* Maps to ID 3 in your products.js */
        />
        <ItemCard
          image={VictorianMirrorFrame}
          title="Victorian Mirror Frame"
          description="The perfect accent piece for a luxury hallway."
          onClick={() => handleProductClick(8)} /* Maps to ID 8 in your products.js */
        />
      </div>
    </section>
  );
}
