const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    customername: {
        type: String,
        required: true
    },
    orderdate: {
        type: String,
        required: true
    },
    totalAmount: {
        type: String,
        required: true
    },
    billing: [{
        quantity: {
            type: String,
            required: true,
        },
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product'
        },
    }],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
}, {
    timestamps: true
});

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;
