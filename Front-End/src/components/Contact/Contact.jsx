import React, { useState } from 'react';
import './Contact.css'; // Separate CSS for better organization.
import Footer from "../Footer/Footer.jsx";
import NavigationBar from '../NavigationBar/NavigationBar.jsx';
import axios from "axios";

const Contact = () => {
    const [formData, setFormData] = useState({
        email: '',
        phone: '',
        message: '',
    });

    const [responseMessage, setResponseMessage] = useState('');

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/api/homepage/contact', formData);
            if (response.status === 200) {
                setResponseMessage('Your message has been sent successfully!');
                setFormData({ email: '', phone: '', message: '' }); // Reset form
            }
        } catch (error) {
            setResponseMessage(
                error.response?.data?.message || 'Failed to send message. Please try again later.'
            );
        }
    };

    return (
        <>
            {/* Uncomment if NavigationBar is needed */}
            {/* <NavigationBar /> */}
            <div className="container">
                <div className="form">
                    <div className="contact-info">
                        <h3 className="title">We’d Love to Hear From You</h3>
                        <p className="text">
                            Have questions about our books, recommendations, or any issues? Reach out to us, and we’ll
                            get back to you soon!
                        </p>

                        <div className="info">
                            <div className="information">
                                <p>123 Book Lane, Readville, NY 12345</p>
                            </div>
                            <div className="information">
                                <p>support@bookworld.com</p>
                            </div>
                            <div className="information">
                                <p>+1 (800) 555-BOOK</p>
                            </div>
                        </div>

                        <div className="social-media">
                            <br/>
                            <div className="credit">
                                Made with <span style={{ color: 'tomato' }}>❤</span> by <a
                                href="http://localhost:5173/">Stories</a>
                            </div>
                        </div>
                    </div>

                    <div className="contact-form">
                        <span className="circle one"></span>
                        <span className="circle two"></span>

                        <form onSubmit={handleSubmit} autoComplete="off">
                            <h3 className="title">Contact Us</h3>

                            <div className="input-container">
                                <input
                                    type="email"
                                    name="email"
                                    className="input"
                                    required
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder=" "
                                />
                                <label htmlFor="email">Email Address</label>
                            </div>
                            <div className="input-container">
                                <input
                                    type="tel"
                                    name="phone"
                                    className="input"
                                    required
                                    value={formData.phone}
                                    onChange={handleChange}
                                    placeholder=" "
                                />
                                <label htmlFor="phone">Phone Number</label>
                            </div>
                            <div className="input-container textarea">
                            <textarea
                                name="message"
                                className="input"
                                required
                                value={formData.message}
                                onChange={handleChange}
                                placeholder=" "
                            ></textarea>
                                <label htmlFor="message">Your Message</label>
                            </div>
                            <input type="submit" value="Send Message" className="btn" />
                        </form>

                        {responseMessage && <p className="response-message">{responseMessage}</p>}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Contact;
