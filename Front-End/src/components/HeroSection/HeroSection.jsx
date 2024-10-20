import './HeroSection.css';
import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const HeroSection = () => {
    const navigate = useNavigate();
    // const isLogedin = useSelector((state) => state.user_info.auth.isLogedin);
    const user = useSelector(state => state.user_info.auth);
    const handleGetStarted = () => {
        if (user.isLogedin) {
            navigate('/home_page'); // Redirect to home page if logged in
        } else {
            navigate('/login'); // Redirect to login page if not logged in
        }
    };

    return (
        <div className="hero">
            <div className="hero-content">
                <h1>Your Next Favorite Book Awaits</h1>
                <p>Unlimited reading, book rentals, and exclusive offers.</p>
                {/* Replace NavLink with button and add onClick */}
                <button onClick={handleGetStarted} className="cta-button">
                    Get Started
                </button>
            </div>
        </div>
    );
};

export default HeroSection;
