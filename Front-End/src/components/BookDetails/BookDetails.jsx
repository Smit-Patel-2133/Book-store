import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import './BookDetail.css';
import NavigationBar from '../NavigationBar/NavigationBar.jsx';
import { useSelector, useDispatch } from "react-redux";
import { addItemToCart, removeItemFromCart } from '../../features/Cart_Items/cart.js'; // Import actions
import axios from "axios";

const BookDetail = () => {
    const location = useLocation();
    const { book } = location.state;
    console.log("book:-",book.coverImg)
    const user = useSelector(state => state.user_info.auth);
    const cartItems = useSelector(state => state.cart.items);
    const dispatch = useDispatch(); // Get dispatch function from Redux

    const discountPercentage = 0.4; // 40%
    const originalPrice = book.price / (1 - discountPercentage); // Assuming `price` is the discounted price
    const discountedPrice = book.price;

    // State to manage description visibility
    const [showFullDescription, setShowFullDescription] = useState(false);

    // Function to render stars based on rating
    const renderStars = (rating) => {
        const fullStars = Math.floor(rating); // Full stars
        const halfStar = rating % 1 >= 0.5 ? 1 : 0; // Half star if needed
        const emptyStars = 5 - fullStars - halfStar; // Empty stars

        const stars = [];
        // Add full stars
        for (let i = 0; i < fullStars; i++) {
            stars.push(<span key={i} className="star">★</span>);
        }
        // Add half star if applicable
        if (halfStar) {
            stars.push(<span key="half" className="star">★</span>);
        }
        // Add empty stars
        for (let i = 0; i < emptyStars; i++) {
            stars.push(<span key={`empty-${i}`} className="star star-empty">★</span>);
        }

        return stars;
    };

    // Function to toggle the description
    const toggleDescription = () => {
        setShowFullDescription(!showFullDescription);
    };

    // Function to truncate description to 75 words
    const truncateDescription = (description) => {
        const words = description.split(' ').filter(word => word.trim() !== '');
        return showFullDescription ? description : words.slice(0, 75).join(' ') + '...';
    };
    console.log("cart items:-",cartItems)
    // Function to handle adding/removing from cart
    const handleCartToggle = async () => {
        const userId = user.email; // assuming user.email is a string
        const bookId = book._id; // assuming book.id is a string

        try {
            // Check if the book is already in the cart
            const existingCartItem = cartItems.find(item => item.bookId === bookId);
            if (!existingCartItem) {
                // Add to cart
                const response = await axios.post("http://localhost:3000/api/cart/add", {
                    userId: userId,
                    bookId: bookId
                });

                // Dispatch the action to add to Redux store
                dispatch(addItemToCart({ bookId, title: book.title, price: discountedPrice }));

                console.log(response.data);
            } else {
                // Remove from cart
                console.log("remove:",userId,bookId)
                await axios.delete(`http://localhost:3000/api/cart/remove`, {
                    data: { userId, bookId } // Sending data in the request body
                });

                // Dispatch the action to remove from Redux store
                dispatch(removeItemFromCart({ bookId }));
                console.log(`Removed ${book.title} from cart`);
            }
        } catch (e) {
            console.log(e);
        }
    };

    const isInCart = cartItems.some(item => item.bookId === book._id);

    // Function to handle adding to wishlist
    const handleAddToWishlist = () => {
        // Logic to add the book to wishlist (e.g., updating state or calling API)
        alert(`${book.title} has been added to your wishlist!`);
    };

    return (
        <>
            <NavigationBar />
            <div className="book-detail-container">
                <div className="book-image">
                    <img src={book.coverImg} alt={book.title} />
                </div>
                <div className="book-info">
                    <h2 className="book-title">{book.title}</h2>
                    <h3 className="book-author">By {book.authors}</h3>

                    {/* Truncated description with View More button */}
                    <p className="book-description">{truncateDescription(book.description)}</p>
                    <button onClick={toggleDescription} className="view-more-btn">
                        {showFullDescription ? 'View Less' : 'View More Details'}
                    </button>

                    {/* Star rating and rating count */}
                    <div className="star-rating">
                        {renderStars(book.average_rating)}
                        <span>({book.ratings_count} ratings)</span>
                    </div>

                    <div className="book-price-group">
                        <span className="book-price">Price: RS. {discountedPrice}</span>
                        <span className="book-original-price">Original: <span style={{ textDecoration: 'line-through' }}>RS. {originalPrice.toFixed(2)}</span></span>
                        <span className="discount-mark">(-40%)</span>
                    </div>

                    {/* Add to Cart and Wishlist Buttons */}
                    <div className="action-buttons">
                        <button onClick={handleCartToggle} className="add-to-cart-btn">
                            {isInCart ? 'Remove from Cart' : 'Add to Cart'}
                        </button>
                        <button onClick={handleAddToWishlist} className="add-to-wishlist-btn">Add to Wishlist</button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default BookDetail;
