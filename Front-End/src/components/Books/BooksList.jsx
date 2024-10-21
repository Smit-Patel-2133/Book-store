import React from 'react';
import BookCard from './BookCard';

const BooksList = ({ books, onBookClick }) => {

    return (
        <div className="books-container">
            {books.map((book, index) => (
                <BookCard key={index} book={book} onClick={onBookClick} />
            ))}
        </div>
    );
};

export default BooksList;
