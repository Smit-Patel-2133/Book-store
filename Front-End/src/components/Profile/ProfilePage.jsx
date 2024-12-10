import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ProfilePage.css'; // Import CSS for styling
import NavigationBar from "../NavigationBar/NavigationBar.jsx";
import { useSelector } from "react-redux";
import profilePic from '../../assets/images/profile/4.png';

const OrderDetails = () => {
    const [userData, setUserData] = useState(null);
    const [orderDetails, setOrderDetails] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const user = useSelector(state => state.user_info.auth);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                console.log("Fetching user data for email:", user.email);
                const response = await axios.post('http://localhost:3000/api/profile/userInfo', { email: user.email });
                setUserData(response.data);
            } catch (error) {
                console.error("Error fetching user data:", error);
                setError("Failed to load user data. Please try again later.");
            }
        };

        const fetchOrderDetails = async () => {
            try {
                const response = await axios.post('http://localhost:3000/api/profile/orders', { email: user.email });
                console.log("Order Details:", response.data);
                setOrderDetails(response.data);
            } catch (error) {
                console.error("Error fetching order details:", error);
                setError("Failed to load order details. Please try again later.");
            }
        };

        if (user.email) {
            Promise.all([fetchUserData(), fetchOrderDetails()])
                .finally(() => setLoading(false));
        }
    }, [user.email]);

    if (loading) {
        return <p>Loading user and order details...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <>
            <NavigationBar />
            <div className="profile-page">
                <div className="profile-header">
                    <img src={profilePic} alt="Profile" className="profile-pic"/>
                    {userData ? (
                        <>
                            <h2 className="profile-username">{userData.username || 'Username not available'}</h2>
                            <p className="profile-email">{userData.email}</p>
                        </>
                    ) : (
                        <p>No user data available</p>
                    )}
                </div>
                {userData && userData.address && (
                    <div className="profile-details">
                        <h3>Address Details</h3>
                        <p><strong>House:</strong> {userData.address.house_detail || 'N/A'}</p>
                        <p><strong>Area:</strong> {userData.address.areaDetail || 'N/A'}</p>
                        <p><strong>Landmark:</strong> {userData.address.landmark || 'N/A'}</p>
                        <p><strong>Pincode:</strong> {userData.address.pincode || 'N/A'}</p>
                        <p><strong>City:</strong> {userData.address.city || 'N/A'}</p>
                        <p><strong>State:</strong> {userData.address.state || 'N/A'}</p>
                        <p><strong>Mobile Number:</strong> {userData.mobileNumber || 'N/A'}</p>
                    </div>
                )}
                <div className="order-details-container">
                    <h2>Order Details</h2>
                    {orderDetails.length > 0 ? (
                        orderDetails.map((order) => (
                            <div key={order._id} className="order-entry">
                                <p><strong>Order ID:</strong> {order.orderId}</p>
                                <div className="order-books">
                                    <h4>Books in this Order:</h4>
                                    {order.items && order.items.length > 0 ? (
                                        <ul>
                                            {order.items.map((item) => (
                                                <li key={item.itemId}>{item.title}</li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <p>No books found for this order.</p>
                                    )}
                                </div>
                                <p><strong>Amount:</strong> Rs. {order.orderAmount.toFixed(2)}</p>
                                <p><strong>Payment Mode:</strong> {order.paymentMode}</p>
                                <p><strong>Payment Status:</strong> {order.paymentStatus}</p>
                                <p><strong>Date:</strong> {new Date(order.date).toLocaleDateString()}</p>
                                <p><strong>Time:</strong> {order.time}</p>
                                <p><strong>User ID:</strong> {order.userId}</p>
                                <p><strong>Status:</strong> {order.status}</p>

                                <hr/>
                            </div>
                        ))
                    ) : (
                        <>
                            <p>No order details found.</p>
                            <div className="alternative-details">
                                <h3>Profile Information</h3>
                                <p>Your order details are not available at the moment.</p>
                                <p>For assistance, please contact support or check your account for order status.</p>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </>
    );
};

export default OrderDetails;
