const mongoose = require('mongoose')
const { stringify } = require('querystring')
const Schema = mongoose.Schema

const checkout = new Schema({

    quantity: Number,
    price: Number,
    productName: String,
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
    }
})

module.exports = mongoose.model('checkout', checkout)