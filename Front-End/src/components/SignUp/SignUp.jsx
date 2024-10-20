import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/api/auth/signup', {
                username,
                email,
                password,
            });
            if (response.status === 201) {
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

                navigate('/home_page');
            }
        } catch (error) {
            console.error('Error registering user:', error);
            alert('Failed to register user');
        }
    };

    return (
        <div className="signup-container">
            <div className="signup-image">
                <img src={s1} alt="Signup" />
            </div>
            <div className="signup-box">
                <h2>Sign Up</h2>
                <form onSubmit={handleSubmit}>
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
                    </div>
                    <button type="submit" className="signup-button">Sign Up</button>
                </form>
                <div>
                    <h6>Already have an account?</h6>
                    <button
                        type="button"
                        className="SignUp-Button"
                        onClick={() => navigate('/login')}
                    >
                        Login
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Signup;
