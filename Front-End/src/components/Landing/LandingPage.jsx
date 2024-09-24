
import Slider from "../slider/Slider.jsx";
import NavigationBar from "../NavigationBar/NavigationBar.jsx";
import Header from "../NavigationBar/Header.jsx";
import HeroSection from "../HeroSection/HeroSection.jsx";
import CategoriesSection from "../CategoriesSection/CategoriesSection.jsx";
import PopularBooks from "../PopularBooks/PopularBooks.jsx";
import OffersBanners from "../OfferBanners/OffersBanners.jsx";
import Testimonials from "../Testimonials/Testimonials.jsx";
import Footer from "../Footer/Footer.jsx";
// import Cart from "../Cart/Cart.jsx";





const LandingPage = () => {
    return (
        <div>
            <Header/>
            <HeroSection/>
            <CategoriesSection/>
            <PopularBooks/>
            <OffersBanners/>
            <Testimonials/>
            {/* <Cart/> */}
            <Footer/>
            {/* <Slider/> */}

        </div>
    );
};

export default LandingPage;