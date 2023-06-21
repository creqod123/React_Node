var mongoose = require('mongoose')
var register = require('../models/register')
const bcrypt = require('bcrypt')
const saltRounds = 10;
const jwt = require('jsonwebtoken')

// ============================= Admin and user register =========================== 

exports.register = ('/register', async function (req, res, next) {

    try {

        const { email, password, conPassword, tel, type } = req.body
        const pass = await bcrypt.hash(password, saltRounds)
        const check = await register.findOne({ email: email })

        const data = {
            email: email,
            password: pass,
            tel: tel,
            type: type
        }

        var mail = '@gmail.com'
        var mail1 = email.slice(-10)

        if (mail != mail1) {
            console.log("First")
            res.status(200).json({
                message: "Enter vaild email",
            })
        }
        else if (check != null) {
            console.log("second")
            res.status(200).json({
                message: "email already exist",
            })
        }
        else if (password == "" || password != conPassword) {
            console.log("Third")
            res.status(200).json({
                message: "Password_not_same",
            })
        }
        else if (10 != tel.length) {
            console.log("Fourth")
            res.status(200).json({
                message: "check number",
            })
        }
        else if (type == "") {
            console.log("Fifth")
            res.status(200).json({
                message: "type",
            })
        }
        else {
            console.log("Sixth")
            const token = jwt.sign({
                data: 'foobar'
            }, process.env.JWT_SECRET_KEY);
            await register.create(data)
            data.token = token

            res.status(200).json({
                message: "Succesfull",
                email: email,
                token: token,
                type: type
            })
        }
    }
    catch (err) {
        res.status(404).json({
            message: err.message,
            message: "fail"
        })
    }
});
