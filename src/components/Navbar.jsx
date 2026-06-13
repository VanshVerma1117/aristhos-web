// src/Components/Navbar.jsx
import { Link, useNavigate, useLocation } from "react-router-dom"; /* 🚀 Add useLocation */
import "../styles/index.css";
import Logo from "/LOGO.png";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation(); /* 🚀 Tracks active page path coordinate tracks */

  const handleQuoteClick = () => {
    alert("Bespoke Quote Request Form Coming Up!");
  };

  // 🚀 True ONLY when on the Homepage
  const isHomePage = location.pathname === "/";

  return (
    /* 🚀 MINIMUM FIX: Injects 'transparent-nav' modifier exclusively on the home page route */
    <header className={isHomePage ? "transparent-nav" : ""}>
      <nav>
        <Link to="/" className="logo" style={{ textDecoration: "none", color: "inherit" }}>
          <img className="Logopng" src={Logo} alt="LOGO" />
          ARISTHOS WOODCRAFT
        </Link>

        <div className="nav-right">
          <ul>
            <li>
              <Link to="/shop" style={{ textDecoration: "none", color: "inherit" }}>
                Collections
              </Link>
            </li>
            <li>
              <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
                Heritage
              </Link>
            </li>
            <li>
              <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
                About
              </Link>
            </li>
          </ul>

          <button className="btn btn-black" onClick={handleQuoteClick}>
            Get a Quote
          </button>
        </div>
      </nav>
    </header>
  );
}
