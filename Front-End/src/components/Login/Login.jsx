import React from 'react';
import './Login.css';
import l1 from '../../assets/images/login/loginpage.png'
const Login = () => {
    return (
        <div className="login-container">
            <div className="login-box">
                <h2>Login</h2>
                <form>
                    <div className="input-group">
                        <label>Email</label>
                        <input type="email" placeholder="Enter your email" />
                    </div>
                    <div className="input-group">
                        <label>Password</label>
                        <input type="password" placeholder="Enter your password" />
                    </div>
                    <button type="submit">Login</button>
                </form>
            </div>
            <div className="login-image">
                <img src={l1} alt="Login" />
            </div>
        </div>
    );
};

export default Login;
