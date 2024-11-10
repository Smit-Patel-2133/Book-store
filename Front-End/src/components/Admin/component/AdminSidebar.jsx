import React from 'react';
import { FaChartLine, FaBook, FaShoppingCart, FaUserCog } from 'react-icons/fa';
import { useNavigate } from "react-router-dom"; // Import icons

const Sidebar = ({ books }) => { // Receive books as props
    const navigate = useNavigate();

    const handleBookClick = () => {
        navigate('/admindashboard/AdminBooksPage', { state: { books } }); // Pass books data via state
    }
    const handleOverview=()=>{
    navigate('/admindashboard', { state: { books } });
    }
    return (
        <div className="sidebar">
            <h2>STORIES</h2>
            <ul>
                <li onClick={handleOverview}><FaChartLine /> Overview</li> {/* Dashboard or overview section */}
                <li onClick={handleBookClick}><FaBook /> Update Books</li>  {/* Books section */}
                <li><FaShoppingCart /> Orders</li>  {/* Orders section */}
                <li><FaUserCog /> Account</li>  {/* User account settings */}
            </ul>
        </div>
    );
};

export default Sidebar;
