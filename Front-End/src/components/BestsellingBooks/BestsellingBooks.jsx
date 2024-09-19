import React from 'react';
import Slider from 'react-slick';
import './BestsellingBooks.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';


// Custom Previous Arrow
const PrevArrow = ({ className, style, onClick }) => (
  <div
    className={className}
    style={{ ...style, display: 'block', left: '-40px', zIndex: '1', fontSize: '30px', color: '#ea6a47' }}
    onClick={onClick}
  >
    &#10094;
  </div>
);

// Custom Next Arrow
const NextArrow = ({ className, style, onClick }) => (
  <div
    className={className}
    style={{ ...style, display: 'block', right: '-40px', fontSize: '30px', color: '#ea6a47' }}
    onClick={onClick}
  >
    &#10095;
  </div>
);

// Slider settings
const sliderSettings = {
  dots: true,
  infinite: true,
  speed: 700,
  slidesToShow: 4,
  slidesToScroll: 1,
  nextArrow: <NextArrow />,
  prevArrow: <PrevArrow />,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
        infinite: true,
        dots: true
      }
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1
      }
    },
    {
      breakpoint: 576,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }
  ]
};




const BestsellingBooks = ({products,name}) => {
  console.log("aksdbfasdb:-",products);

  return (
    <div className="main-container">
      <section className="products-section">
        <div className="slogan-1">
          <h2 className="section-title">
            {name}
          </h2>
        </div>

        {/* Slider starts here */}
        <Slider {...sliderSettings}>
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
        </Slider>
        {/* Slider ends here */}
      </section>
    </div>
  );
};

export default BestsellingBooks;
