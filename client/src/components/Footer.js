import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="footer-logo">🏛️ Prachi Online Services</div>
            <p>
              Your trusted Common Service Center for all government and digital
              services. Serving the community with dedication.
            </p>
          </div>

          <div className="footer-col">
            <h4>Quick Links</h4>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/services">Services</Link>
              </li>
              <li>
                <Link to="/request">Request Service</Link>
              </li>
              <li>
                <Link to="/contact">Contact Us</Link>
              </li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Services</h4>
            <ul>
              <li>Aadhar Card</li>
              <li>PAN Card</li>
              <li>Ration Card</li>
              <li>Bank Account</li>
              <li>Insurance</li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Contact</h4>
            <ul>
              <li>📍 Ghodgaon Tal.Chopda Dist.Jalgaon, Maharashtra</li>
              <li>📞 +91 8956647264</li>
              <li>✉️ barelaakash254@gmail.com</li>
              <li>🕐 Mon–Sat: 9AM – 7PM</li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>
            © {new Date().getFullYear()} 🏛️Prachi Online Services. All rights
            reserved.
          </p>
          <p>Developed by 😎 Vaibhav_Patil</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
