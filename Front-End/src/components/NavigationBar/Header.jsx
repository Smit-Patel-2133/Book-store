import { NavLink } from 'react-router-dom';
import logo from "../../assets/images/logo/img.png"
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="logo">
                <img src={logo} alt="Book Store" />
            </div>
      <div className="auth-buttons">
        <NavLink to="/login" className="auth-link">Login</NavLink>
        <NavLink to="/signup" className="auth-link">Sign Up</NavLink>
      </div>
    </header>
  );
};

export default Header;
