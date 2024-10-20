import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async action to fetch cart items
export const fetchCartItems = createAsyncThunk('cart/fetchCartItems', async (userId) => {
    const response = await axios.get(`http://localhost:3000/api/cart/getCartItem?userId=${userId}`);
    return response.data;
});

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [],
        totalQuantity: 0,
        status: 'idle',
        error: null,
    },
    reducers: {
        addItemToCart(state, action) {
            const newItem = action.payload;
            const existingItem = state.items.find(item => item.bookId === newItem.bookId);
            if (!existingItem) {
                state.items.push(newItem);
                state.totalQuantity++;
            }
        },
        removeItemFromCart(state, action) {
            const { bookId } = action.payload;
            state.items = state.items.filter(item => item.bookId !== bookId);
            state.totalQuantity--;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCartItems.fulfilled, (state, action) => {
                state.items = action.payload;
                state.totalQuantity = action.payload.length;
            })
            .addCase(fetchCartItems.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchCartItems.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    }
});

export const { addItemToCart, removeItemFromCart } = cartSlice.actions;
export default cartSlice.reducer;
