import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

const Cart = () => {
  // State to manage Cart_Items items with image
  const [cartItems, setCartItems] = useState([
    { id: 1, title: 'Book Title 1', price: 19.99, image: 'https://via.placeholder.com/100' },
    { id: 2, title: 'Book Title 2', price: 25.99, image: 'https://via.placeholder.com/100' },
  ]);

  const totalPrice = cartItems.reduce((total, item) => total + item.price, 0);

  return (
    <div className="cart-container">
      <h2 className="cart-header">Your Cart</h2>
      {cartItems.length === 0 ? (
        <p className="cart-empty-message">Your cart is empty.</p>
      ) : (
        <>
          <ul className="cart-items-list">
            {cartItems.map((item) => (
              <li key={item.id} className="cart-item">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="cart-item-image" 
                />
                <div className="cart-item-details">
                  <span className="cart-item-title">{item.title}</span>
                  <span className="cart-item-price">${item.price.toFixed(2)}</span>
                </div>
              </li>
            ))}
          </ul>
          <div className="cart-summary">
            <h3 className="cart-total">Total: ${totalPrice.toFixed(2)}</h3>
            <button className="cart-checkout-button">Proceed to Checkout</button>
          </div>
        </>
      )}
      <NavLink to="/books" className="cart-back-to-shop">
        Continue Shopping
      </NavLink>
    </div>
  );
};

export default Cart;
