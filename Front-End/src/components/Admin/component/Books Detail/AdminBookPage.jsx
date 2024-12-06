import React, { useContext, useEffect, useState } from 'react';
import AdminSidebar from '../AdminSidebar.jsx';
import './AdminBookPage.css';
import { BooksContext } from '../../context/BooksContext.jsx';
import BookDetail from './AdminBookDetail.jsx';
import { FaPlus } from 'react-icons/fa';
import AddBookModal from './AddBookModal.jsx';

const AdminBookPage = () => {
    const { books } = useContext(BooksContext);
    const [bookData, setBookData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedBook, setSelectedBook] = useState(null);
    const [showAddBookModal, setShowAddBookModal] = useState(false);

    const handleAddBook = () => {
        setShowAddBookModal(true);
    };

    const handleCloseModal = () => {
        setShowAddBookModal(false);
        setSelectedBook(null);
    };

    const handleBookAdded = (newBook) => {
        setBookData((prevBooks) => [...prevBooks, newBook]);
        setShowAddBookModal(false);
    };

    useEffect(() => {
        setBookData(books);
    }, [books]);

    const filteredBooks = bookData.filter((book) =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleEditClick = (book) => {
        setSelectedBook(book);
    };

    return (
        <div className="dashboard">
            <AdminSidebar />
            <div className="main-content">
                <h1>Manage Books</h1>
                <button
                    className="add-book-button"
                    onClick={handleAddBook}
                    aria-label="Add New Book"
                >
                    <FaPlus size={24} />
                </button>

                {showAddBookModal && (
                    <AddBookModal onClose={handleCloseModal} onBookAdded={handleBookAdded} />
                )}

                <input
                    type="text"
                    placeholder="Search by book title..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-bar"
                />

                {filteredBooks.length > 0 ? (
                    filteredBooks.map((book, index) => (
                        <div key={index} className="book-item">
                            <div>{index + 1}. {book.title}</div>
                            <button onClick={() => handleEditClick(book)}>Edit</button>
                        </div>
                    ))
                ) : (
                    <p>No books available.</p>
                )}

                {selectedBook && (
                    <BookDetail book={selectedBook} onClose={handleCloseModal} />
                )}
            </div>
        </div>
    );
};

export default AdminBookPage;
