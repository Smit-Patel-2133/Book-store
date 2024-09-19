import React from 'react';
import './BestsellingBooks.css';
import m1 from '../../assets/images/book demo/b2.jpg'

const products = [
  {
    id: 1,
    tag: 'BEST SELLER',
    image: m1, 
    title: 'Blue in the Water',
    price: 35.00,
    discountPrice: 350.00,
    label: 'The Remaining'
  },
  {
    id: 2,
    tag: 'HOT',
    image: m1,
    title: 'Animals Life',
    price: 40.00,
    discountPrice: 570.00,
    label: 'Bowen Greenwood'
  },
  {
    id: 3,
    tag: 'BEST SELLER',
    image: m1, 
    title: 'War of Dragon',
    price: 35.00,
    discountPrice:231.00,
    label: 'Moren Nicol'
  },
  {
    id: 4,
    tag: 'HOT',
    image: m1, 
    title: 'Lando',
    price: 35.00,
    discountPrice: 502.00,
    label: 'Madhu Sashon'
  },
  {
    id: 5,
    tag: 'HOT',
    image: m1,
    title: 'Lando',
    price: 35.00,
    discountPrice: 502.00,
    label: 'Madhu Sashon'
  },
  {
    id: 6,
    tag: 'HOT',
    image: m1, 
    title: 'Lando',
    price: 35.00,
    discountPrice: 502.00,
    label: 'Madhu Sashon'
  },
  {
    id: 7,
    tag: 'HOT',
    image: m1, // replace with actual image paths
    title: 'Lando',
    price: 35.00,
    discountPrice: 502.00,
    label: 'Madhu Sashon'
  },
  {
    id: 8,
    tag: 'HOT',
    image: m1, // replace with actual image paths
    title: 'Lando',
    price: 35.00,
    discountPrice: 502.00,
    label: 'Madhu Sashon'
  }
];
const BestsellingBooks = () => {
  return (
    <>
    <div className="main-container">
    <section className="products-section">
      <div className="slogan-1"><h2 className="section-title">
        BEST <span> SELLER </span>
      </h2>
      </div>
      <div className="products-grid">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <div className="product-tag">{product.tag}</div>
            <img src={product.image} alt={product.title} className="product-image" />
            <h3 className="product-label">{product.label}</h3>
            <div className="product-prices">
              <span className="current-price">Rs. {product.price.toFixed(2)}</span>
              <span className="discount-price">${product.discountPrice.toFixed(2)}</span>
            </div>
            <div className="product-icons">
              <i className="fas fa-shopping-bag"></i>
              <i className="fas fa-search"></i>
              <i className="fas fa-heart"></i>
            </div>
          </div>
        ))}
      </div>
    </section>
      </div>
    </>
  );
};

export default BestsellingBooks;
