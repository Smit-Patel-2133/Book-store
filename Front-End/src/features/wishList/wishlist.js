// features/Wishlist_Items/wishlist.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    wishlistItems: [],
};

export const fetchWishlistItems = createAsyncThunk(
    'wishlist/fetchWishlistItems',
    async (userId) => {
        const response = await axios.get(`http://localhost:3000/api/wishlist?userId=${userId}`);
        return response.data; // Assuming the API returns an array of item IDs
    }
);

const wishlistSlice = createSlice({
    name: 'wishlist',
    initialState,
    reducers: {
        addItemToWishlist(state, action) {
            const newItem = action.payload;
            const existingItem = state.wishlistItems.find(item => item.id === newItem.id);
            if (!existingItem) {
                state.wishlistItems.push(newItem);
            }
            console.log("wishlist", state.wishlistItems); // Updated to use state.wishlistItems
        },
        removeItemFromWishlist(state, action) {
            const id = action.payload;
            state.wishlistItems = state.wishlistItems.filter(item => item.id !== id);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchWishlistItems.fulfilled, (state, action) => {
                state.wishlistItems = action.payload; // Store the fetched wishlist items
            });
    }
});

export const { addItemToWishlist, removeItemFromWishlist } = wishlistSlice.actions;

export default wishlistSlice.reducer;
