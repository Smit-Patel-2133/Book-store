import { NavLink } from "react-router-dom";
import './Footer.css';
import '@fortawesome/fontawesome-free/css/all.min.css';


const Footer = () => {
    return (
      <footer className="footer">
        <div className="footer-links">
          <NavLink to="/about">About Us</NavLink>
          <NavLink to="/faq">FAQs</NavLink>
          <NavLink to="/contact">Contact Us</NavLink>
        </div>
        <div className="social-media">
          <a href="#"><i className="fab fa-facebook"></i></a>
          <a href="#"><i className="fab fa-twitter"></i></a>
          {/* Other social media icons */}
        </div>
        <p>&copy; 2024 Stories. All Rights Reserved.</p>
      </footer>
    );
  };
  
  export default Footer;
  