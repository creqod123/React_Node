const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userCart = new Schema({
    email: String,
    carts: String
})

module.exports = mongoose.model('userCart', userCart)