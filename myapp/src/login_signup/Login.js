import axios from "axios"
import React, { useState } from "react"
import { Link } from "react-router-dom"
import './l-s.css'

function Login() {

    const type = localStorage.getItem("type")
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [checkEmail, setCheckEmail] = useState(false)
    const [checkPassword, setCheckPassword] = useState(false)

    const submit = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.post(process.env.REACT_APP_LOGIN_URL, {
                email, password
            })
            if (res.data.message === "Enter vaild email") {
                setCheckEmail(true)
                setCheckPassword(false)
            }
            else if (res.data.message === "Password_not_same") {
                setCheckEmail(false)
                setCheckPassword(true)
            }
            else {
                localStorage.setItem("id", res.data.id)
                localStorage.setItem("email", res.data.email)
                localStorage.setItem("token", res.data.token)
                localStorage.setItem("type", res.data.type)
                if (res.data.type == "seller") {
                    window.location.href = "/admin/control"
                }
                else if (res.data.type == "user") {
                    window.location.href = "/user/shop"
                }
                else {
                    window.location.href = "/ceo/user"
                }
            }
        }
        catch (e) {
            console.log(e)
        }
    }
    return (
        <div className="main">
            <div className="Login">
                <h1>Login</h1>
                <form action="post" className="for for-1">
                    <label className="in" > Email :- </label>
                    <input className="in" type="email" onChange={(e) => { setEmail(e.target.value) }} placeholder="E-mail" required />
                    {checkEmail ? <p id="email">Enter Valid Email</p> : <></>}
                    <label className="in" > Pass :- </label>
                    <input className="in" type="password" onChange={(e) => { setPassword(e.target.value) }} placeholder="Password" required />
                    {checkPassword ? <p id="password">Re-enter passsword</p> : <></>}
                    <input class="ins button-17 ins-1" role="button" type="submit" onClick={submit} />
                </form>
                <Link to="/register" className="ina"> Don't have an account? Signup here</Link>
            </div>
        </div>
    )
}

export default Login