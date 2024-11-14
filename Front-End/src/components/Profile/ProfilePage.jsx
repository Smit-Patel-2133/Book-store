import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ProfilePage.css';
import NavigationBar from "../NavigationBar/NavigationBar.jsx";
import { useSelector } from "react-redux";
import profilePic from '../../assets/images/profile/4.png';

const ProfilePage = () => {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);  // State for handling errors
    const user = useSelector(state => state.user_info.auth);

    useEffect(() => {
        // Define an async function to fetch user data
        const fetchUserData = async () => {
            try {
                console.log("Fetching user data for email:", user.email);
                const response = await axios.post('http://localhost:3000/api/profile/userInfo', { email: user.email });
                const userData = response.data;
                console.log(userData);
                setUserData(userData); // Update userData with response data
                setLoading(false);  // Set loading to false once the data is fetched
            } catch (error) {
                console.error("Error fetching user data:", error);
                setLoading(false);
                setError("Failed to load user data. Please try again later.");
            }
        };

        if (user.email) {
            fetchUserData();
        }

    }, [user.email]); // Dependency array to re-fetch if user.email changes

    // If data is loading, show a loading spinner or message
    if (loading) {
        return <p>Loading...</p>;
    }

    // If there's an error, display an error message
    if (error) {
        return <p>{error}</p>;
    }

    // Default or static profile picture
    console.log(userData);

    return (
        <>
            <NavigationBar />
            <div className="profile-page">
                <div className="profile-header">
                    <img src={profilePic} alt="Profile" className="profile-pic" />
                    {userData ? (
                        <>
                            <h2 className="profile-username">{userData.username || 'Username not available'}</h2>
                            <p className="profile-email">{userData.email}</p>
                        </>
                    ) : (
                        <p>No user data available</p>
                    )}
                </div>
                {userData && userData.address && (
                    <div className="profile-details">
                        <h3>Address Details</h3>
                        <p><strong>House:</strong> {userData.address.house_detail || 'N/A'}</p>
                        <p><strong>Area:</strong> {userData.address.areaDetail || 'N/A'}</p>
                        <p><strong>Landmark:</strong> {userData.address.landmark || 'N/A'}</p>
                        <p><strong>Pincode:</strong> {userData.address.pincode || 'N/A'}</p>
                        <p><strong>City:</strong> {userData.address.city || 'N/A'}</p>
                        <p><strong>State:</strong> {userData.address.state || 'N/A'}</p>
                        <p><strong>Mobile Number:</strong> {userData.mobileNumber || 'N/A'}</p>
                    </div>
                )}
            </div>
        </>
    );
};

export default ProfilePage;
