import { useState, useEffect } from 'react';
import NavigationBar from "../NavigationBar/NavigationBar.jsx";
import "./Books.css";
import axios from "axios";

const Books = () => {
    const [booksData, setBooksData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [categories, setCategories] = useState(['Fiction', 'Non-fiction', 'Science', 'Biography']);
    const [selectedCategory, setSelectedCategory] = useState(''); // State for selected category
    const [isLoggedIn, setIsLoggedIn] = useState(true); // Assuming user login status for shopping cart
    const booksPerPage = 12;

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await axios.get('http://localhost:3000/books');
                setBooksData(response.data);
                console.log(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Failed to fetch books:', error);
            }
        };

        fetchBooks();
    }, []);

    if (loading) {
        return <div>Loading books...</div>;
    }

    // Filter books based on selected category
    const filteredBooks = selectedCategory
        ? booksData.filter((book) => book.category === selectedCategory)
        : booksData;

    const indexOfLastBook = currentPage * booksPerPage;
    const indexOfFirstBook = indexOfLastBook - booksPerPage;
    const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    const totalPages = Math.ceil(filteredBooks.length / booksPerPage);

    const renderPaginationButtons = () => {
        let buttons = [];
        if (currentPage > 1) {
            buttons.push(
                <button key={currentPage - 1} onClick={() => paginate(currentPage - 1)}>
                    {currentPage - 1}
                </button>
            );
        }
        buttons.push(
            <button key={currentPage} className="active">
                {currentPage}
            </button>
        );
        if (currentPage < totalPages) {
            buttons.push(
                <button key={currentPage + 1} onClick={() => paginate(currentPage + 1)}>
                    {currentPage + 1}
                </button>
            );
        }
        return buttons;
    };

    // Handle category change
    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value);
        setCurrentPage(1); // Reset to first page when category changes
    };

    return (
        <>
            <NavigationBar />
            <div className="main-container">
                <div className="header-group">
                    {/* Browse Categories Dropdown */}
                    <div className="browse-categories">
                        <select className="category-dropdown" onChange={handleCategoryChange} value={selectedCategory}>
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
                    {currentBooks.map((book, index) => (
                        <div key={index} className="book-card">
                            <img src={book.thumbnail} alt={book.title} className="book-image" />
                            <h3 className="book-author">{book.authors}</h3>
                            <h2 className="book-title">{book.title}</h2>
                            <div className="book-price-group">
                                <span className="book-price">RS. {book.price}</span>
                                <span className="book-original-price">{book.originalPrice}</span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Pagination Controls */}
                <div className="pagination">
                    {renderPaginationButtons()}
                </div>
            </div>
        </>
    );
};

export default Books;
