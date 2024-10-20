import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    wishlistItems: [],
};

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
        },
        removeItemFromWishlist(state, action) {
            const id = action.payload;
            state.wishlistItems = state.wishlistItems.filter(item => item.id !== id);
        }
    }
});

export const { addItemToWishlist, removeItemFromWishlist } = wishlistSlice.actions;

export default wishlistSlice.reducer;
