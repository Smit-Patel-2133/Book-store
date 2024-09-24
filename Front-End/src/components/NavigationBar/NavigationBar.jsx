import './NavigationBar.css';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from "react-router-dom";
import pi from "../../assets/images/login/loginpage.png";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo/img.png";

const NavigationBar = () => {
    const user = useSelector(state => state.user_info.auth); // Access user info from Redux state
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav className="navbar">
            <div className="logo">
                <img src={logo} alt="Book Store" />
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
                {user.isLogedin && <li><NavLink to="/userProfile">Profile</NavLink></li>}
                {user.email === 'makzadmin@makz.com' && <li><NavLink to="/admin">Dashboard</NavLink></li>}
            </ul>

            <div className="nav-icons">
                {user.isLogedin ? (
                    <img src={user.profilePicture || pi} className="profile-pic" alt="Profile" />
                ) : (
                    <div className="auth-buttons">
                        <NavLink to="/login">Login</NavLink>
                        <NavLink to="/signup">Sign Up</NavLink>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default NavigationBar;
