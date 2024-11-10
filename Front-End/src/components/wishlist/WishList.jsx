import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import './Wishlist.css';
import NavigationBar from '../NavigationBar/NavigationBar.jsx';
import { NavLink } from 'react-router-dom';

const Wishlist = () => {
    const user = useSelector(state => state.user_info.auth);
    const [detailedWishlistItems, setDetailedWishlistItems] = useState([]);

    useEffect(() => {
        const fetchWishlistDetails = async () => {
            try {
                console.log("Fetching wishlist for user:", user.email); // Debugging
                if (user.email) {
                    const response = await axios.get("http://localhost:3000/api/wishlist/getWishlistBooks", {
                        params: { userId: user.email }, // Pass userId as a query parameter
                    });
                    setDetailedWishlistItems(response.data);
                    console.log("Fetched wishlist details:", response.data);
                }
            } catch (error) {
                console.error("Error fetching wishlist details:", error);
                setDetailedWishlistItems([]); // Reset state on error
            }
        };

        fetchWishlistDetails();
    }, [user.email]);

    return (
        <>
            <NavigationBar />
            <div className="wishlist-container">
                <h2 className="wishlist-header">Your Wishlist</h2>
                {detailedWishlistItems.length === 0 ? (
                    <p className="wishlist-empty-message">Your wishlist is empty.</p>
                ) : (
                    <ul className="wishlist-items-list">
                        {detailedWishlistItems.map((item) => (
                            <li key={item._id} className="wishlist-item">
                                <img
                                    src={item.coverImg}
                                    alt={item.title}
                                    className="wishlist-item-image"
                                />
                                <div className="wishlist-item-details">
                                    <span className="wishlist-item-title">{item.title}</span>
                                    <span className="wishlist-item-price">Rs.{item.price.toFixed(2)}</span>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
                <NavLink to="/books" className="wishlist-back-to-shop">
                    Continue Shopping
                </NavLink>
            </div>
        </>
    );
};

export default Wishlist;
