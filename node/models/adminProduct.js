const mongoose = require('mongoose')
const Schema = mongoose.Schema

const adminProduct = new Schema({
    image: String,
    productName: String,
    price: Number,
    stock: Number,
    adminId: {

        type: mongoose.Schema.Types.ObjectId,
        ref: "register",
        required: true

    },
})

module.exports = mongoose.model('adminProduct', adminProduct)