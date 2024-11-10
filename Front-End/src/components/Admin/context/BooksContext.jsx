import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

// Create the context
export const BooksContext = createContext({ books: [], setBooks: () => {} });

// Create the provider component
export const BooksProvider = ({ children }) => {
    const [books, setBooks] = useState([]);

    // Fetch books data
    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await axios.post('http://localhost:3000/api/admin/books');
                setBooks(response.data);
                console.log("Books fetched:", response.data);
            } catch (error) {
                console.error('Failed to fetch books:', error);
            }
        };
        fetchBooks();
    }, []);

    return (
        <BooksContext.Provider value={{ books, setBooks }}>
            {children}
        </BooksContext.Provider>
    );
};
