import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { createRoutesFromElements, Route } from "react-router";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./components/Login/Login.jsx";
import LandingPage from "./components/Landing/LandingPage.jsx";
import SignUp from "./components/SignUp/SignUp.jsx";
import HomePage from "./components/Home/Home.jsx";
const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path='/' element={<App />}>
            <Route path='/information_Page' element={<LandingPage/>} />
            <Route path='/home_page' element={<HomePage/>} />
            <Route path='/login' element={<Login />} />
            <Route path='/SignUp' element={<SignUp/>}/>
        </Route>
    )
);

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>,
);
