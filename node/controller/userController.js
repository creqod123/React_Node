const mongoose = require('mongoose')
const adminProduct = require('../models/adminProduct')
const checkout = require('../models/checkout')
const usercart = require('../models/userCart')
const register = require('../models/register')


exports.getAll = ('/user', async (req, res, next) => {

    const length = req.body.pageLength
    var email = req.body.email
    var data = await adminProduct.find()
    var id = await register.find({ email: email })
    var Hello = data.slice(length - 9, length)

    try {
        res.status(200).json({
            message: "complete",
            data: Hello,
            id: id[0]._id
        })
    }
    catch (error) {
        res.status(404).json({
            message: "complete fail",
        })
    }
});

exports.userCart = ('/user/cart', async (req, res, next) => {

    try {
        res.status(200).json({
            message: "complete",
            data: req.data
        })
    }
    catch (error) {
        res.status(404).json({
            message: "complete fail",
        })
    }
});


exports.checkout = ('/user/checkout', async (req, res, next) => {
    var userEmail = req.body[1]
    let check = await register.find({ email: userEmail })
    userId = check[0]._id

    try {
        var data = req.body[0]
        data.map(async (product) => {

            const { quantity, _id, adminId, price } = product.cardData
            await checkout.create({
                quantity: quantity,
                price: price,
                productId: _id,
                userId: userId,
                sellerId: adminId
            })
        })

        res.status(200).json({
            message: "complete",
        })
    }
    catch (error) {
        res.status(404).json({
            message: "complete fail",
        })
    }
});