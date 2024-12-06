import React from 'react';
import { Line, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend);

const lineData = {
    labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'],
    datasets: [
        {
            label: 'Current Week',
            data: [3000, 6000, 8000, 9000, 7000, 4000, 1000],
            borderColor: 'green',
            borderWidth: 2,
            fill: false,
        },
        {
            label: 'Previous Week',
            data: [1000, 3000, 4000, 5000, 6000, 7000, 8000],
            borderColor: 'lightgray',
            borderWidth: 2,
            borderDash: [5, 5],
            fill: false,
        },
    ],
};

const barData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
        {
            label: 'Users',
            data: [30, 45, 60, 50, 70, 20, 80],
            backgroundColor: 'green',
        },
    ],
};

const ChartsSection = () => {
    return (
        <div className="charts-section">
            <div className="chart-container">
                <h3>Profit Chart </h3>
                <Line data={lineData} />
            </div>
            <div className="chart-container">
                <h3>User Chart </h3>
                <Bar data={barData} />
            </div>
        </div>
    );
};

export default ChartsSection;
