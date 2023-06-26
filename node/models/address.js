const mongoose = require('mongoose')
const Schema = mongoose.Schema

const address = new Schema({
    fullName: {
        type: String,
        require: true
    },
    house: {
        type: String,
        require: true
    },
    area: {
        type: String,
        require: true
    },
    city: {
        type: String,
        require: true
    },
    pincode: Number,
})

module.exports = mongoose.model('address', address)