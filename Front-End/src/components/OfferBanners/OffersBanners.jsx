import { NavLink } from "react-router-dom";
import './OffersBanners.css';

const OffersBanner = () => {
    return (
      <div className="offers-banner">
        <h2>Exclusive Offer: Get 50% Off on Rentals</h2>
        <NavLink to="/offers" className="cta-button">Shop Now</NavLink>
      </div>
    );
  };
  
  export default OffersBanner;
  