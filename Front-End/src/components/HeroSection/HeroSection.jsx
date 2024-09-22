import './HeroSection.css';
import { NavLink } from 'react-router-dom';

const HeroSection = () => {
    return (
      <div className="hero">
        <div className="hero-content">
          <h1>Your Next Favorite Book Awaits</h1>
          <p>Unlimited reading, book rentals, and exclusive offers.</p>
          <NavLink to="/signup" className="cta-button">Get Started</NavLink>
        </div>
      </div>
    );
  };
  
  export default HeroSection;
  