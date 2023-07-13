const mongoose = require('mongoose')
const Schema = mongoose.Schema

const checkout = new Schema({

    quantity: {
        type: Number
    },
    price: {
        type: Number
    },
    status: {
        type: String
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "adminProduct",
        required: true
    },
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