import './Home.css';
import NavigationBar from "../NavigationBar/NavigationBar.jsx";
import Slider from '../slider/Slider.jsx';
import BestsellingBooks from '../BestsellingBooks/BestsellingBooks.jsx';
import m1 from '../../assets/images/book demo/b2.jpg';
import m2 from '../../assets/images/book demo/b1.jpeg';
import m3 from '../../assets/images/book demo/b3.jpeg';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import ReactSlick from 'react-slick';  // Import react-slick for the new slider

// Product Data
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
    image: m2,
    title: 'Animals Life',
    price: 40.00,
    discountPrice: 570.00,
    label: 'Bowen Greenwood'
  },
  {
    id: 3,
    tag: 'BEST SELLER',
    image: m3,
    title: 'War of Dragon',
    price: 35.00,
    discountPrice: 231.00,
    label: 'Moren Nicol'
  },
  {
    id: 4,
    tag: 'HOT',
    image: m3,
    title: 'Lando',
    price: 35.00,
    discountPrice: 502.00,
    label: 'Madhu Sashon'
  },
  {
    id: 5,
    tag: 'HOT',
    image: m3,
    title: 'Lando',
    price: 35.00,
    discountPrice: 502.00,
    label: 'Madhu Sashon'
  },
  {
    id: 6,
    tag: 'HOT',
    image: m3,
    title: 'Lando',
    price: 35.00,
    discountPrice: 502.00,
    label: 'Madhu Sashon'
  },
  {
    id: 7,
    tag: 'HOT',
    image: m3,
    title: 'Lando',
    price: 35.00,
    discountPrice: 502.00,
    label: 'Madhu Sashon'
  },
  {
    id: 8,
    tag: 'HOT',
    image: m3,
    title: 'Lando',
    price: 35.00,
    discountPrice: 502.00,
    label: 'Madhu Sashon'
  }
];
const products2 = [

  {
    id: 1,
    tag: 'HOT',
    image: m3,
    title: 'Lando',
    price: 35.00,
    discountPrice: 502.00,
    label: 'Madhu Sashon'
  },
  {
    id: 2,
    tag: 'HOT',
    image: m3,
    title: 'Lando',
    price: 35.00,
    discountPrice: 502.00,
    label: 'Madhu Sashon'
  },
  {
    id: 3,
    tag: 'HOT',
    image: m3,
    title: 'Lando',
    price: 35.00,
    discountPrice: 502.00,
    label: 'Madhu Sashon'
  },
  {
    id: 4,
    tag: 'HOT',
    image: m3,
    title: 'Lando',
    price: 35.00,
    discountPrice: 502.00,
    label: 'Madhu Sashon'
  },
  {
    id: 5,
    tag: 'HOT',
    image: m3,
    title: 'Lando',
    price: 35.00,
    discountPrice: 502.00,
    label: 'Madhu Sashon'
  },
  {
    id: 6,
    tag: 'HOT',
    image: m3,
    title: 'Lando',
    price: 35.00,
    discountPrice: 502.00,
    label: 'Madhu Sashon'
  },
  {
    id: 7,
    tag: 'HOT',
    image: m3,
    title: 'Lando',
    price: 35.00,
    discountPrice: 502.00,
    label: 'Madhu Sashon'
  },
  {
    id: 8,
    tag: 'HOT',
    image: m3,
    title: 'Lando',
    price: 35.00,
    discountPrice: 502.00,
    label: 'Madhu Sashon'
  }
];
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

const Home = () => {
  return (
    <>
      <NavigationBar />
      <Slider />
      <div className="main-container">
        {/* Bestselling Books Slider */}
        <BestsellingBooks products={products} name="new"/>
        <BestsellingBooks products={products2} name="bestsell"/>
      </div>
    </>
  );
};

export default Home;