import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './DeliveryDashboard.css';
import axios from 'axios';

const DeliveryDashboard = () => {
    const dispatch = useDispatch();
    const deliveryPerson = useSelector(state => state.deliveryPerson.details);
    const [orderDetails, setOrderDetails] = useState([]);
    const [statusMessages, setStatusMessages] = useState({});
    const [visibleButtons, setVisibleButtons] = useState({});

    // Fetch order details when component mounts
    const getDetails = async () => {
        try {
            const res = await axios.post(`http://localhost:3000/api/DeliveryPerson/getDetails`, {
                email: deliveryPerson.email
            });
            setOrderDetails(res.data);
        } catch (error) {
            console.error('Error fetching order details:', error);
        }
    };

    useEffect(() => {
        if (deliveryPerson?.status === 'Approved') {
            getDetails();
        }
    }, [deliveryPerson]);

    const handleOrderReceived = async (orderId) => {
        setStatusMessages(prevState => ({
            ...prevState,
            [orderId]: 'Order Received: Your order has been received. Proceed to delivery.'
        }));
        try {
            await axios.post(`http://localhost:3000/api/DeliveryPerson/OrderStatus`, { orderId, status: 'Shipped' });
        } catch (err) {
            console.log(err);
        }
        setVisibleButtons(prevState => ({
            ...prevState,
            [orderId]: { step: 2 }
        }));
    };

    const handleOutForDelivery = async (orderId) => {
        setStatusMessages(prevState => ({
            ...prevState,
            [orderId]: 'Out for Delivery: The order is now out for delivery.'
        }));
        try {
            await axios.post(`http://localhost:3000/api/DeliveryPerson/OrderStatus`, { orderId, status: 'Out for Delivery' });
        } catch (err) {
            console.log(err);
        }
        setVisibleButtons(prevState => ({
            ...prevState,
            [orderId]: { step: 3 }
        }));
    };

    const handleOrderComplete = async (orderId) => {
        setStatusMessages(prevState => ({
            ...prevState,
            [orderId]: 'Order Complete: The order has been successfully delivered and completed.'
        }));
        try {
            await axios.post(`http://localhost:3000/api/DeliveryPerson/OrderStatus`, { orderId, status: 'Delivered' });
        } catch (err) {
            console.log(err);
        }
    };

    // Conditional rendering based on the deliveryPerson's status
    if (!deliveryPerson) {
        return (
            <div className="dashboard-container loading">
                <h1>Loading...</h1>
                <div>Please wait while we fetch your details.</div>
            </div>
        );
    }

    const status = deliveryPerson.status;

    if (status === 'Pending' || status === 'Rejected') {
        let statusMessage = '';
        let additionalMessage = '';

        if (status === 'Pending') {
            statusMessage = 'Pending';
            additionalMessage = 'Your request is under review. Please wait for further updates.';
        } else if (status === 'Rejected') {
            statusMessage = 'Rejected';
            additionalMessage = 'Unfortunately, your request has been rejected. Please contact support for more information.';
        }

        return (
            <div className={`dashboard-container ${status.toLowerCase()}`}>
                <h1 className="status-text">{statusMessage}</h1>
                <div className="status-message">{additionalMessage}</div>
            </div>
        );
    }

    if (status === 'Approved') {
        return (
            <div className="dashboard-container approved">
                <h1>Welcome, {deliveryPerson.name}!</h1>
                <h2>Order Details</h2>
                {orderDetails.length > 0 ? (
                    orderDetails.map((order, index) => (
                        <div key={index} className="order-details">
                            <h3>Order ID: {order.orderId}</h3>
                            <p><strong>User ID:</strong> {order.userId}</p>
                            <p><strong>Mobile Number:</strong> {order.mobileNumber}</p>
                            <h4>Items:</h4>
                            <ul>
                                {order.items.map((item, itemIndex) => (
                                    <li key={itemIndex}><h4>{itemIndex + 1}</h4>{item.title}</li>
                                ))}
                            </ul>
                            <div className="status-buttons">
                                {visibleButtons[order.orderId]?.step !== 2 && (
                                    <button onClick={() => handleOrderReceived(order.orderId)}>Order Received</button>
                                )}
                                {visibleButtons[order.orderId]?.step === 2 && (
                                    <button onClick={() => handleOutForDelivery(order.orderId)}>Out for Delivery</button>
                                )}
                                {visibleButtons[order.orderId]?.step === 3 && (
                                    <button onClick={() => handleOrderComplete(order.orderId)}>Order Complete</button>
                                )}
                            </div>
                            <div className="status-info">
                                <h2>Current Status: {statusMessages[order.orderId] || 'Status not updated yet.'}</h2>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No order details found for this delivery person.</p>
                )}
            </div>
        );
    }

    return null; // Fallback, should not reach here
};

export default DeliveryDashboard;
