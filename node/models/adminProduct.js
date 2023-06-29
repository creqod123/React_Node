const mongoose = require('mongoose')
const Schema = mongoose.Schema

const adminProduct = new Schema({
    image: String,
    email: String,
    productName: String,
    price: Number,
    adminId: {

        type: mongoose.Schema.Types.ObjectId,
        ref: "register",
        required: true

    },
})

module.exports = mongoose.model('adminProduct', adminProduct)