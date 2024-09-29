import { configureStore } from "@reduxjs/toolkit";
import { userDetails } from '../features/authentication/auth.js';

export const store = configureStore({
    reducer: {
        user_info: userDetails.reducer
    }
});

