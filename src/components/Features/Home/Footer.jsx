// src/Components/Features/Home/Footer.jsx
import { Link } from "react-router-dom"; /* 🚀 Import Link for internal routing */
import "../../../styles/index.css";
import Logo from "/LOGO.png";

export default function Footer() {
  return (
    <footer>
      <div className="footer-brand">
        {/* 🚀 FIXED: Wrap the logo contents in a Router Link pointing to "/" */}
        <Link to="/" className="footer-logo-link" style={{ textDecoration: "none", color: "inherit" }}>
          <div className="logo">
            <img className="Logopng" src={Logo} alt="LOGO" />
            ARISTHOS WOODCRAFT
          </div>
        </Link>
        <div className="social-links">
          {/* 🚀 External social handlers opening securely in new tabs */}
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <i className="fa-brands fa-facebook"></i>
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <i className="fa-brands fa-instagram"></i>
          </a>
          <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
            <i className="fa-brands fa-youtube"></i>
          </a>
        </div>
      </div>
      
      <div className="footer-links">
        <div className="link-group">
          <Link to="#">Company</Link>
          <Link to="#">Care Guide</Link>
        </div>
        <div className="link-group">
          {/* 🚀 Router paths route instantly straight onto your shop grid catalog */}
          <Link to="/shop">Products</Link>
          <Link to="/shop">Catalog</Link>
          <Link to="#">About Us</Link>
        </div>
        <div className="link-group">
          <Link to="#">Support</Link>
          <Link to="#">Shipping</Link>
        </div>
      </div>
    </footer>
  );
}
