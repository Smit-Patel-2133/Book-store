import React, { useState } from 'react';
import NavigationBar from "../NavigationBar/NavigationBar.jsx";
import "./Books.css";
import b1 from '../../assets/images/book demo/b1.jpeg'
import b3 from '../../assets/images/book demo/b3.jpeg'
import b2 from '../../assets/images/book demo/b2.jpg'
const booksData = [
    {
        title: "kafka on the shore",
        author: "Haruki Murakami",
        price: "£51.20",
        originalPrice: "£51.20",
        discount: "20%",
        imageUrl: b1
    },
    {
        title: "Norwegian Wood",
        author: "Haruki Murakami",
        price: "£51.20",
        originalPrice: "£51.20",
        discount: "20%",
        imageUrl: b2
    },
    {
        title: "Yog Viyog",
        author: "Kajal Oza Vaidya",
        price: "£51.20",
        originalPrice: "£51.20",
        discount: "20%",
        imageUrl: b3
    },
    {
        title: "kafka on the shore",
        author: "Haruki Murakami",
        price: "£51.20",
        originalPrice: "£51.20",
        discount: "20%",
        imageUrl: b1
    },
    {
        title: "Norwegian Wood",
        author: "Haruki Murakami",
        price: "£51.20",
        originalPrice: "£51.20",
        discount: "20%",
        imageUrl: b2
    },
    {
        title: "Yog Viyog",
        author: "Kajal Oza Vaidya",
        price: "£51.20",
        originalPrice: "£51.20",
        discount: "20%",
        imageUrl: b3
    }
];

const Books = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false); // Toggle this based on actual user status
    const categories = ['Fiction', 'Non-fiction', 'Science', 'History', 'Fantasy', 'Biography']; // Example categories

    return (
        <>
            <NavigationBar />
            <div className="main-container">
                <div className="header-group">
                    {/* Browse Categories Dropdown */}
                    <div className="browse-categories">
                        <select className="category-dropdown">
                            <option value="">Browse Categories</option>
                            {categories.map((category, index) => (
                                <option key={index} value={category}>{category}</option>
                            ))}
                        </select>
                    </div>

                    {/* Search Bar */}
                    <div className="search">
                        <input type="text" className="search-input" placeholder="Search for books..." />
                        <button className="search-button">
                            <i className="fas fa-search"></i> Search
                        </button>
                    </div>

                    {/* Shopping Cart */}
                    <div className="cart">
                        <butoon className="formate1"/>
                        <butoon className="formate2"/>
                        <button className="cart-info">
                            <i className="fas fa-shopping-cart"></i>
                            <span className="cart-text">Shopping Cart</span>
                            <span className="cart-total">
                                {isLoggedIn ? 'Total: ₹1200' : '0 ₹'}
                            </span>
                        </button>
                    </div>
                </div>
                <div className="books-container">

                    {booksData.map((book, index) => (
                        <div key={index} className="book-card">
                            <img src={book.imageUrl} alt={book.title} className="book-image" />

                            <h3 className="book-author">{book.author}</h3>
                            <h2 className="book-title">{book.title}</h2>
                            <div className="book-price-group">
                                <span className="book-price">{book.price}</span>
                                <span className="book-original-price">{book.originalPrice}</span>
                                <span className="book-discount">{book.discount}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default Books;
