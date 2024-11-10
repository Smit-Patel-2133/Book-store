// src/redux/orderSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    orderId: '',
};

const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        setOrderId: (state, action) => {
            state.orderId = action.payload;
            console.log('Order ID set in hte store:', state.orderId); // Log the orderId whenever it's set
        },
        resetOrderId: (state) => {
            console.log('Order ID reset in the store:');
            state.orderId = '';
        },
    },
});

export const { setOrderId, resetOrderId } = orderSlice.actions;
export default orderSlice.reducer;
