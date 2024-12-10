import { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import CryptoJS from 'crypto-js';
import './SignUp.css';
import s1 from '../../assets/images/login/loginpage.png';

const SECRET_KEY = 'your-secret-key'; // Change this to a more secure key

const Signup = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isPasswordValid, setIsPasswordValid] = useState(false);

    // Function to validate password strength
    const validatePassword = (password) => {
        const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return passwordRegex.test(password);
    };

    useEffect(() => {
        setIsPasswordValid(validatePassword(password));
    }, [password]);

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            const signupResponse = await axios.post('http://localhost:3000/api/auth/signup', {
                username,
                email,
                password,
            });

            if (signupResponse.status === 201) {
                console.log('User registered successfully');

                // Encrypt user data and store it in local storage
                const userData = {
                    name: username,
                    email,
                    profilePicture: null,
                    expiration: new Date().getTime() + 15 * 24 * 60 * 60 * 1000,
                };
                const encryptedData = CryptoJS.AES.encrypt(JSON.stringify(userData), SECRET_KEY).toString();
                localStorage.setItem('user', encryptedData);

                navigate('/login');
            }
        } catch (error) {
            console.error('Error signing up user:', error);
            alert('User signup failed');
        }
    };

    return (
        <div className="signup-container">
            <div className="signup-box">
                <h2>Sign Up</h2>
                <form onSubmit={handleSignup}>
                    <div className="input-group">
                        <label>Username</label>
                        <input
                            type="text"
                            placeholder="Enter your username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <label>Email</label>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <label>Password</label>
                        <input
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        {!isPasswordValid && password && (
                            <p className="password-warning">
                                Password must be at least 8 characters long, contain one uppercase letter, one number, and one special character.
                            </p>
                        )}
                    </div>
                    <button
                        type="submit"
                        className="signup-button"
                        disabled={!isPasswordValid}
                    >
                        Sign Up
                    </button>
                </form>
                <div>
                    <h5>Already have an account?</h5>
                    <NavLink className="signup-link" onClick={() => navigate('/login')}>
                        Login
                    </NavLink>
                </div>
            </div>
        </div>
    );
};

export default Signup;
