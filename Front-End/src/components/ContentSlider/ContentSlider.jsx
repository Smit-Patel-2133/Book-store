import Slider from 'react-slick';
import './ContentSlider.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useNavigate } from "react-router-dom";

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

const sliderSettings = {
  dots: true,
  infinite: true,
  speed: 500, // Reduced speed for smoother transition
  slidesToShow: 4,
  slidesToScroll: 1,
  nextArrow: <NextArrow />,
  prevArrow: <PrevArrow />,
  draggable: true,
  swipeToSlide: true,
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

const ContentSlider = ({ products, name }) => {
  const navigate = useNavigate();

  const handleBookClick = (book) => {
    navigate(`/books/${book._id}`, { state: { book } }); // Navigate to the book details page with the book data
  };

  return (
      <div className="main-container">
        <section className="products-section">
          <div className="slogan-1">
            <h2 className="section-title">{name}</h2>
          </div>

          <Slider {...sliderSettings}>
            {products.map((product) => {
              // Calculate discount
              const discountPercentage = product.offer ? product.offer : 0; // Use offer if available, else 0
              const currentPrice = product.price || 0;
              const discountAmount = (currentPrice * discountPercentage) / 100;
              const finalPrice = currentPrice - discountAmount;

              return (
                  <div key={product.id || product._id} className="product-card" >
                    <img
                        src={product.coverImg || 'default-image.jpg'}
                        alt={product.title || 'No Title'}
                        className="product-image"
                    />
                    <h3 className="product-label">{product.title || 'No Label'}</h3>
                    <div className="product-prices">
                      <span className="current-price">Rs. {finalPrice.toFixed(2)}</span>
                      {discountPercentage > 0 && (
                          <span className="discount-price">Rs. {currentPrice.toFixed(2)}</span>
                      )}
                    </div>
                    <button onClick={() => handleBookClick(product)}> View Details</button>
                  </div>
              );
            })}
          </Slider>
        </section>
      </div>
  );
};

export default ContentSlider;
