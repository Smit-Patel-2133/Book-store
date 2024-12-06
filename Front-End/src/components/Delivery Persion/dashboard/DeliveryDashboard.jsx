// DeliveryDashboard.js
import React from 'react';
import { useSelector } from 'react-redux';
import './DeliveryDashboard.css'; // Import the external CSS file

const DeliveryDashboard = () => {
    // Access the delivery person's details from the Redux store
    const deliveryPerson = useSelector(state => state.deliveryPerson.details);
    const status = deliveryPerson ? deliveryPerson.status : 'Pending'; // Default to 'Pending' if no data

    let statusMessage = '';
    let additionalMessage = '';

    switch (status) {
        case 'Pending':
            statusMessage = 'Pending';
            additionalMessage = 'Your request is under review. Please wait for further updates.';
            break;
        case 'Rejected':
            statusMessage = 'Rejected';
            additionalMessage = 'Unfortunately, your request has been rejected. Please contact support for more information.';
            break;
        case 'Approved':
            statusMessage = 'Approved';
            additionalMessage = 'Welcome! You are approved. More details will be provided soon.';
            break;
        default:
            statusMessage = 'Unknown';
            additionalMessage = 'An error occurred while fetching your status. Please try again later.';
    }

    return (
        <div className={`dashboard-container ${status.toLowerCase()}`}>
            <h1 className="status-text">{statusMessage}</h1>
            <div className="status-message">{additionalMessage}</div>
        </div>
    );
};

export default DeliveryDashboard;
