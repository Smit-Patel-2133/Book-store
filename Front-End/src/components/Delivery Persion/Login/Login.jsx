import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { setDeliveryPerson } from '../../../features/DeliveryPerson/DeliverPerson.js';
import './Login.css';

const DeliveryPersonLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogin = async (e) => {
        e.preventDefault();
        console.log(email, "   ,   ", password);
        try {
            const response = await axios.post('http://localhost:3000/api/DeliveryPerson/Deliverylogin', {
                email,
                password,
            });

            // If login is successful, store user data in Redux and navigate
            if (response.data.success) {
                dispatch(setDeliveryPerson(response.data.user)); // Store user data in Redux
                navigate('/deliveryDashboard');
            } else {
                setErrorMessage(response.data.message);
            }
        } catch (error) {
            console.error('Login error:', error);
            setErrorMessage(error.response?.data?.message || 'An error occurred. Please try again.');
        }
    };

    const handleSignup = () => {
        navigate('/DeliveryPersonSignup');
    };

    return (
        <div className='admin-login-container'>
            <div className='admin-login-card'>
                <h2 className='admin-login-title'>Delivery Person Login</h2>

                <form onSubmit={handleLogin}>
                    <div className='admin-login-input-group'>
                        <label className='admin-login-label' htmlFor="email">Email</label>
                        <input
                            type="text"
                            name="email"
                            id="email"
                            placeholder='Email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className='admin-login-input'
                        />
                    </div>
                    <div className='admin-login-input-group'>
                        <label className='admin-login-label' htmlFor="password">Password</label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            placeholder='Password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className='admin-login-input'
                        />
                    </div>
                    {errorMessage && <p className='error-message'>{errorMessage}</p>}
                    <div className='admin-login-button-group'>
                        <button type='submit' className='admin-login-button'>
                            Login
                        </button>
                    </div>
                    <NavLink onClick={handleSignup}>Sign up</NavLink>
                </form>

                <p className='admin-login-footer'>©2025 Book Store. All rights reserved.</p>
            </div>
        </div>
    );
};

export default DeliveryPersonLogin;
