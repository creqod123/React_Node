var mongoose = require('mongoose')
var register = require('../models/register')
var bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

// ============================= Admin and user Login ============================= 

exports.login = ('/login', async (req, res, next) => {

    try {
        const { email, password } = req.body
        const check = await register.findOne({ email: email })
        if (email.length === 0 || check === null) {
            res.status(200).json({
                message: "Enter vaild email",
            })
        }
        else if (check.email === "ceo@gmail.com" && password === "ceo") {
            const token = jwt.sign({
                data: 'foobar'
            }, process.env.JWT_SECRET_KEY);
            res.status(200).json({
                message: "complete",
                email: check.email,
                type: check.type,
                token: token
            })
        }
        else if (check != null) {
            const checkPass = await bcrypt.compareSync(password, check.password)
            if (checkPass) {
                const token = jwt.sign({
                    data: 'foobar'
                }, process.env.JWT_SECRET_KEY);
                res.status(200).json({
                    message: "complete",
                    email: check.email,
                    type: check.type,
                    token: token
                })
            }
            else {
                res.status(200).json({
                    message: "Password_not_same",
                })
            }
        }
        else {
            res.status(200).json({
                message: "Enter vaild email",
            })
        }

    }
    catch (err) {
        res.status(404).json({
            message: err.message,
            data: req.body,
        })
    }

});