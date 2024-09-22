import { useState, useEffect } from "react";
import axios from "axios";
import './Books.css';
import NavigationBar from "../NavigationBar/NavigationBar.jsx";

const Books = () => {
    const [booksData, setBooksData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [categories, setCategories] = useState([
        'Fiction', 'Arts and Entertainment', 'Science and Technology', 'Non-Fiction',
        'Business and Economics', 'Juvenile Fiction', 'Literary Collections',
        'Biography & Autobiography', 'Philosophy and Religion',
        'Juvenile Nonfiction', 'Poetry', 'Miscellaneous', 'Religion',
        'Social Science', 'Comics & Graphic Novels', 'Drama'
    ]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(true);
    const booksPerPage = 12;

    useEffect(() => {
        fetchBooks();
    }, [selectedCategory, searchTerm]);  // Refetch when category or search term changes

    const fetchBooks = async () => {
        setLoading(true);
        try {
            const response = await axios.get('http://localhost:3000/books', {
                params: {
                    category: selectedCategory || undefined,  // Send category if selected
                    search: searchTerm || undefined            // Send search if there’s a search term
                }
            });
            setBooksData(response.data);
        } catch (error) {
            console.error('Failed to fetch books:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
        setCurrentPage(1); // Reset to first page when search term changes
    };

    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value);
        setCurrentPage(1); // Reset to first page when category changes
    };

    const handleSearch = () => {
        fetchBooks(); // Fetch books when search button is clicked
    };

    if (loading) {
        return <div>Loading books...</div>;
    }

    const filteredBooks = booksData.filter((book) =>
        (selectedCategory ? book.categories.includes(selectedCategory) : true) && // Updated to handle 'categories' array
        (searchTerm ?
            book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            book.authors.toLowerCase().includes(searchTerm.toLowerCase())
            : true)
    );

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

    return (
        <>
            <NavigationBar />
            <div className="main-container">
                <div className="header-group">
                    <div className="browse-categories">
                        <select className="category-dropdown" onChange={handleCategoryChange} value={selectedCategory}>
                            <option value="">Browse Categories</option>
                            {categories.map((category, index) => (
                                <option key={index} value={category}>{category}</option>
                            ))}
                        </select>
                    </div>

                    <div className="search">
                        <input
                            type="text"
                            className="search-input"
                            placeholder="Search for books..."
                            value={searchTerm}
                            onChange={handleSearchChange}
                        />
                        <button className="search-button" onClick={handleSearch}>
                            <i className="fas fa-search"></i> Search
                        </button>
                    </div>

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

                <div className="pagination">
                    {renderPaginationButtons()}
                </div>
            </div>
        </>
    );
};

export default Books;
