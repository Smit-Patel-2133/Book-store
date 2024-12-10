import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AdminSidebar from "../AdminSidebar.jsx";
import './AdminContactFromUser.css'; // Import the CSS file

const AdminContactFromUser = () => {
    const [contactDetails, setContactDetails] = useState([]);

    const fetchContactDetails = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/homepage/contact-details');
            console.log("Response:", response.data);
            if (response.data && response.data.length > 0) {
                setContactDetails(response.data);
            } else {
                console.log("No contact details found.");
            }
        } catch (error) {
            console.log("Error fetching contact details:", error);
        }
    };

    useEffect(() => {
        fetchContactDetails();
    }, []);

    return (
        <div className="admin-container">
            <AdminSidebar />
            <div className="contact-details-container">
                {contactDetails.length > 0 ? (
                    <div className="contact-entry-wrapper">
                        <h2>Contact Details</h2>
                        {contactDetails.map((contact, index) => {
                            if (!contact) {
                                console.log("Invalid contact data at index", index);
                                return null;
                            }
                            return (
                                <div key={contact._id} className="contact-entry">
                                    <p><strong>Email:</strong> {contact.email}</p>
                                    <p><strong>Phone:</strong> {contact.phone}</p>
                                    <p><strong>Message:</strong> {contact.message}</p>
                                    <p><strong>Created At:</strong> {new Date(contact.createdAt).toLocaleString()}</p>
                                    <hr />
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <p>Loading contact details...</p>
                )}
            </div>
        </div>
    );
};

export default AdminContactFromUser;
