import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Overview = () => {
    const [stats, setStats] = useState({
        totalSales: 0,
        totalUsers: 0,
        newUsers: 0,
        totalBooks: 0,
        newBooks: 0,
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.post('http://localhost:3000/api/admin/overview');
                setStats(response.data);
            } catch (error) {
                console.error('Error fetching stats:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <>
            <div className="overview">
                <div className="stat-box">
                    <h3>Total Sales</h3>
                    <p>Rs. {stats.totalSales.toLocaleString()}</p>
                </div>
                <div className="stat-box">
                    <h3>Total Users</h3>
                    <p>{stats.totalUsers} User</p>
                </div>
                <div className="stat-box">
                    <h3>New Users</h3>
                    <p>{stats.newUsers} User</p>
                </div>
                <div className="stat-box">
                    <h3>Total Books</h3>
                    <p>{stats.totalBooks} New</p>
                </div>
            </div>
            {/*<div className="overview">*/}
            {/*    <div className="stat-box">*/}
            {/*        <h3>New Books</h3>*/}
            {/*        <p>{stats.newBooks} New</p>*/}
            {/*    </div>*/}
            {/*</div>*/}
        </>
    );
};

export default Overview;
