const mongoose = require('mongoose')
const Schema = mongoose.Schema

const cart = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        unique: true,
        ref: "register",
        required: true
    },
    productCart: {
        productId: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "adminProduct",
            required: true
        }],
        quantity: [{
            type: Number
        }]
    },

})

module.exports = mongoose.model('cart', cart)
