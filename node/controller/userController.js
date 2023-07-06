const mongoose = require('mongoose')
const adminProduct = require('../models/adminProduct')
const checkout = require('../models/checkout')
const register = require('../models/register')
const address = require('../models/address')

// ============================= getall data show =========================== 

exports.getAll = ('/user', async (req, res, next) => {

    try {

        const email = req.body.email

        const id = await register.find({ email: email })
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
            data: result,
            id: id[0]._id
        })
    }
    catch (error) {
        res.status(404).json({
            message: "complete fail",
        })
    }
});

// ============================= Cart data show =========================== 

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

// ============================= data checkout =========================== 

exports.checkout = ('/user/checkout', async (req, res, next) => {

    try {
        const userEmail = req.body[1]
        const check = await register.find({ email: userEmail })
        const userId = check[0]._id
        const adminIdStore = []
        let data = req.body[0]
        const { fullName, house, area, city, pincode } = data[0].cardData
        const id = await address.create({
            fullName: fullName,
            house: house,
            area: area,
            city: city,
            pincode: pincode
        })

        data.map(async (product) => {
            adminIdStore.push(product.cardData.adminId)
        })

        for (let i = 0; i < adminIdStore.length; i++) {
            for (let j = i + 1; j < adminIdStore.length; j++) {
                if (adminIdStore[i] === adminIdStore[j]) {
                    adminIdStore.splice(j, 1)
                    j--
                }
            }
        }

        adminIdStore.map(async (adminIdGet) => {
            const productIds = []
            const quantitys = []
            const prices = []
            data.map(async (product) => {
                const { quantity, _id, adminId, price } = product.cardData
                if (adminId === adminIdGet) {
                    productIds.push(_id)
                    quantitys.push(quantity)
                    prices.push(price)
                }
            })
            await checkout.create({
                quantity: quantitys,
                price: prices,
                productId: productIds,
                userId: userId,
                sellerId: adminIdGet,
                addressId: id._id,
                status: "Pending"
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

// ============================= user detail show =========================== 


exports.detail = ('/user/detail', async (req, res, next) => {


    try {
        const id = await register.find({ email: req.body.email })
        const find = id[0]._id
        const data = await checkout.find({ userId: find }).populate('productId').populate('addressId').populate('userId')

        res.status(200).json({
            message: "complete",
            data: data
        })
    }
    catch (error) {
        res.status(404).json({
            message: "fail",
        })
    }
});

// ============================= user order show =========================== 

exports.order = ('/user/order', async (req, res, next) => {
    try {
        const data = await address.find({ _id: req.body.email })
        res.status(200).json({
            message: "complete",
            data: data
        })
    }
    catch (error) {
        res.status(404).json({
            message: "fail",
        })
    }
});


// ============================= user order update =========================== 

exports.orderUpdate = ('/user/orderupdate', async (req, res, next) => {
    try {
        await address.updateOne({ _id: req.body.id }, { fullName: req.body.fullName, house: req.body.house, area: req.body.area, city: req.body.city, pincode: req.body.pincode })
        res.status(200).json({
            message: "complete",
        })
    }
    catch (error) {
        res.status(404).json({
            message: "fail",
        })
    }
});

// ============================= search order =========================== 

exports.search = ('/user/search', async (req, res, next) => {
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
            message: "complete",
            data: Data
        })
    }
    catch (error) {
        res.status(404).json({
            message: "fail",
        })
    }
});