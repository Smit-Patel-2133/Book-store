// import { useState } from 'react';
// import { useDispatch } from 'react-redux';
// import './Login.css';
// import React from 'react';
// import l1 from '../../assets/images/login/loginpage.png';
// import { useNavigate } from 'react-router-dom';
// import { currentUser } from '../../features/authentication/auth.js';
// import CryptoJS from 'crypto-js';

// const SECRET_KEY = 'your-secret-key'; 

// const Login = () => {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [error, setError] = useState('');
//     const navigate = useNavigate();
//     const dispatch = useDispatch();

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         try {
//             const response = await fetch('http://localhost:3000/api/auth/login', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({ email, password }),
//             });

//             const data = await response.json();
//             if (response.ok) {
//                 const { username, userEmail, profile_pic } = data;

                
//                 const userData = {
//                     name: username,
//                     email: userEmail,
//                     profilePicture: profile_pic,
//                     expiration: new Date().getTime() + 15 * 24 * 60 * 60 * 1000,
//                 };
//                 const encryptedData = CryptoJS.AES.encrypt(JSON.stringify(userData), SECRET_KEY).toString();
//                 localStorage.setItem('user', encryptedData);

//                 dispatch(currentUser({
//                     name: username,
//                     email: userEmail,
//                     profilePicture: profile_pic,
//                 }));
//                 navigate('/home_page');
//             } else {
//                 console.error('Login failed:', data);
//                 setError(data.error || 'Login failed. Please try again.');
//             }
//         } catch (error) {
//             console.error('Fetch error:', error);
//             setError('An error occurred. Please try again later.');
//         }
//     };

//     return (
//         <div className="login-container">
//             <div className="login-box">
//                 <h2>Login</h2>
//                 {error && <p className="error-message">{error}</p>}
//                 <form onSubmit={handleSubmit}>
//                     <div className="input-group">
//                         <label>Email</label>
//                         <input
//                             type="email"
//                             placeholder="Enter your email"
//                             value={email}
//                             onChange={(e) => setEmail(e.target.value)}
//                         />
//                     </div>
//                     <div className="input-group">
//                         <label>Password</label>
//                         <input
//                             type="password"
//                             placeholder="Enter your password"
//                             value={password}
//                             onChange={(e) => setPassword(e.target.value)}
//                         />
//                     </div>
//                     <button type="submit" className="Login-Button">Login</button>
//                 </form>
//                 <div>
//                     <h6>Don’t have an account?</h6>
//                     <button
//                         type="button"
//                         className="SignUp-Button -mt-4 -ml-4"
//                         onClick={() => navigate('/signup')}
//                     >
//                         Sign Up
//                     </button>
//                 </div>
//             </div>
//             <div className="login-image">
//                 <img src={l1} alt="Login" />
//             </div>
//         </div>
//     );
// };

// export default Login;


import { useState } from 'react';
import { useDispatch } from 'react-redux';
import './Login.css';
import React from 'react';
import l1 from '../../assets/images/login/loginpage.png';
import { NavLink, useNavigate } from 'react-router-dom';
import { currentUser } from '../../features/authentication/auth.js';
import CryptoJS from 'crypto-js';

const SECRET_KEY = 'your-secret-key'; // Same key used for encryption

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            setError('Please fill in both fields.');
            return;
        }

        try {
            const response = await fetch('http://localhost:3000/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();
            if (response.ok) {
                const { username, userEmail, profile_pic } = data;

                // Encrypt user data and store it in local storage
                const userData = {
                    name: username,
                    email: userEmail,
                    profilePicture: profile_pic,
                    expiration: new Date().getTime() + 15 * 24 * 60 * 60 * 1000,
                };
                const encryptedData = CryptoJS.AES.encrypt(JSON.stringify(userData), SECRET_KEY).toString();
                localStorage.setItem('user', encryptedData);

                dispatch(currentUser({
                    name: username,
                    email: userEmail,
                    profilePicture: profile_pic,
                }));
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
                    <button type="submit" className="login-button">Login</button>
                </form>
                <div>
                    <h5>Don’t have an account?</h5>
                    <NavLink className="sign-up-navlink"
                        onClick={() => navigate('/signup')}
                    >
                        Sign Up
                    </NavLink>
                </div>
            </div>
            
        </div>
    );
};

export default Login;
