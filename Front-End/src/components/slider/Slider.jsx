import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './Slider.css'; // For custom styles
import slider2 from '../../assets/images/slider/slider1.png';
import slider1 from '../../assets/images/slider/slider2.png';

const sliderData = [
  {
    name:"Stories",
    image: slider1,
    slogan: 'Ready Like an Ideas',
    title: 'Buy Best Book Online Hear',
  },
  {
    image: slider2,
    slogan: 'Expand Your Knowledge',
    title: 'Best Online book Store',
  },
  {
    name:"Stories",
    image: slider1,
    slogan: 'Ready Like an Ideas',
    title: 'Buy Best Book Online Hear',
  },
  {
    image: slider2,
    slogan: 'Expand Your Knowledge',
    title: 'Best Online book Store',
  },
  {
    name:"Stories",
    image: slider1,
    slogan: 'Ready Like an Ideas',
    title: 'Buy Best Book Online Hear',
  },
  {
    image: slider2,
    slogan: 'Expand Your Knowledge',
    title: 'Best Online book Store',
  }
];

const Slider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate(); // Initialize navigate

  // Automatically move to the next slide every 7 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex === sliderData.length - 1 ? 0 : prevIndex + 1));
    }, 7000); // 7 seconds interval

    // Clean up the interval when the component unmounts
    return () => clearInterval(interval);
  }, []);

  const handleShopNowClick = () => {
    navigate('/books'); // Navigate to the book page
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  return (
      <div className="slider-container">
        <div className="slider-content" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
          {sliderData.map((slide, index) => (
              <div className="slide" key={index}>
                <img src={slide.image} alt={`Slide ${index + 1}`} />
                <div className="slide-text">
                  <div className="slogan">{slide.slogan}</div>
                  <div className="slide-title">{slide.title}</div>
                  <button className="shop-now-btn" onClick={handleShopNowClick}>Shop Now</button>
                </div>
              </div>
          ))}
        </div>
        {/* Dots indicator */}
        <div className="dots-container">
          {sliderData.map((_, index) => (
              <span
                  key={index}
                  className={`dot ${currentIndex === index ? 'active' : ''}`}
                  onClick={() => goToSlide(index)}
              />
          ))}
        </div>
      </div>
  );
};

export default Slider;
