const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    orderId: { type: String, required: true },
    orderAmount: { type: Number, required: true },
    date: { type: Date, required: true },
    time: { type: String, required: true },
    paymentMode: { type: String, required: true },
    paymentStatus: { type: String, required: true },
    items: [
        {
            itemId: { type: String, required: true },
            title: { type: String, required: true }
        }
    ],
    userId: { type: String, required: true }
});

module.exports = mongoose.model('Order', orderSchema);
