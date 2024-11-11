import { configureStore } from "@reduxjs/toolkit";
import userDetailsReducer from '../features/authentication/auth.js'; // Use default import for userDetails
import cartReducer from "../features/Cart_Items/cart.js";
import wishlistReducer from "../features/wishlist/wishlist.js";
export const store = configureStore({
    reducer: {
        user_info: userDetailsReducer,
        cart: cartReducer,
        wishlist: wishlistReducer,

    }
});
