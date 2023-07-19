const mongoose = require('mongoose')
const Schema = mongoose.Schema

const cart = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "register",
        required: true
    },
    productCart: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "adminProduct",
        required: true
    }]
})

module.exports = mongoose.model('cart', cart)
