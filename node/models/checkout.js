const mongoose = require('mongoose')
const Schema = mongoose.Schema

const checkout = new Schema({

    quantity: [Number],
    price: [Number],
    status: String,
    productId: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "adminProduct",
        required: true
    }],
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "register",
        required: true
    },
    sellerId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    addressId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "address",
        required: true
    }
})

module.exports = mongoose.model('checkout', checkout)