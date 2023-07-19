const mongoose = require('mongoose')
const adminProduct = require('../models/adminProduct')
const register = require('../models/register')
const checkout = require('../models/checkout');
const socket = require('../socket/index');

exports.getData = (async (req, res, next) => {
    try {
        const user = await register.find({ type: "user" }, { _id: 1, email: 1, tel: 1, type: 1 })
        const seller = await register.find({ type: "seller" })
        socket.ceoUserGet('ceoUserData', [user, seller]);
        res.status(200).json({
            message: "complete",
            data: {user:user, seller:seller}
        })
    }
    catch (error) {
        res.status(404).json({
            message: "complete fail",
        })
    }
});

// =========================================  User Detail =========================================

exports.userDetail = (async (req, res, next) => {
    try {
        const id = req.body.id
        const data = await checkout.find({ userId: id }, { quantity: 1, price: 1, productId: 1 }).populate('productId')

        res.status(200).json({
            success: true,
            message: "complete",
            data: data,
        })
    }
    catch (error) {
        res.status(404).json({
            success: false,
            message: "complete fail",
        })
    }
});

exports.userDelete = (async (req, res, next) => {

    try {
        const registerid = req.body.id
        const a = await register.find({ _id: registerid })

        if (a.length == 0) {
            const a = await checkout.deleteOne({ productId: registerid })
        }
        else {
            await checkout.deleteMany({ userId: registerid })
            await register.deleteOne({ _id: registerid })
        }
        res.status(200).json({
            success: true,
            message: "complete",
        })
    }
    catch (error) {
        res.status(404).json({
            success: false,
            message: "complete fail",
        })
    }
});



// ========================================= Admin detail and remove ====================================   

exports.adminDetail = (async (req, res, next) => {

    try {
        const id = req.body.id
        const data = await adminProduct.find({ adminId: id }, { _id: 1, productName: 1, price: 1 })
        res.status(200).json({
            success: true,
            message: "complete",
            data: data,
        })
    }
    catch (error) {
        res.status(404).json({
            success: false,
            message: "complete fail",
        })
    }
});

exports.productRemove = (async (req, res, next) => {

    try {
        const id = req.body.id
        const data = await register.find({ _id: id })
        if (data.length != 0) {
            await adminProduct.deleteOne({ adminId: id })
            await checkout.deleteOne({ sellerId: id })
            await register.deleteOne({ _id: id })
        }
        else {
            await adminProduct.deleteOne({ _id: id })
            await checkout.deleteOne({ productId: id })
        }

        res.status(200).json({
            success: true,
            message: "complete",
        })
    }
    catch (error) {
        res.status(404).json({
            success: false,
            message: "complete fail",
        })
    }
});

exports.searchData = (async (req, res, next) => {
    try {
        const check = await register.find({ email: req.body.email })
        const id = check[0]._id
        const checkType = check[0].type
        if (checkType === "user") {
            const data = await checkout.find({ userId: id }).populate('userId')
            res.status(200).json({
                message: "complete",
                data: data
            })
        }
        else {
            const data = await adminProduct.find({ adminId: id })
            res.status(200).json({
                message: "complete",
                data: data[0]
            })
        }
    }
    catch (error) {
        res.status(404).json({
            message: "complete fail",
        })
    }
});