import React from 'react';
import {
    FaChartLine,
    FaBook,
    FaShoppingCart,
    FaUserCog,
    FaEnvelope,
    FaHandPaper,
    FaQuestionCircle, FaClipboardList
} from 'react-icons/fa';

import { useNavigate } from "react-router-dom"; // Import icons

const Sidebar = ({ orders }) => { // Receive orders as props
    const navigate = useNavigate();

    const handleBookClick = () => {
        navigate('/admindashboard/AdminBooksPage', { state: { orders } }); // Pass orders data via state
    };

    const handleOrderClick = () => {
        navigate('/admindashboard/AdminOrderPage', { state: { orders } }); // Navigate to orders page
    };

    const handleOverview = () => {
        navigate('/admindashboard', { state: { orders } });
    };
    const handleRequest = () => {
        navigate('/PersonRequest',{state: { orders } });
    }

    return (
        <div className="sidebar">
            <h2>STORIES</h2>
            <ul>
                <li onClick={handleOverview}><FaChartLine/> Overview</li>
                {/* Dashboard or overview section */}
                <li onClick={handleBookClick}><FaBook/> Update Books</li>
                {/* Books section */}
                <li onClick={handleOrderClick}><FaShoppingCart/> Orders</li>
                {/* Orders section */}
                <li onClick={handleRequest}><FaClipboardList/> Request</li>
                <li><FaUserCog/> Account</li>
                {/* User account settings */}
            </ul>
        </div>
    );
};

export default Sidebar;
