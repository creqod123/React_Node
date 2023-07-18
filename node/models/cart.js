const mongoose = require('mongoose')
const Schema = mongoose.Schema

const cart = new Schema({

    productCart: {
        productName: { type: String },
        price: { type: Number },
        quantity: { type: Number },
        image: { type: String }
    }
})

module.exports = mongoose.model('cart', cart)
