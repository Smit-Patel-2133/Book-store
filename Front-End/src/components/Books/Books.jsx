import React, { useState } from 'react';
import NavigationBar from "../NavigationBar/NavigationBar.jsx";
import "./Books.css";

const Books = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false); // Toggle this based on actual user status
    const categories = ['Fiction', 'Non-fiction', 'Science', 'History', 'Fantasy', 'Biography']; // Example categories

    return (
        <>
            <NavigationBar />
            <div className="main-container">
                <div className="header-group">
                    {/* Browse Categories Dropdown */}
                    <div className="browse-categories">
                        <select className="category-dropdown">
                            <option value="">Browse Categories</option>
                            {categories.map((category, index) => (
                                <option key={index} value={category}>{category}</option>
                            ))}
                        </select>
                    </div>

                    {/* Search Bar */}
                    <div className="search">
                        <input type="text" className="search-input" placeholder="Search for books..." />
                        <button className="search-button">
                            <i className="fas fa-search"></i> Search
                        </button>
                    </div>

                    {/* Shopping Cart */}
                    <div className="cart">
                        <button className="cart-info">
                            <i className="fas fa-shopping-cart"></i>
                            <span className="cart-text">Shopping Cart</span>
                            <span className="cart-total">
                                {isLoggedIn ? 'Total: ₹1200' : '0 ₹'}
                            </span>
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Books;
