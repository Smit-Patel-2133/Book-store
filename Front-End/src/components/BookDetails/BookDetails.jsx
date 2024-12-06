import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './BookDetail.css';
import NavigationBar from '../NavigationBar/NavigationBar.jsx';
import { useSelector, useDispatch } from "react-redux";
import { addItemToCart, removeItemFromCart } from '../../features/Cart_Items/cart.js';
import { addItemToWishlist, removeItemFromWishlist } from '../../features/Wishlist/wishlist.js';
import axios from "axios";

const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStar;

    return (
        <>
            {Array.from({ length: fullStars }, (_, i) => <span key={i} className="star">★</span>)}
            {halfStar ? <span key="half" className="star">★</span> : null}
            {Array.from({ length: emptyStars }, (_, i) => <span key={`empty-${i}`} className="star star-empty">★</span>)}
        </>
    );
};

const BookDetail = () => {
    const location = useLocation();
    const { book } = location.state;
    const user = useSelector(state => state.user_info.auth);
    const cartItems = useSelector(state => state.cart.items);
    const wishlistItems = useSelector(state => state.wishlist.wishlistItems);
    const dispatch = useDispatch();

    // Check if the book is already in the cart or wishlist
    const isInCart = cartItems.some(item => item.bookId === book._id);
    const isInWishlist = wishlistItems.some(item => item.id === book._id);

    // State for image scale
    const [imageScale, setImageScale] = useState(1);

    // Pricing logic
    const originalPrice = book.price;
    const discountPercentage = book.offer ? book.offer / 100 : 0;
    const discountedPrice = originalPrice * (1 - discountPercentage);

    // State for reviews
    const [reviews, setReviews] = useState([]);
    const [newReview, setNewReview] = useState("");
    const [rating, setRating] = useState(0);
    const [showFullDescription, setShowFullDescription] = useState(false);

    // Fetch reviews when component loads
    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/reviews/${book._id}`);
                setReviews(response.data);
            } catch (error) {
                console.error("Error fetching reviews:", error);
            }
        };
        fetchReviews();
    }, [book._id]);

    // Submit a new review
    const handleSubmitReview = async () => {
        if (!newReview.trim() || !rating) {
            alert("Please enter a review and rating.");
            return;
        }

        const reviewData = {
            bookId: book._id,
            userId: user.email,
            review: newReview,
            rating,
        };

        try {
            const response = await axios.post("http://localhost:3000/api/books/reviews", reviewData);
            setReviews([...reviews, response.data]); // Update state with new review
            setNewReview(""); // Clear input
            setRating(0); // Reset rating
        } catch (error) {
            console.error("Error submitting review:", error);
        }
    };

    // Handle add/remove from cart
    const handleCartToggle = async () => {
        const userId = user.email;
        const bookId = book._id;

        try {
            if (!isInCart) {
                await axios.post("http://localhost:3000/api/cart/add", { userId, bookId });
                dispatch(addItemToCart({ bookId, title: book.title, price: book.price }));
            } else {
                await axios.delete(`http://localhost:3000/api/cart/remove`, { data: { userId, bookId } });
                dispatch(removeItemFromCart({ bookId }));
            }
        } catch (error) {
            console.error("Error in Cart Toggle:", error);
        }
    };

    // Handle add/remove from wishlist
    const handleWishlistToggle = async () => {
        const userId = user.email;
        const bookId = book._id;

        try {
            if (!isInWishlist) {
                await axios.post("http://localhost:3000/api/wishlist/add", { userId, bookId });
                dispatch(addItemToWishlist({ id: bookId, title: book.title }));
            } else {
                await axios.delete(`http://localhost:3000/api/wishlist/remove`, { data: { userId, bookId } });
                dispatch(removeItemFromWishlist(bookId));
            }
        } catch (error) {
            console.error("Error in Wishlist Toggle:", error);
        }
    };

    // Toggle for showing full/short description
    const toggleDescription = () => setShowFullDescription(!showFullDescription);

    return (
        <>
            <NavigationBar />
            <div className="book-detail-container">
                <div className="book-info">
                    <div
                        className="book-image"
                        onMouseOver={() => setImageScale(1.05)}
                        onMouseOut={() => setImageScale(1)}
                    >
                        <img
                            src={book.coverImg}
                            alt={book.title}
                            style={{transform: `scale(${imageScale})`}}
                        />
                    </div>
                    <div className="rating-section">
                        <div className="rating-content">
                            {renderStars(book.rating)}
                            <span className="rating-count">({book.rating_count} ratings)</span>
                        </div>
                    </div>


                    <h2 className="book-title">{book.title}</h2>
                    <p className="book-author">by {book.author}</p>
                    <p className="book-price">
                        {discountPercentage > 0 ? (
                            <>
                                <span className="original-price">₹{originalPrice.toFixed(2)}</span>
                                <span className="discounted-price"> ₹{discountedPrice.toFixed(2)}</span>
                            </>
                        ) : (
                            <>₹{originalPrice.toFixed(2)}</>
                        )}
                    </p>

                    <p className="book-description">
                        {book.description}
                    </p>
                    {/*<button onClick={toggleDescription}>*/}
                    {/*    {showFullDescription ? "Show Less" : "Show More"}*/}
                    {/*</button>*/}


                    {/* Add/Remove Cart & Wishlist Buttons */}
                    {user ? (
                        <>
                            <button onClick={handleCartToggle}>
                                {isInCart ? "Remove from Cart" : "Add to Cart"}
                            </button>
                            <button onClick={handleWishlistToggle}>
                                {isInWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
                            </button>
                        </>
                    ) : (
                        <p>Please log in to add this book to your cart or wishlist.</p>
                    )}

                    {/* Reviews Section */}
                    <div className="reviews-section">
                        <h3>Give Your Experience</h3>
                        <div className="reviews-list">
                            {reviews.length > 0 ? (
                                reviews.map((review, index) => (
                                    <div key={index} className="review-item">
                                        <p>
                                            <strong>{typeof review.userId === 'string' ? review.userId : 'Unknown User'}:</strong>
                                            {typeof review.review === 'string' ? review.review : 'Invalid review content'}
                                        </p>
                                        <div className="review-rating">
                                            {renderStars(review.rating)}
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p></p>
                            )}
                        </div>

                        {user ? (
                            <div className="add-review">
                                <textarea
                                    value={newReview}
                                    onChange={(e) => setNewReview(e.target.value)}
                                    placeholder="Write your review here..."
                                    rows="3"
                                ></textarea>
                                <div className="rating-input">
                                    <label>Rating:</label>

                                    <div className="rating-stars">
                                        {Array.from({length: 5}, (_, index) => (
                                            <span
                                                key={index}
                                                className={`star ${index < rating ? 'filled' : ''}`}
                                                onClick={() => setRating(index + 1)}
                                            >
                ★
            </span>
                                        ))}
                                    </div>
                                </div>

                                <button onClick={handleSubmitReview}>Submit Review</button>
                            </div>
                        ) : (
                            <p>Please log in to add a review.</p>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default BookDetail;
