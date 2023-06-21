import './user.css'
import axios from 'axios'
import { useSelector, useDispatch } from "react-redux"

var totalcost = 0
var total = 0
var email = localStorage.getItem('email')
var token = localStorage.getItem("token")

function Cart(props) {

    let prop = useSelector((a) => a.cardItems)
    const hello1 = async () => {

        const id = localStorage.getItem("id")
        const url = process.env.REACT_APP_USER_URL + "/checkout"
        let formdata = new FormData()
        
        let swap
        let counter = []
        for (let i = 0; i < prop.length; i++) {
            prop[i].cardData.quantity = 1
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
                    <img src={image} alt="" />
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
                    <p className="cart_price">Total Price :- {total = quantity * price}</p>
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
            {prop.map((product) => hello(props, product.cardData))}
            <div className="totalcost">
                <p className='cartc'>Total Cost :- {totalcost}</p>
                <button className="cartc" onClick={hello1}>CheckOut</button>
            </div>
            <div className="cartprop">{counter.map((e) => prop.push(e))} {totalcost = 0} {total = 0}</div>
        </div>
    )
}




export default Cart