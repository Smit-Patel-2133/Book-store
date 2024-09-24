import './Home.css';
import NavigationBar from "../NavigationBar/NavigationBar.jsx";
import Slider from '../slider/Slider.jsx';
import ContentSlider from '../BestsellingBooks/ContentSlider.jsx';
import Footer from "../Footer/Footer.jsx";
import { useState, useEffect } from 'react';

const Home = () => {
  const [newArrivals, setNewArrivals] = useState([]);
  const [bestSellers, setBestSellers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchHomePageData = async () => {
      try {
        const response = await fetch('http://localhost:3000/homepage');
        const data = await response.json();
        setNewArrivals(data.newArrivals || []);
        setBestSellers(data.bestSellers || []);
        // console.log("smit:",newArrivals.current);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching homepage data:", error);
        setIsLoading(false);
      }
    };

    fetchHomePageData();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
      <>
        <NavigationBar />
        <Slider />
        <div className="main-container">
          <ContentSlider products={newArrivals} name="New Arrivals" />
          <ContentSlider products={bestSellers} name="Best Sellers" />
        </div>
        <Footer />
      </>
  );
};

export default Home;
