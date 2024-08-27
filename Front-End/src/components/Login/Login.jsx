import React from 'react';
import './Login.css';
import l1 from '../../assets/images/login/loginpage.png';
import {useNavigate} from 'react-router-dom'; // Correctly import useNavigate

const Login = () => {
    const navigate = useNavigate();

    return (
        <div className="login-container">
            <div className="login-box">
                <h2>Login</h2>
                <form>
                    <div className="input-group">
                        <label>Email</label>
                        <input type="email" placeholder="Enter your email"/>
                    </div>
                    <div className="input-group">
                        <label>Password</label>
                        <input type="password" placeholder="Enter your password"/>
                    </div>
                    <button type="submit" className="Login-Button">Login</button>

                </form>
                <div className={'flex'}><h6>Don’t have an account?</h6> {/* Fixed typo in "Don’t" */}
                    <button
                        type="button" // Add type="button" to prevent form submission
                        className="SignUp-Button -mt-4" // New class name for the Sign Up button
                        onClick={() => navigate('/signUp')} // Corrected onClick handler
                    >
                        Sign Up
                    </button>
                </div>
            </div>
            <div className="login-image">
                <img src={l1} alt="Login"/>
            </div>
        </div>
    );
};

export default Login;
