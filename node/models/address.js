const mongoose = require('mongoose')
const Schema = mongoose.Schema

const address = new Schema({
    fullName: String,
    house: String,
    area: String,
    city: String,
    pincode: Number,
})

module.exports = mongoose.model('address', address)