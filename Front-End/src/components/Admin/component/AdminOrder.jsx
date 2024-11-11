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
                            <table className="order-info">
                                <tbody>
                                <tr>
                                    <td><strong>Order ID:</strong></td>
                                    <td>{order.orderId}</td>
                                </tr>
                                <tr>
                                    <td><strong>Order Amount:</strong></td>
                                    <td>{order.orderAmount}</td>
                                </tr>
                                <tr>
                                    <td><strong>Order Date:</strong></td>
                                    <td>{new Date(order.date).toLocaleDateString()}</td>
                                </tr>
                                <tr>
                                    <td><strong>Order Time:</strong></td>
                                    <td>{order.time}</td>
                                </tr>
                                <tr>
                                    <td><strong>Payment Mode:</strong></td>
                                    <td>{order.paymentMode}</td>
                                </tr>
                                <tr>
                                    <td><strong>Payment Status:</strong></td>
                                    <td>{order.paymentStatus}</td>
                                </tr>
                                </tbody>
                            </table>

                            <h3>Items</h3>
                            <div className="items-container">
                                <table className="items-table">
                                    <thead>
                                    <tr>
                                        <th>Item ID</th>
                                        <th>Title</th>
                                        <th>User ID</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {order.items?.map((item, itemIndex) => (
                                        <tr key={itemIndex}>
                                            <td>{item.itemId}</td>
                                            <td>{item.title}</td>
                                            <td>{item.userId}</td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>

                            <h3>Delivery Address</h3>
                            <table className="address-info">
                                <tbody>
                                <tr>
                                    <td><strong>House Detail:</strong></td>
                                    <td>{order.address.house_detail}</td>
                                </tr>
                                <tr>
                                    <td><strong>Area Detail:</strong></td>
                                    <td>{order.address.areaDetail}</td>
                                </tr>
                                <tr>
                                    <td><strong>Landmark:</strong></td>
                                    <td>{order.address.landmark}</td>
                                </tr>
                                <tr>
                                    <td><strong>Pincode:</strong></td>
                                    <td>{order.address.pincode}</td>
                                </tr>
                                <tr>
                                    <td><strong>City:</strong></td>
                                    <td>{order.address.city}</td>
                                </tr>
                                <tr>
                                    <td><strong>State:</strong></td>
                                    <td>{order.address.state}</td>
                                </tr>
                                <tr>
                                    <td><strong>Mobile Number:</strong></td>
                                    <td>{order.address.mobileNumber}</td>
                                </tr>
                                <tr>
                                    <td><strong>Status:</strong></td>
                                    <td>{order.address.status}</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AdminOrder;
