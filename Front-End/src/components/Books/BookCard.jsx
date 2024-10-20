import React from 'react';

const BookCard = ({ book, onClick }) => {
    return (
        <div className="book-card" onClick={() => onClick(book)}>
            <img src={book.coverImg} alt={book.title} className="book-image-books" />
            <h3 className="book-author">{book.authors}</h3>
            <h2 className="book-title">{book.title}</h2>
            <div className="book-price-group">
                <span className="book-price">RS. {book.price}</span>
                <span className="book-original-price">{book.originalPrice}</span>
            </div>
        </div>
    );
};

export default BookCard;
