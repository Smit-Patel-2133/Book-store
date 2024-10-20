import './NavigationBar.css';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from "react-router-dom";
import pi from "../../assets/images/login/loginpage.png";
import logo from "../../assets/images/logo/img.png";
import { currentUser } from '../../features/authentication/auth.js'; // Adjust the import path

const NavigationBar = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.user_info.auth); // Access user info from Redux state
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [profilePicture, setProfilePicture] = useState(pi); // Default to a placeholder image
    const navigate = useNavigate();

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    useEffect(() => {
        if (user.profilePicture) {
            const loadProfilePicture = async () => {
                try {
                    const profPic = await import(`../../assets/images/profile/${user.profilePicture}.png`);
                    setProfilePicture(profPic.default); // Use `default` to access the image
                } catch (error) {
                    console.error("Error loading profile picture:", error);
                    setProfilePicture(pi); // Fallback to the placeholder image
                }
            }
            loadProfilePicture();
        } else {
            setProfilePicture(pi); // Fallback if no profile picture is set
        }
    }, [user.profilePicture]);

    // Check session storage on component mount
    useEffect(() => {
        const storedUser = sessionStorage.getItem('user');
        if (storedUser) {
            const userData = JSON.parse(storedUser);
            dispatch(currentUser(userData)); // Dispatch the user data to the Redux store
        }
        const updateMedia = () => {
            setIsMobile(window.innerWidth < 768);
        };
        window.addEventListener('resize', updateMedia);
        updateMedia(); // Call initially to set the state correctly
        return () => window.removeEventListener('resize', updateMedia);
    }, [dispatch]);

    const logout = () => {
        // Clear session storage
        sessionStorage.removeItem('user');
        // Clear local storage (if you're storing user data here)
        localStorage.removeItem('user'); // Ensure this matches the key used to store user data in localStorage
        // Clear Redux state
        dispatch(currentUser({ name: '', email: '', isLogedin: false, profilePicture: null }));
        // Redirect to login page
        navigate('/home_page');
    };

    return (
        <nav className="navbar">
            <div className="logo">
                <img src={logo} alt="Book Store" />
            </div>

            {!isMobile ? (
                // For laptop/tablet screens
                <>
                    <ul className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
                        <li><NavLink to="/home_page" exact>Home</NavLink></li>
                        <li><NavLink to="/books">Books</NavLink></li>
                        <li><NavLink to="/blog">Blog</NavLink></li>
                        <li><NavLink to="/contact">Contact</NavLink></li>
                        {user.isLogedin && <li><NavLink to="/userProfile">Profile</NavLink></li>}
                        {user.email === 'stories@makz.com' && <li><NavLink to="/admin">Dashboard</NavLink></li>}
                    </ul>

                    <div className="nav-icons">
                        {user.isLogedin ? (
                            <div className="profile-wrapper">
                                <img src={profilePicture} className="profile-pic" alt="Profile" onClick={toggleMenu} />
                                {isMenuOpen && (
                                    <div className="dropdown-menu">
                                        <button onClick={() => navigate("/userProfile")}>Profile</button>
                                        <button onClick={logout}>Logout</button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="auth-buttons">
                                <NavLink to="/login">Login</NavLink>
                                <NavLink to="/signup">Sign Up</NavLink>
                            </div>
                        )}
                    </div>
                </>
            ) : (
                // For mobile screens
                <>
                    <div className="mobile-dropdown">
                        <button onClick={toggleMenu} className="dropdown-button">Menu</button>
                        {isMenuOpen && (
                            <div className="dropdown-menu">
                                <button onClick={() => navigate("/home_page")}>Home</button>
                                <button onClick={() => navigate("/books")}>Books</button>
                                <button onClick={() => navigate("/blog")}>Blog</button>
                                <button onClick={() => navigate("/contact")}>Contact</button>
                                {user.isLogedin && <button onClick={() => navigate("/userProfile")}>Profile</button>}
                                {user.email === 'makzadmin@makz.com' && <NavLink to="/admin">Dashboard</NavLink>}
                                {user.isLogedin ? (
                                    <button onClick={logout}>Logout</button>
                                ) : (
                                    <>
                                        <NavLink to="/login">Login</NavLink>
                                        <NavLink to="/signup">Sign Up</NavLink>
                                    </>
                                )}
                            </div>
                        )}
                    </div>
                </>
            )}
        </nav>
    );
};

export default NavigationBar;
