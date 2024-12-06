// redux/deliveryPersonSlice.js
import { createSlice } from '@reduxjs/toolkit';

const deliveryPersonSlice = createSlice({
    name: 'deliveryPerson',
    initialState: {
        details: null, // Store the delivery person details
        isLoggedIn: false,
    },
    reducers: {
        setDeliveryPerson: (state, action) => {
            state.details = action.payload;
            state.isLoggedIn = true;
            console.log("pay:-",action.payload);
        },
        clearDeliveryPerson: (state) => {
            state.details = null;
            state.isLoggedIn = false;
        },
    },
});

export const { setDeliveryPerson, clearDeliveryPerson } = deliveryPersonSlice.actions;
export default deliveryPersonSlice.reducer;
