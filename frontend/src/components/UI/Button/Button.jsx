import { Link } from "react-router-dom";
import styles from "./Button.module.css";

export default function Button({ text, variant = "gold", onClick, to, className = "" }) {
  let variantClass = styles.btnGold;
  if (variant === "black" || variant === "btn-black") {
    variantClass = styles.btnBlack;
  } else if (variant === "light" || variant === "btn-light") {
    variantClass = styles.btnLight;
  }

  const combinedClass = `${styles.btn} ${variantClass} ${className}`;

  if (to) {
    return (
      <Link to={to} className={combinedClass} style={{ textDecoration: "none" }}>
        {text}
      </Link>
    );
  }

  return (
    <button className={combinedClass} onClick={onClick}>
      {text}
    </button>
  );
}