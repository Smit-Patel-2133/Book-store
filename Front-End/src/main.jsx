import App from './App.jsx';
import './index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from "react-redux";
import { store } from "./app/Store.jsx";
import { createRoutesFromElements, Route } from "react-router";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./components/Login/Login.jsx";
import LandingPage from "./components/Landing/LandingPage.jsx";
import SignUp from "./components/SignUp/SignUp.jsx";
import HomePage from "./components/Home/Home.jsx";
import Books from "./components/Books/Books.jsx";
import BookDetail from "./components/BookDetails/BookDetails.jsx";
import AdminLogin from "./components/Admin/Login/AdminLogin.jsx";
import Dashboard from "./components/Admin/Dashboard/Dashboard.jsx";
import AdminBooksPage from "./components/Admin/component/Books Detail/AdminBookPage.jsx"
import {BooksProvider} from "./components/Admin/context/BooksContext.jsx";
import Cart from "./components/Cart/Cart.jsx";
import Wishlist from "./components/wishlist/WishList.jsx";
import Checkout from "./components/Checkout/Checkout.jsx";
import PaymentStatus from "./components/Checkout/PaymentStatus.jsx";
import DeliveryLogin from  "./components/Delivery Persion/Login/Login.jsx"
import DeliverySignup from "./components/Delivery Persion/Login/Signup.jsx"
import AdminOrder from "./components/Admin/component/Order/AdminOrder.jsx";
import Contact from './components/Contact/contact.jsx';
import ProfilePage from './components/Profile/ProfilePage.jsx';
import DeliveryDashboard from "./components/Delivery Persion/dashboard/DeliveryDashboard.jsx";
import AdminDeliveryPersonMangement from "./components/Admin/component/Delivery/AdminDeliveryPersonMangement.jsx";
import AdminContactFromUser from "./components/Admin/component/Contact/AdminContactFromUser.jsx";
const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path='' element={<App />}>
            <Route path='/' element={<HomePage/>} />
            <Route path='/home_page' element={<HomePage/>} />
            <Route path='/login' element={<Login />} />
            <Route path='/SignUp' element={<SignUp/>}/>
            <Route path='/Books' element={<Books/>}/>
            <Route path="/books/:id" element={<BookDetail />} />
            <Route path="/adminLogin" element={<AdminLogin/>} />
            <Route path='/admindashboard' element={<Dashboard/>} />
            <Route path="/admindashboard/AdminBooksPage" element={<AdminBooksPage />} />
            <Route path="/admindashboard/AdminOrderPage" element={<AdminOrder/>} />
            <Route path="/adminContactUser" element={<AdminContactFromUser />} />


            <Route path="/PersonRequest" element={<AdminDeliveryPersonMangement/>}/>
            <Route path='/cart' element={<Cart/>} />
            <Route path='/wishlist' element={<Wishlist/>}/>
            <Route path='/Checkout' element={<Checkout/>}/>
            <Route path="/payment-status" element={<PaymentStatus />} />
            <Route path="/DelivertPersionLogin"element={<DeliveryLogin/>}/>
            <Route path="/DeliveryPersonSignup"element={<DeliverySignup/>}/>
            <Route path="/contact" element={<Contact/>}/>
            <Route path="/userprofile" element={<ProfilePage/>}/>
            <Route path={"/deliveryDashboard"} element={<DeliveryDashboard/>}/>

        </Route>
    )
);
ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Provider store={store}> {/* Wrap your App component with Provider */}
        <BooksProvider>
            <RouterProvider router={router} />
        </BooksProvider>
        </Provider>
    </React.StrictMode>,
);