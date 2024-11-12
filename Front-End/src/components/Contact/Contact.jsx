// Contact.jsx
import React from 'react';
import './Contact.css'; // You can separate the CSS into a file for better organization.
import Footer from "../Footer/Footer.jsx";
import NavigationBar from '../NavigationBar/NavigationBar.jsx';

const Contact = () => {
  return (
  <>
    {/* <NavigationBar/> */}
    <div className="container">
      <div className="form">
        <div className="contact-info">
          <h3 className="title">Let's get in touch</h3>
          <p className="text">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe
            dolorum adipisci recusandae praesentium dicta!
          </p>

          <div className="info">
            <div className="information">
              <p>92 Cherry Drive Uniondale, NY 11553</p>
            </div>
            <div className="information">
              <p>lorem@ipsum.com</p>
            </div>
            <div className="information">
              <p>9999999999</p>
            </div>
          </div>

          <div className="social-media">
            
            <br />
            <div className="credit">
              Made with <span style={{ color: 'tomato' }}>❤</span> by <a href="https://www.learningrobo.com/">Stories</a>
            </div>
          </div>
        </div>

        <div className="contact-form">
          <span className="circle one"></span>
          <span className="circle two"></span>

          <form action="#" autoComplete="off">
            <h3 className="title">Contact us</h3>
            <div className="input-container">
              <input type="text" name="name" className="input" />
              <label htmlFor="name">Username</label>
              <span>Username</span>
            </div>
            <div className="input-container">
              <input type="email" name="email" className="input" />
              <label htmlFor="email">Email</label>
              <span>Email</span>
            </div>
            <div className="input-container">
              <input type="tel" name="phone" className="input" />
              <label htmlFor="phone">Phone</label>
              <span>Phone</span>
            </div>
            <div className="input-container textarea">
              <textarea name="message" className="input"></textarea>
              <label htmlFor="message">Message</label>
              <span>Message</span>
            </div>
            <input type="submit" value="Send" className="btn" />
          </form>
        </div>
      </div>  
      
    </div>
    <Footer/> 
    
    </>
    
  );
}

export default Contact;
