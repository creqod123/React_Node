import axios from 'axios'
import './user.css'
import { useState, useEffect } from "react"
import { useSelector } from "react-redux"
var totalcost = 0
var total = 0
var email = localStorage.getItem('email')
var token = localStorage.getItem("token")

function Cart(props) {
    const [showTag, setShowTag] = useState(false);

    const [fullName, setfullName] = useState('');
    const [house, setHouse] = useState('');
    const [area, setArea] = useState('');
    const [city, setCity] = useState('');
    const [pincode, setPincode] = useState('');

    let prop = useSelector((a) => a.cardItems)


    const check1 = async () => {
        setShowTag(true)
    }

    const check2 = async () => {
        setShowTag(false)
    }

    const conformOrder = async () => {
        const id = localStorage.getItem("id")
        const url = process.env.REACT_APP_USER_URL + "/checkout"
        let formdata = new FormData()

        let swap
        let counter = []
        for (let i = 0; i < prop.length; i++) {
            prop[i].cardData.quantity = 1
            prop[i].cardData.fullName = fullName
            prop[i].cardData.house = house
            prop[i].cardData.area = area
            prop[i].cardData.city = city
            prop[i].cardData.pincode = pincode
            for (var j = i + 1; j < prop.length; j++) {
                if (prop[i].cardData.ids === prop[j].cardData.ids) {
                    counter.push(prop[i])
                    prop[i].cardData.quantity = prop[i].cardData.quantity + 1
                    prop.splice(j, 1)
                    j--
                }
            }
        }
        for (let k = 0; k < prop.length; k++) {
            for (let l = k; l < prop.length; l++) {
                if (prop[k].cardData.ids >= prop[l].cardData.ids) {
                    swap = prop[l]
                    prop[l] = prop[k]
                    prop[k] = swap
                }
            }
        }

        formdata = [prop, email]
        try {
            await axios.post(url, formdata,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        token: token,
                    },
                })
        }
        catch (e) {
            console.log(e)
        }
        counter.map((e) => prop.push(e))
        totalcost = 0
        total = 0
        window.location.href = '/user/shop'
    }

    let swap
    let counter = []
    for (let i = 0; i < prop.length; i++) {
        prop[i].cardData.quantity = 1
        for (let j = i + 1; j < prop.length; j++) {
            if (prop[i].cardData.ids === prop[j].cardData.ids) {
                counter.push(prop[i])
                prop[i].cardData.quantity = prop[i].cardData.quantity + 1
                prop.splice(j, 1)
                j--
            }
        }
    }

    for (let k = 0; k < prop.length; k++) {
        for (let l = k; l < prop.length; l++) {
            if (prop[k].cardData.ids >= prop[l].cardData.ids) {
                swap = prop[l]
                prop[l] = prop[k]
                prop[k] = swap
            }
        }
    }

    const hello = (props, product) => {
        const { image, productName, price, quantity } = product
        return (
            <div className="i i_2">
                <div className="img-wrapper item">
                    <img src={process.env.REACT_APP_GET_IMAGE + image} alt="" />
                </div>
                <div className="text-wrapper item">
                    <span>{productName}</span>
                    <br />
                    <span>Price ${price}</span>
                </div>
                <div className="button-wrapper item">
                    <button onClick={() => props.addtoCartHandler(product)}> + </button>
                </div>
                <div className="cart_quan">
                    <p className="cart_quantity">{quantity}</p>
                    <p className="cart_price">Total Price  {total = quantity * price}</p>
                </div>
                <div className="button-wrapper item">
                    <button onClick={() => props.RemovetoCartHandler(product)}> - </button>
                </div>
                <div className="cartprop">{totalcost += quantity * price}</div>
            </div>
        )
    }


    return (
        <div className="items position">
            {showTag ?
                <div id='orderconfrom'>
                    <label id='updateclose'>
                        <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/Circled_times.svg/1200px-Circled_times.svg.png' onClick={check2} />
                    </label>
                    <label>
                        Full Name <input type="text" placeholder="Full name" name="productName" onChange={(e) => setfullName(e.target.value)} />
                    </label>
                    <label>
                        House <input type="text" placeholder="Building No and Name" name="productName" onChange={(e) => setHouse(e.target.value)} />
                    </label>
                    <label>
                        Area <input type="text" placeholder="Area" name="price" onChange={(e) => setArea(e.target.value)} />
                    </label>
                    <label>
                        City <input type="text" placeholder="City" name="price" onChange={(e) => setCity(e.target.value)} />
                    </label>
                    <label>
                        Pincode <input type="tel" max={6} min={6} placeholder="Pincode" name="price" onChange={(e) => setPincode(e.target.value)} />
                    </label>
                    <label id='submit'>
                        <input type='submit' onClick={conformOrder} />
                    </label>
                </div> :
                <div id='orderconfrom1'>{prop.map((product) => hello(props, product.cardData))}
                    <div className="totalcost">
                        <p className='cartc'>Total Cost :- {totalcost}</p>
                        <button className="cartc" onClick={check1}>CheckOut</button>
                    </div>
                    <div className="cartprop">{counter.map((e) => prop.push(e))} {totalcost = 0} {total = 0}</div></div>}
        </div>
    )
}




export default Cart