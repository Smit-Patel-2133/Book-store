import React, { useState } from 'react';
import {NavLink, useNavigate} from 'react-router-dom';
import './Login.css'; // Import the external CSS file

const AdminLogin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();

        // Predefined admin credentials
        const adminUsername = 'admin@storys.com';
        const adminPassword = 'admin@123';

        if (username === adminUsername && password === adminPassword) {
            // Navigate to the admin dashboard
            navigate('/admindashboard');
        } else {
            // Set an error message if the credentials don't match
            setErrorMessage('Invalid username or password');
        }
    };
const handleSignup=()=>{
    navigate('/DeliveryPersionSignup');
}
    return (
        <div className='admin-login-container'>
            <div className='admin-login-card'>
                <h2 className='admin-login-title'>Delivery Person Login</h2>

                <form onSubmit={handleLogin}>
                    <div className='admin-login-input-group'>
                        <label className='admin-login-label' htmlFor="username">Username</label>
                        <input
                            type="text"
                            name="username"
                            id="username"
                            placeholder='username'
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
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
                    <NavLink onClick={handleSignup}>signup</NavLink>
                </form>

                <p className='admin-login-footer'>©2025 Book Store. All rights reserved.</p>
            </div>
        </div>
    );
};

export default AdminLogin;
