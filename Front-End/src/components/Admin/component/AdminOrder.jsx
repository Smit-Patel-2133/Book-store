import React, { useState, useEffect } from 'react';
import AdminSidebar from './AdminSidebar';
import './AdminOrder.css';
import axios from "axios";

const AdminOrder = () => {
    const [orderDetails, setOrderDetails] = useState(null);

    const getTheDetail = async () => {
        try {
            const res = await axios.get("http://localhost:3000/api/admin/orderDetail");
            console.log("order detail", res.data);
            setOrderDetails(res.data); // Set the order details state
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        getTheDetail(); // Call API to fetch data on component mount
    }, []);

    if (!orderDetails) {
        return <div>Loading...</div>;
    }

    return (
        <div className="dashboard">
            <AdminSidebar />
            <div className="main-content">
                <h1>Order Details</h1>
                <div className="order-details">
                    {/* Iterate through all orders */}
                    {orderDetails.map((order, index) => (
                        <div key={index} className="order-row">
                            <h3>Order Information</h3>
                            <div className="order-info-container">
                                <div className="order-info">
                                    <span><strong>Order ID:</strong> {order.orderId}</span>
                                    <span><strong>Order Amount:</strong> {order.orderAmount}</span>
                                    <span><strong>Order Date:</strong> {new Date(order.date).toLocaleDateString()}</span>
                                    <span><strong>Order Time:</strong> {order.time}</span>
                                    <span><strong>Payment Mode:</strong> {order.paymentMode}</span>
                                    <span><strong>Payment Status:</strong> {order.paymentStatus}</span>
                                </div>
                            </div>

                            <h3>Items</h3>
                            <div className="items-container">
                                {order.items?.map((item, itemIndex) => (
                                    <div key={itemIndex} className="item-info">
                                        <span><strong>Item ID:</strong> {item.itemId}</span>
                                        <span><strong>Title:</strong> {item.title}</span>

                                    </div>
                                ))}
                                <span><strong>User ID:</strong> {order.userId}</span>
                            </div>

                            <h3>Delivery Address</h3>
                            <div className="address-info-container">
                                <div className="address-info">
                                    {order.address.house_detail}
                                    , {order.address.areaDetail},
                                    {order.address.landmark},
                                    {order.address.pincode},
                                    {order.address.city},
                                    {order.address.state},
                                    {order.address.mobileNumber},

                                </div>
                                <span><strong>Status:</strong> {order.status}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AdminOrder;
