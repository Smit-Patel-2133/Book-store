import { useState } from 'react';
import { useDispatch } from 'react-redux';
import './Login.css';
import React from 'react';

import l1 from '../../assets/images/login/loginpage.png';
import { useNavigate } from 'react-router-dom';
import { currentUser } from '../../features/authentication/auth.js';
import im from '../../assets/images/profile/1.png'
const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:3000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();
            if (response.ok) {
                const { username, userEmail, profile_pic } = data;
                const profilePicturePath = await import(`../../assets/images/profile/${profile_pic}.png`);
                dispatch(currentUser({ name: username, email: userEmail, profilePicture: profilePicturePath.default }));

                navigate('/home_page');
            } else {
                console.error('Login failed:', data);
                setError(data.error || 'Login failed. Please try again.');
            }
        } catch (error) {
            console.error('Fetch error:', error);
            setError('An error occurred. Please try again later.');
        }
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <h2>Login</h2>
                {error && <p className="error-message">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label>Email</label>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="input-group">
                        <label>Password</label>
                        <input
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="Login-Button">Login</button>
                </form>
                <div>
                    <h6>Don’t have an account?</h6>
                    <button
                        type="button"
                        className="SignUp-Button -mt-4 -ml-4"
                        onClick={() => navigate('/signup')}
                    >
                        Sign Up
                    </button>
                </div>
            </div>
            <div className="login-image">
                <img src={l1} alt="Login" />
            </div>
        </div>
    );
};

export default Login;
