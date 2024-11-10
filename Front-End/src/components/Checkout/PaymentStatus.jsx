// PaymentStatus.js
import React from 'react';
import { useLocation, NavLink } from 'react-router-dom';
import './PaymentStatus.css';

const PaymentStatus = () => {
    const location = useLocation();
    const { status } = location.state || { status: 'Unknown' };
    console.log("from status component :-", status);
    return (
        <div className="payment-status-container">
            <h1 className={`payment-status-${status}`}>
                Payment {status === 'success' ? 'Successful' : 'Failed'}
            </h1>
            <NavLink to="/" className="back-to-home">
                Go to Home
            </NavLink>
        </div>
    );
};

export default PaymentStatus;
