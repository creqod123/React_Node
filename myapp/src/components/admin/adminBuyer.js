import './admin.css'
import { useState } from 'react'
import Spinner from 'react-bootstrap/Spinner';

var Data = []
var order = []
var email = localStorage.getItem("email")
var token = localStorage.getItem("token")

export default function Adminbuyer() {

    const [showTag, setShowTag] = useState(false);
    const [address, setAddress] = useState(false);
    const [clicked, setClicked] = useState(false);

    const SubFunction = () => {
        return new Promise(async (resolve) => {
            const url = process.env.REACT_APP_ADMIN_URL + "/detail"
            try {
                const response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        token: token,
                    },
                    body: JSON.stringify({ email: email }),
                })
                const data = await response.json();
                Data = data.data
            }
            catch (e) {
                console.log(e)
            }
            resolve();
        }, []);
    }

    SubFunction();
    const timeout = setTimeout(() => {
        setShowTag(true)
    }, 1000);

    const BorderExample = () => {

        return <Spinner animation="border" className='helloworld' variant="primary" />;
    }

    const checkAddress = (e) => {

        const email = e.target.value
        const SubFunction = () => {
            return new Promise(async (resolve) => {
                const url = process.env.REACT_APP_ADMIN_URL + "/order"
                try {
                    const response = await fetch(url, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            token: token,
                        },
                        body: JSON.stringify({ email: email }),
                    })
                    const data = await response.json();
                    order = data.data
                }
                catch (e) {
                    console.log(e)
                }
                resolve();
                setClicked(true)
            }, []);
        }
        SubFunction();
        const timeout = setTimeout(() => {
            setAddress(true)
        }, 1000);
    }

    const handleInputUpdate = () => {
        setClicked(false);
    }

    const conform = (e) => {

        const id = e.target.value

        const SubFunction = () => {
            return new Promise(async (resolve) => {
                const url = process.env.REACT_APP_ADMIN_URL + "/status"
                try {
                    await fetch(url, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            token: token,
                        },
                        body: JSON.stringify({ id: id, status: 'conform' }),
                    })
                }
                catch (e) {
                    console.log(e)
                }
                resolve();
            }, []);
        }
        SubFunction();
    }
    const del = (e) => {

        const id = e.target.value

        const SubFunction = () => {
            return new Promise(async (resolve) => {
                const url = process.env.REACT_APP_ADMIN_URL + "/status"
                try {
                    await fetch(url, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            token: token,
                        },
                        body: JSON.stringify({ id: id, status: 'delete' }),
                    })
                }
                catch (e) {
                    console.log(e)
                }
                resolve();
            }, []);
        }
        SubFunction();
    }


    return (
        <div className='adminshow' >
            <table id={clicked ? 'hide' : 'show'}>
                <tr>
                    <th>No.</th>
                    <th>Email</th>
                    <th>productName</th>
                    <th>ProductPrice</th>
                    <th>Quantity</th>
                    <th>status</th>
                    <th>Conform</th>
                    <th>Delete</th>
                    <th>Address</th>
                </tr>
                {showTag ? Data.map((product, counter = 0) => {
                    counter += 1
                    const { _id, quantity, productId, userId, price, status } = product
                    const { ids, productName } = productId
                    const { email } = userId
                    return (
                        <tr>
                            <td>{counter}</td>
                            <td>{email.slice(0, -10)}</td>
                            <td>{productName}</td>
                            <td>{price}</td>
                            <td>{quantity}</td>     
                            <td>{status}</td>
                            <td>{status === 'Conform' ? '-' : <button value={product._id} onClick={conform} >Conform</button>}</td>
                            <td><button value={product._id} onClick={del}>Delete</button></td>
                            <td><button value={product.addressId._id} onClick={checkAddress}>address</button></td>
                        </tr>
                    )
                }) : <BorderExample />}
            </table>


            {address ?
                <div id={clicked ? 'show' : 'hide'}>
                    <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/Circled_times.svg/1200px-Circled_times.svg.png' id='close' onClick={e => handleInputUpdate(0)} />
                    <table>
                        <tr>
                            <th>Full Name</th>
                            <th>House NO and Name</th>
                            <th>Area</th>
                            <th>City</th>
                            <th>Pincode</th>
                        </tr>
                        {address ? order.map((product) => {
                            const { fullName, house, area, city, pincode } = product
                            return (
                                <tr>
                                    <td>{fullName}</td>
                                    <td>{house}</td>
                                    <td>{area}</td>
                                    <td>{city}</td>
                                    <td>{pincode}</td>
                                </tr>
                            )
                        }) : <></>}
                    </table>
                </div>
                : <></>}
        </div>
    )
}
