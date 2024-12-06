import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Signup.css'; // Add your CSS file for styling

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
        pincode: '',
        password: '', // Add password field
        confirmPassword: '' // Add confirm password field
    });

    const [errors, setErrors] = useState({
        form: '',
        password: '' // Add password error state
    });
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const missingFields = Object.keys(formData).some(
            (key) => formData[key] === '' || formData[key] === null
        );

        if (missingFields) {
            setErrors({ form: 'All fields are required.' });
            return;
        }

        // Check if passwords match
        if (formData.password !== formData.confirmPassword) {
            setErrors({ ...errors, password: 'Passwords do not match.' });
            return;
        }

        try {
            const response = await axios.post('http://localhost:3000/api/deliveryPerson/register', formData);

            setMessage('Registration successful! You will be redirected to the login page soon.');
            setTimeout(() => {
                navigate('/DelivertPersionLogin');
            }, 1000);
        } catch (error) {
            console.error('Error submitting form data:', error);
            const errorMessage = error.response?.data?.message || 'An error occurred. Please try again.';
            setMessage(errorMessage);
        }
    };

    return (
        <div className="signup-page">
            <h2 className="signup-title">Delivery Partner Signup</h2>
            <form className="signup-form" onSubmit={handleSubmit}>
                <label className="signup-label">First Name:
                    <input
                        className="signup-input"
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label className="signup-label">Last Name:
                    <input
                        className="signup-input"
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label className="signup-label">Email:
                    <input
                        className="signup-input"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label className="signup-label">Mobile Number:
                    <input
                        className="signup-input"
                        type="text"
                        name="mobileNumber"
                        value={formData.mobileNumber}
                        onChange={handleChange}
                        required
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
                    />
                </label>
                <label className="signup-label">Driver License Number:
                    <input
                        className="signup-input"
                        type="text"
                        name="driverLicenseNumber"
                        value={formData.driverLicenseNumber}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label className="signup-label">State:
                    <input
                        className="signup-input"
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label className="signup-label">City:
                    <input
                        className="signup-input"
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label className="signup-label">Pincode:
                    <input
                        className="signup-input"
                        type="text"
                        name="pincode"
                        value={formData.pincode}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label className="signup-label">Password:
                    <input
                        className="signup-input"
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label className="signup-label">Confirm Password:
                    <input
                        className="signup-input"
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                    />
                </label>
                {errors.password && <p className="error-text">{errors.password}</p>}
                {errors.form && <p className="error-text">{errors.form}</p>}
                <button className="signup-button" type="submit">Submit Application</button>
            </form>
            {message && <p className="message-text">{message}</p>}
        </div>
    );
};

export default Signup;
