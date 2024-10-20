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
import Dashboard from "./components/Admin/Dashboard/Dashboad.jsx";
const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path='' element={<App />}>
            <Route path='/' element={<LandingPage/>} />
            <Route path='/home_page' element={<HomePage/>} />
            <Route path='/login' element={<Login />} />
            <Route path='/SignUp' element={<SignUp/>}/>
            <Route path='/Books' element={<Books/>}/>
            <Route path="/books/:id" element={<BookDetail />} />
            <Route path="/adminLogin" element={<AdminLogin/>} />
            <Route path='/admindashboard' element={<Dashboard/>} />
        </Route>
    )
);
ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Provider store={store}> {/* Wrap your App component with Provider */}
            <RouterProvider router={router} />
        </Provider>
    </React.StrictMode>,
);