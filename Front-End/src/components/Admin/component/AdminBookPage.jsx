import React, { useContext, useEffect, useState } from 'react';
import AdminSidebar from './AdminSidebar';
import './AdminBookPage.css';
import { BooksContext } from '../context/BooksContext.jsx'; // Import the context
import BookDetail from './AdminBookDetail.jsx'; // Import the new component

const AdminBookPage = () => {
    const { books } = useContext(BooksContext); // Access books from context
    const [bookData, setBookData] = useState([]); // Editable book data
    const [searchTerm, setSearchTerm] = useState(''); // Search term for book title
    const [selectedBook, setSelectedBook] = useState(null); // Selected book for editing
    console.log("sdfasdferw :- ",books[0])
    // Update bookData whenever books change
    useEffect(() => {
        setBookData(books);
    }, [books]);

    // Handler to update the editable fields
    const handleInputChange = (index, event) => {
        const { name, value } = event.target;
        const updatedBooks = [...bookData];
        updatedBooks[index] = {
            ...updatedBooks[index],
            [name]: value,
        };
        setBookData(updatedBooks);
    };

    // Filter books by title based on the search term
    const filteredBooks = bookData.filter((book) =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Handle edit button click
    const handleEditClick = (book) => {
        setSelectedBook(book);
    };

    // Handle close detail view
    const handleClose = () => {
        setSelectedBook(null);
    };

    return (
        <div className="dashboard">
            <AdminSidebar />
            <div className="main-content">
                <h1>Manage Books</h1>

                {/* Search Bar */}
                <input
                    type="text"
                    placeholder="Search by book title..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-bar"
                />

                {/* Book List */}
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

                {/* Show Book Details if selected */}
                {selectedBook && (
                    <BookDetail book={selectedBook} onClose={handleClose} />
                )}
            </div>
        </div>
    );
};

export default AdminBookPage;
