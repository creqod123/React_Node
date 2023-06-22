import { useNavigate } from 'react-router-dom'
import './navbar.css'
import { useSelector, useDispatch } from "react-redux"

export default function Navbar(props) {

    const history = useNavigate('')
    var type = localStorage.getItem("type")

    const cartLength = useSelector((a) => a.cardItems)
    const submit1 = (e) => {
        e.preventDefault()
        history('/user/shop')
    }
    
    const submit2 = (e) => {
        history('/user/cart')
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
                    </li>
                </ul>
            </div>
        )
    }
}


function signout() {
    localStorage.removeItem("type")
    localStorage.removeItem("email")
    localStorage.removeItem("token")
}