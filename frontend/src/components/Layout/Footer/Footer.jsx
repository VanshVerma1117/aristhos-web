import { Link } from "react-router-dom"; 
import styles from "./Footer.module.css";
import Logo from "/LOGO.png";

export default function Footer() {
  return (
    <footer className={styles.footerContainer}>
      <div className={styles.brandSection}>
        <Link to="/" className={styles.logoLink}>
          <div className={styles.logo}>
            <img className={styles.logoImg} src={Logo} alt="LOGO" />
            <span className={styles.logoText}>ARISTHOS WOODCRAFT</span>
          </div>
        </Link>
        <p className={styles.tagline}>
  Prefer email over a call?{' '}
  <Link to="/about" className={styles.taglineLink}>Use our custom project form</Link> — no phone number required.
</p>
      </div>

      <div className={styles.linksSection}>
        <div className={styles.linkGroup}>
          <Link to="/shop">Products</Link>
          <Link to="/about">About Us</Link>
          <Link to="/heritage">Heritage</Link>
        </div>
      </div>
    </footer>
  );
}
