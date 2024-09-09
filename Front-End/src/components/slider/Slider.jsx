import React, { useState, useEffect } from 'react';
import './Slider.css'; // For custom styles

const sliderData = [
  {
    image: 'https://via.placeholder.com/800x400/FF5733/FFFFFF?text=Slide+1',
    slogan: 'Slogan for Slide 1',
  },
  {
    image: 'https://via.placeholder.com/800x400/33FF57/FFFFFF?text=Slide+2',
    slogan: 'Slogan for Slide 2',
  },
  {
    image: 'https://via.placeholder.com/800x400/3357FF/FFFFFF?text=Slide+3',
    slogan: 'Slogan for Slide 3',
  },
];

const Slider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Automatically move to the next slide every 7 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex === sliderData.length - 1 ? 0 : prevIndex + 1));
    }, 7000); // 7 seconds interval

    // Clean up the interval when the component unmounts
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="slider-container">
      <div className="slider-content" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
        {sliderData.map((slide, index) => (
          <div className="slide" key={index}>
            <img src={slide.image} alt={`Slide ${index + 1}`} />
            <div className="slogan">{slide.slogan}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Slider;
