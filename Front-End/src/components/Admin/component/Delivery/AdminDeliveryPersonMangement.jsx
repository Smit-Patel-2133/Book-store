import React, { useEffect, useState } from 'react';
import AdminSidebar from '../AdminSidebar.jsx';
import axios from 'axios';
import './AdminDeliveryPersonManagement.css';

const AdminDeliveryPersonManagement = () => {
    const [applicationState, setApplicationState] = useState([]);
    const [message, setMessage] = useState('');

    // Fetch delivery person data
    const getDetails = async () => {
        try {
            const res = await axios.get('http://localhost:3000/api/admin/deliveryPerson');
            setApplicationState(res.data); // Save the data to the state
        } catch (e) {
            console.error('Error fetching delivery person details:', e);
        }
    };

    // Approve a delivery person
    const handleApprove = async (email) => {
        try {
            const res = await axios.post('http://localhost:3000/api/admin/deliveryPerson/approve', { email });
            console.log("Approval response:", res.data.message);
            setMessage(res.data.message); // Show success message
            setTimeout(() => setMessage(''), 3000); // Clear message after 3 seconds
            getDetails(); // Refresh the data after approval
        } catch (e) {
            console.error('Error approving request:', e);
            setMessage('Failed to approve request.');
            setTimeout(() => setMessage(''), 3000); // Clear message after 3 seconds
        }
    };

    // Reject a delivery person
    const handleReject = async (email) => {
        try {
            const res = await axios.post('http://localhost:3000/api/admin/deliveryPerson/reject', { email });
            console.log("Rejection response:", res.data.message);
            setMessage(res.data.message); // Show success message
            setTimeout(() => setMessage(''), 3000); // Clear message after 3 seconds
            getDetails(); // Refresh the data after rejection
        } catch (e) {
            console.error('Error rejecting request:', e);
            setMessage('Failed to reject request.');
            setTimeout(() => setMessage(''), 3000); // Clear message after 3 seconds
        }
    };

    // Fetch details on component mount
    useEffect(() => {
        getDetails();
    }, []);

    return (
        <div className="admin-container">
            <AdminSidebar />

            <div className="content">
                <div>
                    {message && (
                        <div className="notification">
                            {message}
                        </div>
                    )}
                </div>
                <h1 className="header">Pending Delivery Person Requests</h1>
                <ul className="person-list">
                    {applicationState.map((person) => (
                        <li key={person._id} className="person-card">
                            <p><strong>First Name:</strong> {person.firstName}</p>
                            <p><strong>Last Name:</strong> {person.lastName}</p>
                            <p><strong>Email:</strong> {person.email}</p>
                            <p><strong>Mobile Number:</strong> {person.mobileNumber}</p>
                            <p><strong>Adhar Card Number:</strong> {person.adharCardNumber}</p>
                            <p><strong>Driver License Number:</strong> {person.driverLicenseNumber}</p>
                            <p><strong>State:</strong> {person.state}</p>
                            <p><strong>City:</strong> {person.city}</p>
                            <p><strong>Pincode:</strong> {person.pincode}</p>
                            <p><strong>Status:</strong> {person.status}</p>
                            <div className="button-group">
                                <button
                                    className="approve-button"
                                    onClick={() => handleApprove(person.email)}
                                >
                                    Approve
                                </button>
                                <button
                                    className="reject-button"
                                    onClick={() => handleReject(person.email)}
                                >
                                    Reject
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};
export default AdminDeliveryPersonManagement;
