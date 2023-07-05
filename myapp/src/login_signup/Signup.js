import axios from "axios"
import React, { useState } from "react"
import { Link } from "react-router-dom"
import './l-s.css'

function SignUp() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [conPassword, setConpassword] = useState('')
    const [tel, setTel] = useState('')
    const [type, setType] = useState('')
    const [checkEmail, setCheckEmail] = useState(false)
    const [CheckPassword, setCheckPassword] = useState(false)
    const [CheckTel, setCheckTel] = useState(false)
    const [CheckType, setCheckType] = useState(false)


    
    // const [CheckConPassword, setCheckConPassword] = useState(false)



    const pass = { Enter_Password: 'Enter Password', Password_not_same: 'Password not same', Password_Length: 'Password Length' }

    const submit = async (e) => {
        e.preventDefault()
        let res
        try {
            res = await axios.post(process.env.REACT_APP_REGISTER_URL, {
                email, password, conPassword, tel, type
            })
            if (res.data.message === "Enter vaild email" || res.data.message === "email already exist") {
                setCheckEmail(true)
                setCheckPassword(false)
                setCheckTel(false)
                setCheckType(false)
            }
            else if (res.data.message === "Password_not_same") {
                setCheckEmail(false)
                setCheckPassword(true)
                setCheckTel(false)
                setCheckType(false)
            }
            else if (res.data.message === "check number") {
                setCheckEmail(false)
                setCheckPassword(false)
                setCheckTel(true)
                setCheckType(false)
            }
            else if (res.data.message === "type") {
                setCheckEmail(false)
                setCheckPassword(false)
                setCheckTel(false)
                setCheckType(true)
            }
            else if (res.data.message === "Succesfull") {
                localStorage.setItem("email", res.data.email)
                localStorage.setItem("type", res.data.type)
                document.getElementById('l-s-check').innerHTML = "Signout"
                if (res.data.type == "seller") {
                    window.location.href = "/admin/control"
                }
                else {
                    window.location.href = "/user/shop"
                }
            }
        }
        catch (e) {
            console.log(e)
        }
    }
    return (
        <div className="main">
            <div className="Signup">
                <h1>Sign Up</h1>
                <form action="post" className="for">

                    <label className="in" > Email :- </label>
                    <input className="in" type="email" onChange={(e) => { setEmail(e.target.value) }} placeholder="xxx@gmail.com" required />
                    {checkEmail ? <p id="email">Check Email</p> : <></>}

                    <label className="in" > Pass :- </label>
                    <input className="in" type="password" onChange={(e) => { setPassword(e.target.value) }} placeholder="Password" required />
                    <input className="in in-1" type="password" onChange={(e) => { setConpassword(e.target.value) }} placeholder="Conform pass" required />
                    {CheckPassword ? <p id="password">Check Password</p> : <></>}

                    <label className="in" > Number :- </label>
                    <input className="in" type="tel" onChange={(e) => { setTel(e.target.value) }} placeholder="Mobile :- xxxxx-xxxxx" required />
                    {CheckTel ? <p id="tel">Check Mobile number</p> : <></>}

                    <div>
                        User<input type="radio" name="check" value="user" onChange={(e) => { setType(e.target.value) }} />
                        Seller<input type="radio" name="check" value="seller" onChange={(e) => { setType(e.target.value) }} />
                    </div>
                    <input class="ins button-17" role="button" type="submit" onClick={submit} />

                </form>
                <Link to="/Login" className="ina"> Already have account? Login Here</Link>
            </div>
        </div>
    )
}

export default SignUp