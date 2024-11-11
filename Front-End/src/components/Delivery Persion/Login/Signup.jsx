import React, { useState } from 'react';
import axios from 'axios';
import './Signup.css';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        mobileNumber: '',
        adharCardNumber: '',
        driverLicenseNumber: '',
        state: '',
        city: '',
        pincode: ''
    });
    const [errors, setErrors] = useState({
        form: ''
    });
    const [message, setMessage] = useState('');  // State to hold the message
    const navigate = useNavigate(); // React Router's navigate function for redirection

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Check for missing fields
        const missingFields = Object.keys(formData).some(
            (key) => formData[key] === '' || formData[key] === null
        );

        if (missingFields) {
            setErrors({ ...errors, form: 'All fields are required.' });
            return;
        }

        try {
            const response = await axios.post('http://localhost:3000/api/deliveryPerson/register', formData);
            console.log('Form data submitted successfully:', response.data);

            if (response.data.message === 'Email is already registered.') {
                // Set the message for already registered email
                setMessage('Email is already registered. You will be redirected to the login page soon.');
                setTimeout(() => {
                    navigate('/deliveryPersonLogin'); // Redirect to login page after a delay
                }, 4000);
            } else {
                // Set the message for successful registration
                setMessage('Registration successful! You will be redirected to the login page soon.');
                setTimeout(() => {
                    navigate('/deliveryPersonLogin'); // Redirect to login page
                }, 4000);
            }
        } catch (error) {
            console.error('Error submitting form data:', error);
            setMessage('An error occurred. Please try again.');
        }
    };

    return (
        <div className="signup-page">
            <h2 className="signup-title">Delivery Partner Signup</h2>
            <form className="signup-form" onSubmit={handleSubmit}>
                <label className="signup-label">First Name:
                    <input className="signup-input" type="text" name="firstName" value={formData.firstName} onChange={handleChange} required />
                </label>
                <label className="signup-label">Last Name:
                    <input className="signup-input" type="text" name="lastName" value={formData.lastName} onChange={handleChange} required />
                </label>
                <label className="signup-label">Email:
                    <input className="signup-input" type="email" name="email" value={formData.email} onChange={handleChange} required />
                </label>
                <label className="signup-label">Mobile Number:
                    <input
                        className="signup-input"
                        type="tel"
                        name="mobileNumber"
                        value={formData.mobileNumber}
                        onChange={handleChange}
                        required
                        pattern="[0-9]{10}"
                        maxLength="10"
                        title="Please enter a 10-digit mobile number"
                    />
                </label>
                <label className="signup-label">Aadhaar Card Number:
                    <input
                        className="signup-input"
                        type="text"
                        name="adharCardNumber"
                        value={formData.adharCardNumber}
                        onChange={handleChange}
                        required
                        pattern="[0-9]{12}"
                        maxLength="12"
                        title="Please enter a 12-digit Aadhaar number"
                    />
                </label>
                <label className="signup-label">Driver's License Number:
                    <input
                        className="signup-input"
                        type="text"
                        name="driverLicenseNumber"
                        value={formData.driverLicenseNumber}
                        onChange={handleChange}
                        required
                        maxLength="16"
                        title="Please enter a 16-character driver's license number"
                    />
                </label>
                <label className="signup-label">State:
                    <input className="signup-input" type="text" name="state" value={formData.state} onChange={handleChange} required />
                </label>
                <label className="signup-label">City:
                    <input className="signup-input" type="text" name="city" value={formData.city} onChange={handleChange} required />
                </label>
                <label className="signup-label">Pincode:
                    <input
                        className="signup-input"
                        type="text"
                        name="pincode"
                        value={formData.pincode}
                        onChange={handleChange}
                        required
                        pattern="[0-9]{6}"
                        maxLength="6"
                        title="Please enter a 6-digit pincode"
                    />
                </label>
                {errors.form && <p className="error-text">{errors.form}</p>}
                <button className="signup-button" type="submit">Submit Application</button>
            </form>

            {/* Show the message based on the result */}
            {message && <p className="message-text">{message}</p>}
        </div>
    );
};

export default Signup;
