import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/logo2.png";
import "./Navbar.css";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const links = [
    { path: "/", label: "Home" },
    { path: "/services", label: "Services" },
    { path: "/request", label: "Request Service" },
    { path: "/contact", label: "Contact" },
  ];

  return (
    <nav className="navbar">
      <div className="nav-container">
        {/* <Link to="/" className="nav-brand">
          <span className="brand-icon">🏛️</span>
          <div>
            <div className="brand-name">Prachi</div>
            <div className="brand-sub">Online Services</div>
          </div>
        </Link> */}
        <Link to="/" className="nav-brand">
          <img src={logo} alt="Prachi Online Services" className="brand-logo" />
        </Link>

        <ul className={`nav-links ${menuOpen ? "open" : ""}`}>
          {links.map((l) => (
            <li key={l.path}>
              <Link
                to={l.path}
                className={`nav-link ${location.pathname === l.path ? "active" : ""}`}
                onClick={() => setMenuOpen(false)}
              >
                {l.label}
              </Link>
            </li>
          ))}
          <li>
            <Link
              to="/admin/login"
              className="btn btn-primary btn-sm"
              onClick={() => setMenuOpen(false)}
            >
              Admin Login
            </Link>
          </li>
        </ul>

        <button
          className="hamburger"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span className={menuOpen ? "open" : ""}></span>
          <span className={menuOpen ? "open" : ""}></span>
          <span className={menuOpen ? "open" : ""}></span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
