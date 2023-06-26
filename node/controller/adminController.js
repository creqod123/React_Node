const mongoose = require('mongoose')
const adminProduct = require('../models/adminProduct')
const register = require('../models/register')
const checkout = require('../models/checkout');
const address = require('../models/address');

// ============================= Admin get product =========================== 

exports.getAll = ('/admin', async (req, res, next) => {
    const email = req.body.email
    try {
        const objectid = await register.find({ email: req.body.email })
        const id = objectid[0]._id
        const data = await adminProduct.find({ email: email })
        res.status(200).json({
            message: "complete",
            data: data,
            id: id,
        })
    }
    catch (error) {
        res.status(404).json({
            message: "complete fail",
        })
    }
});

// ============================= Admin add product =========================== 

exports.add = ('/admin/add', async (req, res, next) => {

    try {
        console.log('1', req.file)

        const check = await register.find({ email: req.body.email })
        req.body.image = req.file.path

        const id = await adminProduct.find()
        req.body.ids = id.length + 1

        req.body['adminId'] = check[0]._id

        if (check.length != 0) {
            const a = await adminProduct.create(req.body)
            const data = await adminProduct.find({ email, email })

            res.status(200).json({
                message: "complete",
                data: data
            })
        }
        else {
            console.log('2')
            res.status(200).json({
                message: "complete fail",
            })
        }
    }
    catch (error) {
        res.status(404).json({
            message: error.message,
        })
    }
});

// ============================= Admin remove product =========================== 

exports.remove = ('/admin/remove', async (req, res, next) => {
    try {
        const id = req.body.id
        const email = req.body.email
        await adminProduct.deleteOne({ _id: id })
        await checkout.deleteOne({ productId: id })
        const send = await adminProduct.find({ email: email })

        res.status(200).json({
            message: "complete",
            data: send
        })
    }
    catch (error) {
        res.status(404).json({
            message: "fail",
        })
    }
});


// ============================= Admin detail show =========================== 


exports.detail = ('/admin/detail', async (req, res, next) => {
    const check = await register.find({ email: req.body.email })
    id = check[0]._id
    try {
        var data = await checkout.find({ sellerId: id }).populate('productId').populate('userId').populate('addressId')
        res.status(200).json({
            message: "complete",
            data: data,
        })
    }
    catch (error) {
        res.status(404).json({
            message: "fail",
        })
    }
});

// ============================= Admin detail show =========================== 


exports.update = ('/admin/update', async (req, res, next) => {

    const data = await register.find({ email: req.body.email })
    await adminProduct.updateOne({ adminId: data[0]._id }, { productName: req.body.productName, price: req.body.price })

    try {
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

// ============================= Admin Order show =========================== 


exports.order = ('/admin/order', async (req, res, next) => {
    console.log("Data 123:- ", req.body)
    try {
        const data = await address.find({ _id: req.body.email })
        res.status(200).json({
            message: "complete",
            data: data,
        })
    }
    catch (error) {
        res.status(404).json({
            message: "fail",
        })
    }
});

// ============================= Admin status update show =========================== 


exports.status = ('/admin/status', async (req, res, next) => {
    console.log("Data 123:- ", req.body)
    const id = req.body.id
    const status = req.body.status

    if (status === 'conform') {
        await checkout.updateOne({ _id: id }, {status:'Conform'})
    }
    else {
        console.log("Delete")
    }

    try {
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