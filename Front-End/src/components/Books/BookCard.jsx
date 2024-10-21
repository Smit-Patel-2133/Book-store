import React from 'react';

const BookCard = ({ book, onClick }) => {
    // Calculate prices based on offer
    const discountPercentage = book.offer ? book.offer / 100 : 0; // Convert percentage to decimal
    const originalPrice = book.price; // Assuming `book.price` is the original price
    const discountedPrice = originalPrice * (1 - discountPercentage); // Calculate the discounted price
    // console.log(book.title,book)
    return (
        <div className="book-card" onClick={() => onClick(book)}>
            <img src={book.coverImg} alt={book.title} className="book-image-books" />
            <h3 className="book-author">{book.authors}</h3>
            <h2 className="book-title">{book.title}</h2>
            <div className="book-price-group">
                <span className="book-price">RS. {discountedPrice.toFixed(2)}</span>
                {discountPercentage > 0 && (
                    <span className="book-original-price">
                        Original: <span style={{ textDecoration: 'line-through' }}>RS. {originalPrice.toFixed(2)}</span>
                    </span>
                )}
                {discountPercentage > 0 && (
                    <span className="discount-mark">(-{(discountPercentage * 100).toFixed(0)}%)</span>
                )}
            </div>
        </div>
    );
};

export default BookCard;
