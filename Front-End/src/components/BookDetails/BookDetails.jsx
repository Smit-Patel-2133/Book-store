import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import './BookDetail.css';
import NavigationBar from '../NavigationBar/NavigationBar.jsx';
import { useSelector, useDispatch } from "react-redux";
import { addItemToCart, removeItemFromCart } from '../../features/Cart_Items/cart.js'; // Import cart actions
import { addItemToWishlist, removeItemFromWishlist } from '../../features/Wishlist/wishlist.js'; // Import wishlist actions
import axios from "axios";

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

const BookDetail = () => {
    const location = useLocation();
    const { book } = location.state;
    const user = useSelector(state => state.user_info.auth);
    const cartItems = useSelector(state => state.cart.items);
    const wishlistItems = useSelector(state => state.wishlist.wishlistItems);
    const dispatch = useDispatch();

    // Pricing logic
    const originalPrice = book.price; // Original price
    const discountPercentage = book.offer ? book.offer / 100 : 0; // Convert percentage to decimal
    const discountedPrice = originalPrice * (1 - discountPercentage); // Calculate the discounted price

    // State to manage image scaling
    const [imageScale, setImageScale] = useState(1); // Initialize imageScale state
    // State to manage description visibility
    const [showFullDescription, setShowFullDescription] = useState(false);

    // Function to toggle the description
    const toggleDescription = () => {
        setShowFullDescription(!showFullDescription);
    };

    // Function to truncate description to 75 words
    const truncateDescription = (description) => {
        const words = description.split(' ').filter(word => word.trim() !== '');
        return showFullDescription ? description : words.slice(0, 75).join(' ') + '...';
    };

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
                console.log("Added to Cart:", response.data);
            } else {
                // Remove from cart
                await axios.delete(`http://localhost:3000/api/cart/remove`, {
                    data: { userId, bookId }
                });

                // Dispatch the action to remove from Redux store
                dispatch(removeItemFromCart({ bookId }));
                console.log(`Removed ${book.title} from cart`);
            }
        } catch (e) {
            console.error("Error in Cart Toggle:", e);
        }
    };

    const isInCart = cartItems.some(item => item.bookId === book._id);
    console.log("Is In Cart:", isInCart);

    // Function to handle adding/removing from wishlist
    const handleWishlistToggle = async () => {
        const userId = user.email; // assuming user.email is a string
        const bookId = book._id; // assuming book.id is a string

        try {
            // Check if the book is already in the wishlist
            const existingWishlistItem = wishlistItems.find(item => item.id === bookId);
            if (!existingWishlistItem) {
                // Add to wishlist
                const response = await axios.post("http://localhost:3000/api/wishlist/add", {
                    userId: userId,
                    bookId: bookId
                });

                // Dispatch the action to add to Redux store
                dispatch(addItemToWishlist({ id: bookId, title: book.title }));
                console.log("Added to Wishlist:", response.data);
            } else {
                // Remove from wishlist
                await axios.delete(`http://localhost:3000/api/wishlist/remove`, {
                    data: { userId, bookId }
                });

                // Dispatch the action to remove from Redux store
                dispatch(removeItemFromWishlist(bookId));
                console.log(`Removed ${book.title} from wishlist`);
            }
        } catch (e) {
            console.error("Error in Wishlist Toggle:", e);
        }
    };

    const isInWishlist = wishlistItems.some(item => item.id === book._id);
    console.log("Is In Wishlist:", isInWishlist);

    return (
        <>
            <NavigationBar />
            <div className="book-detail-container">
                <div className="book-image" onMouseOver={() => setImageScale(1.05)} onMouseOut={() => setImageScale(1)}>
                    <img src={book.coverImg} alt={book.title} style={{ transform: `scale(${imageScale})` }} />
                </div>

                <div className="book-info">
                    <h2 className="book-title">{book.title}</h2>
                    <h3 className="book-author">By {book.author}</h3>

                    {/* Truncated description with View More button */}
                    <p className="book-description">{truncateDescription(book.description)}</p>
                    <button onClick={toggleDescription} className="view-more-btn">
                        {showFullDescription ? 'View Less' : 'View More Details'}
                    </button>

                    {/* Star rating and rating count */}
                    <div className="star-rating">
                        {renderStars(book.rating)}
                        <span>({book.rating_count} ratings)</span>
                    </div>

                    <div className="book-price-group">
                        <span className="book-price">Price: RS. {discountedPrice.toFixed(2)}</span>
                        {discountPercentage > 0 && (
                            <span className="book-original-price">Original: <span style={{ textDecoration: 'line-through' }}>RS. {originalPrice.toFixed(2)}</span></span>
                        )}
                        {discountPercentage > 0 &&
                            <span className="discount-mark">(-{(discountPercentage * 100).toFixed(0)}%)</span>}
                    </div>

                    {/* Add to Cart and Wishlist Buttons */}
                    <div className="action-buttons">
                        <button onClick={handleCartToggle} className="add-to-cart-btn">
                            {isInCart ? 'Remove from Cart' : 'Add to Cart'}
                        </button>
                        <button onClick={handleWishlistToggle} className="add-to-wishlist-btn">
                            {isInWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default BookDetail;
