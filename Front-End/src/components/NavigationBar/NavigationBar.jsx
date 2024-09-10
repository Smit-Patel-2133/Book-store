import './NavigationBar.css';
import { useState } from 'react';
import { NavLink } from "react-router-dom";
import pi from "../../assets/images/login/loginpage.png";
import {useNavigate} from "react-router-dom";
const NavigationBar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const nevigate=useNavigate();
    // Mocking user login status. Replace with actual logic for checking login status.
    const isLoggedIn = false; // Change this to `true` if the user is logged in

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav className="navbar">
            <div className="logo">
                <img src="/path-to-logo.png" alt="Book Store" />
            </div>

            {/* Hamburger Menu Icon */}
            <div className="hamburger-icon" onClick={toggleMenu}>
                <i className="fas fa-bars"></i>
            </div>

            <ul className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
                <li><NavLink to="/home_page" exact>Home</NavLink></li>
                <li><NavLink to="/books">Books</NavLink></li>
                <li><NavLink to="/blog">Blog</NavLink></li>
                <li><NavLink to="/contact">Contact</NavLink></li>
            </ul>

            <div className="nav-icons">
                {isLoggedIn ? (
                    <img src={pi} className="profile-pic" alt="Profile" />
                ) : (
                    <div className="auth-buttons">
                        <NavLink to="/login" className="login-btn">Login/</NavLink>
                        <NavLink to="/signup" className="signup-btn">Sign Up</NavLink>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default NavigationBar;
