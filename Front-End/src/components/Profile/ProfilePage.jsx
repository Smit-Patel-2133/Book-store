import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ProfilePage.css';
import NavigationBar from "../NavigationBar/NavigationBar.jsx";
import { useSelector } from "react-redux";

const ProfilePage = () => {
    const [userData, setUserData] = useState(null);
    const [profilePic, setProfilePic] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);  // State for handling errors
    const user = useSelector(state => state.user_info.auth);

    useEffect(() => {
        // Fetch user data if not already cached in localStorage
        const cachedUserData = JSON.parse(localStorage.getItem('userData'));
        const cachedProfilePic = localStorage.getItem('profilePic');

        if (cachedUserData && cachedProfilePic) {
            setUserData(cachedUserData);
            setProfilePic(cachedProfilePic);
            setLoading(false);
        } else {
            // Define an async function to fetch user data
            const fetchUserData = async () => {
                try {
                    const response = await axios.post('http://localhost:3000/api/profile/getuserInfo', {
                        email: user.email // Pass email as a query parameter
                    });
                    const userData = response.data;
                    setUserData(userData); // Update userData with response data

                    // Dynamically set the profile picture URL
                    let profilePicUrl = `/assets/images/profile/${userData.user_profilePic}.png`;

                    // Check if the image exists and handle the fallback
                    const image = new Image();
                    image.src = profilePicUrl;
                    image.onload = () => {
                        setProfilePic(profilePicUrl); // Set the valid profile picture
                        localStorage.setItem('profilePic', profilePicUrl); // Cache the profile pic
                    };
                    image.onerror = () => {
                        setProfilePic('/assets/images/profile/default.png'); // Fall back to default image
                        localStorage.setItem('profilePic', '/assets/images/profile/default.png'); // Cache default image
                    };

                    // Cache the user data for future use
                    localStorage.setItem('userData', JSON.stringify(userData));

                    setLoading(false);  // Set loading to false once the data is fetched
                } catch (error) {
                    console.error("Error fetching user data:", error);
                    setError("Failed to load user data. Please try again later.");
                    setLoading(false);
                }
            };

            fetchUserData();
        }
    }, [user.email]);

    // If data is loading, show a loading spinner or message
    if (loading) {
        return <p>Loading...</p>;
    }

    // If there's an error, display an error message
    if (error) {
        return <p>{error}</p>;
    }

    return (
        <>
            <NavigationBar />
            <div className="profile-page">
                <div className="profile-header">
                    <img src={profilePic} alt="Profile" className="profile-pic" />
                    <h2 className="profile-username">{userData.username}</h2>
                    <p className="profile-email">{userData.email}</p>
                </div>
                <div className="profile-details">
                    <h3>Address Details</h3>
                    <p><strong>House:</strong> {userData.address.house_detail}</p>
                    <p><strong>Area:</strong> {userData.address.areaDetail}</p>
                    <p><strong>Landmark:</strong> {userData.address.landmark}</p>
                    <p><strong>Pincode:</strong> {userData.address.pincode}</p>
                    <p><strong>City:</strong> {userData.address.city}</p>
                    <p><strong>State:</strong> {userData.address.state}</p>
                    <p><strong>Mobile Number:</strong> {userData.mobileNumber}</p>
                </div>
            </div>
        </>
    );
};

export default ProfilePage;
