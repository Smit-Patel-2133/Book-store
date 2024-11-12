import React, { useContext } from 'react';
import Sidebar from '../component/AdminSidebar.jsx';
import Header from '../component/AdminHeader.jsx';
import Overview from '../component/AdminOverview.jsx';
import ChartsSection from '../component/AdminChartsSection.jsx';
import './Dashboard.css';
import { BooksContext ,BooksProvider} from '../context/BooksContext.jsx'; // Import the context

const Dashboard = () => {
    const { books } = useContext(BooksContext); // Access books from context

    return (
        <div className="dashboard">
            <Sidebar books={books} /> {/* Pass books to Sidebar */}
            <div className="main-content">
                <Header />
                <Overview />

                <ChartsSection />
            </div>
        </div>
    );
};

export default Dashboard;
