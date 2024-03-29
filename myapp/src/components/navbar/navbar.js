import { useNavigate } from 'react-router-dom'
import './navbar.css'
import { useSelector, useDispatch } from "react-redux"
import { useEffect } from 'react'
import { addtoCart, getCartSaved } from "../../Services/Actions/actions"

let i = 0

export default function Navbar() {

    const history = useNavigate('')
    const type = localStorage.getItem("type")
    const cartLength = useSelector((a) => a.cardItems)
    const dispatch = useDispatch()

    const doSomething = async () => {
        try {
            const token = localStorage.getItem("token")
            const response = await fetch(`${process.env.REACT_APP_USER_URL}/cartRequest`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    token: token,
                },
            })

            const getAll = await response.json();
            const getProduct = getAll.data.productCart

            const Data = []
            getProduct.map((product) => {
                const { productId, quantity } = product
                for (let j = 0; j < quantity; j++) {
                    Data.push(productId)
                }
            })
            dispatch(getCartSaved(Data))
        }
        catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        if (type === "user" && i === 0) {
            doSomething();
            i = 10;
        }
    }, [])

    const signout = () => {
        localStorage.removeItem("type")
        localStorage.removeItem("email")
        localStorage.removeItem("token")
        localStorage.removeItem("id")
    }

    const submit1 = (e) => {
        e.preventDefault()
        history('/user/shop')
    }

    const submit2 = (e) => {
        history('/user/cart')
    }
    const submit3 = (e) => {
        e.preventDefault()
        history('/user/order')
    }

    if (type === "user") {
        return (
            <div id="navbar">
                <ul>
                    <li className='cartimg'>
                        <a role='button' onClick={submit1}>Shop</a>
                    </li>
                    <li className='cartimg'>
                        <a role='button' onClick={submit2}>
                            <p id='cartlength'>{cartLength.length}</p>
                            <img src='https://cdn-icons-png.flaticon.com/512/3523/3523865.png' id='cartimg' />
                        </a>
                    </li>
                    <li className='cartimg'>
                        <a role='button' onClick={submit3}>Order</a>
                    </li>
                    <li>
                        <a href='/register' role='button' onClick={signout}>Signout</a>
                    </li>
                </ul>
            </div>
        )
    }
    else if (type === "seller") {
        return (
            <div id="navbar">
                <ul>
                    <li>
                        <a href='/admin/control' role='button'> ADD </a>
                    </li>
                    <li>
                        <a href='/admin/product' role='button'>Product</a>
                    </li>
                    <li>
                        <a href='/admin/detail' role='button' > Buyer </a>
                    </li>
                    <li>
                        <a href='/register' role='button' onClick={signout}>Signout</a>
                    </li>
                </ul>
            </div>
        )
    }
    else if (type === "ceo") {
        return (
            <div id="navbar">
                <ul>
                    <li>
                        <a href='/ceo/user' role='button'> User </a>
                    </li>

                    <li>
                        <a href='/ceo/admin' role='button'>Admin</a>
                    </li>
                    <li>
                        <a href='/register' role='button' onClick={signout}>Signout</a>
                    </li>
                </ul>
            </div>
        )
    }
    else {
        return (
            <div id="navbar">
                <ul>
                    <li>
                        <a href='/register' id='l-s-check'>Register</a>
                        <a href='/check' id='l-s-check'>Check</a>
                    </li>
                </ul>
            </div>
        )
    }
}