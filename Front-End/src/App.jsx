import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { currentUser } from './features/authentication/auth.js';
import { fetchCartItems } from './features/Cart_Items/cart.js'; // Import fetchCartItems
import CryptoJS from 'crypto-js';
import { useNavigate, Outlet } from 'react-router-dom';

const SECRET_KEY = 'your-secret-key'; // Use environment variable for secret key

const App = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const encryptedData = localStorage.getItem('user');
        if (encryptedData) {
            try {
                const bytes = CryptoJS.AES.decrypt(encryptedData, SECRET_KEY);
                const userData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

                const currentTime = new Date().getTime();
                if (currentTime < userData.expiration) {
                    // Dispatch the user data to Redux
                    dispatch(currentUser({
                        name: userData.name,
                        email: userData.email,
                        profilePicture: userData.profilePicture,
                    }));

                    // Fetch cart items for the user and store in Redux
                    dispatch(fetchCartItems(userData.email)); // Pass userId/email for fetching cart
                } else {
                    // If session expired, redirect to login
                    localStorage.removeItem('user');
                    navigate('/login');
                }
            } catch (error) {
                console.error('Error decrypting user data:', error);
                localStorage.removeItem('user');
            }
        }
    }, [dispatch, navigate]);

    return (
        <>
            <Outlet />
        </>
    );
};

export default App;
