import React, { useState, useEffect } from 'react';
import AdminSidebar from '../AdminSidebar.jsx';
import './AdminOrder.css';
import axios from "axios";

const AdminOrder = () => {
    const [orderDetails, setOrderDetails] = useState(null);
    const [selectedOption, setSelectedOption] = useState({}); // To track the selected dropdown option for each order
    const [deliveryPerson, setDeliveryPerson] = useState([]); // State to hold delivery persons data

    const getTheDetail = async () => {
        try {
            const res = await axios.get("http://localhost:3000/api/admin/orderDetail");
            console.log("order detail", res.data);
            setOrderDetails(res.data); // Set the order details state
            console.log("request completed");
        } catch (e) {
            console.log(e);
        }
    };

    const getDeliveryPerson = async () => {
        try {
            console.log("Fetching delivery persons...");
            const res = await axios.get('http://localhost:3000/api/admin/getThedeliveryPerson');
            setDeliveryPerson(res.data); // Set the delivery persons data
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        getTheDetail(); // Fetch order details on component mount
        getDeliveryPerson(); // Fetch delivery person data on component mount
    }, []);

    if (orderDetails === null || deliveryPerson.length === 0) {
        return <div>Loading...</div>;
    }

    if (orderDetails.length === 0) {
        return (
            <div className="dashboard">
                <AdminSidebar />
                <div className="main-content">
                    <h1>Order Details</h1>
                    <div>No pending orders available at the moment.</div>
                </div>
            </div>
        );
    }

    const handleApproveOrder = async (orderId) => {
        // Get the selected delivery person's details
        const selectedPerson = deliveryPerson.find(
            (person) =>
                `${person.firstName} ${person.lastName}, ${person.city}` ===
                selectedOption[orderId]
        );

        if (selectedPerson) {
            console.log(`Order ID: ${orderId}`);
            console.log(`Selected Delivery Person: ${selectedPerson.firstName} ${selectedPerson.lastName}`);
            console.log(`Email: ${selectedPerson.email}`);
        } else {
            console.log(`No delivery person selected for Order ID: ${orderId}`);
        }
        try {
            const res = await axios.post("http://localhost:3000/api/admin/order/approve", { orderId, email: selectedPerson.email });
            console.log(res.data.message);
            if (res.status === 200) {
                getTheDetail(); // Fetch order details on component mount
                getDeliveryPerson();
            }
        } catch (e) {
            console.error("Error approving the order:", e);
        }
    };

    const handleDropdownChange = (orderId, selectedValue) => {
        setSelectedOption((prev) => ({
            ...prev,
            [orderId]: selectedValue,
        }));
    };

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
                                    {order.address.house_detail},
                                    {order.address.areaDetail},
                                    {order.address.landmark},
                                    {order.address.pincode},
                                    {order.address.city},
                                    {order.address.state},
                                    {order.address.mobileNumber}
                                </div>
                                <span><strong>Status:</strong> {order.status}</span>
                            </div>

                            {/* Dropdown Menu */}
                            <div className="dropdown-container">
                                <label>Select Delivery Person:</label>
                                <select
                                    className="dropdown-select"
                                    value={selectedOption[order.orderId] || ''}
                                    onChange={(e) => handleDropdownChange(order.orderId, e.target.value)}
                                >
                                    <option value="">Select</option>
                                    {deliveryPerson.map((person, i) => (
                                        <option key={i} value={`${person.firstName} ${person.lastName}, ${person.city}`}>
                                            {`Name: ${person.firstName} ${person.lastName}, City: ${person.city} Pincode: ${person.pincode}, Email: ${person.email}`}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Approve Order Button */}
                            <button className="approve-btn" onClick={() => handleApproveOrder(order.orderId)}>
                                Approve Order
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AdminOrder;
