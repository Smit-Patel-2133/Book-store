import React from 'react';
import './NavigationBar.css'
import {NavLink} from "react-router-dom";

const NavigationBar = () => {
    return (

        // <nav className="navbar">
        //     <div className="navbar-logo">
        //         <NavLink to="/" exact activeClassName="active">
        //             MySite
        //         </NavLink>
        //     </div>
        //     <ul className="navbar-links">
        //         <li>
        //             <NavLink to="/" exact activeClassName="active">
        //                 Home
        //             </NavLink>
        //         </li>
        //         <li>
        //             <NavLink to="/about" activeClassName="active">
        //                 Book
        //             </NavLink>
        //         </li>
        //         <li>
        //             <NavLink to="/about" activeClassName="active">
        //                 About
        //             </NavLink>
        //         </li>
        //         <li>
        //             <NavLink to="/services" activeClassName="active">
        //                 Services
        //             </NavLink>
        //         </li>
        //         <li>
        //             <NavLink to="/contact" activeClassName="active">
        //                 Contact
        //             </NavLink>
        //         </li>
        //     </ul>
        // </nav>

        <nav className="navbar">
      <div className="logo">
        <img src="/path-to-logo.png" alt="Book Store" />
      </div>
      <ul className="nav-links">
        <li><a href="#">Home</a></li>
        <li><a href="#">Shop</a></li>
        <li><a href="#">Books</a></li>
        <li><a href="#">Kids</a></li>
        <li><a href="#">Pages</a></li>
        <li><a href="#">Blog</a></li>
        <li><a href="#">Contact</a></li>
      </ul>
      <div className="nav-icons">
        <i className="fas fa-search">search</i>
        <i className="fas fa-heart">wishlist</i>
        <i className="fas fa-shopping-cart">cart
          <span className="cart-count">3</span>
        </i>
        <i className="fas fa-user">profile</i>
      </div>
    </nav>
    );
};

export default NavigationBar;