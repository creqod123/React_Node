const mongoose = require('mongoose')
const con = require('../connection/mysql');
const adminProduct = require('../models/adminProduct')
const checkout = require('../models/checkout')
const register = require('../models/register')
const address = require('../models/address')
const cart = require('../models/cart')
const socket = require('../socket/index');

// ============================= getall data show =========================== 

exports.getAll = (async (req, res, next) => {

    try {

        const email = req.body.email
        const pageNumber = req.body.pageNumber;
        const result = {};
        const totalPosts = await adminProduct.countDocuments().exec();
        let startIndex = pageNumber * 9;
        result.totalPosts = totalPosts;
        result.data = await adminProduct.find()
            .sort("-_id")
            .skip(startIndex)
            .limit(9)
            .exec();
        res.status(200).json({
            message: "complete",
            data: result
        })
    }
    catch (error) {
        res.status(404).json({
            message: "complete fail",
        })
    }
});

// ============================= Cart data show =========================== 

exports.userCart = (async (req, res, next) => {

    try {

        res.status(200).json({
            success: true,
            message: "complete",
            data: req.data
        })
    }
    catch (error) {
        res.status(404).json({
            success: false,
            message: "complete fail",
        })
    }
});

// ============================= data checkout =========================== 

exports.checkout = (async (req, res, next) => {

    try {
        const id = req.body[1]
        const check = await register.find({ _id: id })
        const userId = check[0]._id
        let data = req.body[0]


        data.map(async (product) => {
            const { _id, productName, price, quantity, fullName, house, area, city, pincode } = product.cardData
            const sellerId = await adminProduct.findOne({ _id: _id })
            const id = await address.create({
                fullName: fullName,
                house: house,
                area: area,
                city: city,
                pincode: pincode
            })
            await checkout.create({
                quantity: quantity,
                price: price,
                status: "Pending",
                productId: _id,
                userId: userId,
                sellerId: sellerId.adminId,
                addressId: id._id
            })
        })

        socket.productCheckout('productCheckout');
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

// ============================= user detail show =========================== 


exports.detail = (async (req, res, next) => {


    try {
        const find = req.body._id
        const data = await checkout.find({ userId: find }).populate('productId').populate('addressId').populate('userId')

        res.status(200).json({
            success: true,
            message: "complete",
            data: data
        })
    }
    catch (error) {
        res.status(404).json({
            success: false,
            message: "fail",
        })
    }
});

// ============================= user order show =========================== 

exports.order = (async (req, res, next) => {
    try {
        const data = await address.find({ _id: req.body._id })
        res.status(200).json({
            success: true,
            message: "complete",
            data: data
        })
    }
    catch (error) {
        res.status(404).json({
            success: false,
            message: "fail",
        })
    }
});


// ============================= user order update =========================== 

exports.orderUpdate = (async (req, res, next) => {
    try {
        await address.updateOne({ _id: req.body.id }, { fullName: req.body.fullName, house: req.body.house, area: req.body.area, city: req.body.city, pincode: req.body.pincode })
        res.status(200).json({
            success: true,
            message: "complete",
        })
    }
    catch (error) {
        res.status(404).json({
            success: false,
            message: "fail",
        })
    }
});

// ============================= search order =========================== 

exports.search = (async (req, res, next) => {
    try {
        const Data = {}
        const pageNumber = req.body.paginat
        const message = req.body.message
        const totalPosts = await adminProduct.find({ productName: message }).countDocuments().exec();
        let startIndex = pageNumber * 9;
        Data.totalPosts = totalPosts;
        Data.data = await adminProduct.find({ productName: message })
            .sort("-_id")
            .skip(startIndex)
            .limit(9)
            .exec();
        res.status(200).json({
            success: true,
            message: "complete",
            data: Data
        })
    }
    catch (error) {
        res.status(404).json({
            success: false,
            message: "fail",
        })
    }
});

// ============================= User cart =========================== 

exports.cart = (async (req, res, next) => {
    try {

        const a = await cart.findOne({ userId: req.user._id })
        const userReqData = req.body.data

        if (a !== null) {
            await cart.deleteOne({ _id: a._id })
        }
        await cart.create({ userId: req.user._id, productCart: userReqData })
        res.status(200).json({
            success: true,
            message: "complete",
        })
    }
    catch (error) {
        res.status(404).json({
            success: false,
            message: "fail",
        })
    }
});
// ============================= User cart request =========================== 

exports.cartRequest = (async (req, res, next) => {
    try {

        let sql_data_

        const sqlQuery = "SELECT * FROM test.first WHERE id = 1;"
        const rows = con.query(sqlQuery, (a, b) => {
            sql_data_= b
        });
        const product = await cart.findOne({ userId: req.user._id }).populate('productCart.productId')
        res.status(200).json({
            success: true,
            message: "complete",
            data: product,
            data_1: sql_data_
        })
    }
    catch (error) {
        res.status(404).json({
            success: false,
            message: "fail",
        })
    }
});