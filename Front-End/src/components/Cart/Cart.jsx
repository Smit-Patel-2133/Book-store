import React, { useEffect, useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Cart.css';
import NavigationBar from "../NavigationBar/NavigationBar.jsx";
import { removeItemFromCart } from '../../features/Cart_Items/cart.js';

const Cart = () => {
    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.cart.items);
    const user = useSelector(state => state.user_info.auth);
    const bookIds = useMemo(() => cartItems.map(item => item.bookId), [cartItems]);

    const [detailedCartItems, setDetailedCartItems] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCartDetails = async () => {
            try {
                const response = await axios.post("http://localhost:3000/api/cart/getCartItemDetails", {
                    bookIds: bookIds,
                });
                setDetailedCartItems(response.data);
                console.log("Fetched cart details:", response.data);
            } catch (error) {
                console.error("Error fetching cart details:", error);
            }
        };

        if (bookIds.length > 0) {
            fetchCartDetails();
        }
    }, [bookIds]);

    const handleRemoveFromCart = async (bookId) => {
        const userId = user.email;
        try {
            console.log(bookId);
            await axios.delete(`http://localhost:3000/api/cart/remove`, {
                data: { userId, bookId }
            });
            dispatch(removeItemFromCart({ bookId }));

            // Update detailedCartItems to reflect removal immediately
            setDetailedCartItems(prevItems => prevItems.filter(item => item._id !== bookId));

            console.log(`Removed book with ID ${bookId} from cart`);
        } catch (error) {
            console.error("Error removing item from cart:", error);
        }
    };

    const totalPrice = detailedCartItems.reduce((total, item) => {
        const discount = item.offer ? item.offer : 0;
        const discountedPrice = item.price - (item.price * (discount / 100));
        return total + discountedPrice;
    }, 0);

    const handleCheckout = () => {
        navigate('/checkout', { state: { cartItems: detailedCartItems, user } });
    };

    return (
        <>
            <NavigationBar />
            <div className="cart-container">
                <h2 className="cart-header">Your Cart</h2>
                {detailedCartItems.length === 0 ? (
                    <p className="cart-empty-message">Your cart is empty.</p>
                ) : (
                    <>
                        <ul className="cart-items-list">
                            {detailedCartItems.map((item) => {
                                const discount = item.offer ? item.offer : 0;
                                const discountedPrice = item.price - (item.price * (discount / 100));

                                return (
                                    <li key={item.bookId} className="cart-item">
                                        <img
                                            src={item.coverImg}
                                            alt={item.title}
                                            className="cart-item-image"
                                        />
                                        <div className="cart-item-details">
                                            <span className="cart-item-title">{item.title}</span>
                                            <span className="cart-item-price">Rs.{discountedPrice.toFixed(2)}</span>
                                            <button
                                                className="remove-from-cart-button"
                                                onClick={() => handleRemoveFromCart(item._id)}
                                            >
                                                Remove from Cart
                                            </button>
                                        </div>
                                    </li>
                                );
                            })}
                        </ul>
                        <div className="cart-summary">
                            <h3 className="cart-total">Total: Rs.{totalPrice.toFixed(2)}</h3>
                            <button className="cart-checkout-button" onClick={handleCheckout}>Proceed to Checkout</button>
                        </div>
                    </>
                )}
                <NavLink to="/books" className="cart-back-to-shop">
                    Continue Shopping
                </NavLink>
            </div>
        </>
    );
};

export default Cart;
