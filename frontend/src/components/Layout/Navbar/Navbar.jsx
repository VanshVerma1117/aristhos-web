import { Link, NavLink, useLocation } from "react-router-dom";
import Button from "../../UI/Button/Button";
import styles from "./Navbar.module.css";
import Logo from "/LOGO.png";

export default function Navbar() {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  let headerClass = styles.standardNav;
  if (isHomePage) {
    headerClass = styles.transparentNav;
  }

  return (
    <header className={`${styles.header} ${headerClass}`}>
      <nav className={styles.nav}>
        <Link to="/" className={styles.logo}>
          <img className={styles.logoImg} src={Logo} alt="ARISTHOS LOGO" />
          <span className={styles.logoText}>ARISTHOS WOODCRAFT</span>
        </Link>

        <div className={styles.navRight}>
          <ul className={styles.navList}>
            <li>
              <NavLink
                to="/shop"
                className={({ isActive }) =>
                  `${styles.navLink} ${isActive ? styles.active : ""}`
                }
              >
                Collections
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/heritage"
                className={({ isActive }) =>
                  `${styles.navLink} ${isActive ? styles.active : ""}`
                }
              >
                Heritage
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  `${styles.navLink} ${isActive ? styles.active : ""}`
                }
              >
                About
              </NavLink>
            </li>
          </ul>

          {/* Replaced <button> with a semantic <Link> targeting your data capture form */}
          <Button to="/about" variant="black" text="Get a Quote" />
        </div>
      </nav>
    </header>
  );
}
