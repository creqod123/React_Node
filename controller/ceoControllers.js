const mongoose = require('mongoose')
const adminProduct = require('../models/adminProduct')
const register = require('../models/register')
const checkout = require('../models/checkout');

exports.getData = ('/ceo', async (req, res, next) => {
    try {
        var user = await register.find({ type: "user" }, { _id: 1, email: 1, tel: 1, type: 1 })
        var seller = await register.find({ type: "seller" })

        res.status(200).json({
            message: "complete",
            user: user,
            seller: seller
        })
    }
    catch (error) {
        res.status(404).json({
            message: "complete fail",
        })
    }
});



// =========================================  User Detail =========================================

exports.userDetail = ('/ceo/user/detail', async (req, res, next) => {

    var id = req.body.id
    var data = await checkout.find({ userId: id }, { quantity: 1, price: 1, productId: 1 }).populate('productId')

    try {

        res.status(200).json({
            message: "complete",
            data: data,
        })
    }
    catch (error) {
        res.status(404).json({
            message: "complete fail",
        })
    }
});

exports.userDelete = ('/ceo/user/delete', async (req, res, next) => {

    var registerid = req.body.id
    var a = await register.find({ _id: registerid })

    if (a.length == 0) {
        var a = await checkout.deleteOne({ productId: registerid })
    }
    else {
        await checkout.deleteMany({ userId: registerid })
        await register.deleteOne({ _id: registerid })
    }
    try {
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



// ========================================= Admin detail and remove ====================================   

exports.adminDetail = ('/ceo/admin/detail', async (req, res, next) => {

    var id = req.body.id
    var data = await adminProduct.find({ adminId: id }, { _id: 1, productName: 1, price: 1 })
    try {

        res.status(200).json({
            message: "complete",
            data: data,
        })
    }
    catch (error) {
        res.status(404).json({
            message: "complete fail",
        })
    }
});

exports.productRemove = ('/ceo/admin/productremove', async (req, res, next) => {

    var id = req.body.id
    try {

        var data = await register.find({ _id: id })
        if (data.length != 0) {
            await adminProduct.deleteOne({ adminId: id })
            await checkout.deleteOne({ sellerId: id })
        }
        else {
            await adminProduct.deleteOne({ _id: id })
            await checkout.deleteOne({ productId: id })
        }

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

