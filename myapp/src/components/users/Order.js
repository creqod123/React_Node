import { useEffect, useState } from 'react'
import Spinner from 'react-bootstrap/Spinner';
import './user.css'

let Data = []
let order = []
const email = localStorage.getItem("email")
const token = localStorage.getItem("token")
let id

export default function Order() {
    const [showTag, setShowTag] = useState(false);
    const [address, setAddress] = useState(false);
    const [updateAddress, setUpdateAddress] = useState(false);
    const [clicked, setClicked] = useState(false);
    const [fullName, setfullName] = useState('');
    const [house, setHouse] = useState('');
    const [area, setArea] = useState('');
    const [city, setCity] = useState('');
    const [pincode, setPincode] = useState('');
    const [detail, setDetail] = useState(false)

    const SubFunction = () => {
        return new Promise(async (resolve) => {
            const url = process.env.REACT_APP_USER_URL + "/detail"
            try {
                var response = await fetch(url, {
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
                const url = process.env.REACT_APP_USER_URL + "/order"
                try {
                    var response = await fetch(url, {
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

    const handleInputUpdate = (check) => {
        setClicked(false);
        setUpdateAddress(false)
    }

    const addressUpdate = (e) => {
        id = e.target.value
        console.log("Id :- ", id)
        setUpdateAddress(true)
    }

    const Detail = () => {
        console.log("Hello world first",showTag)
        setDetail(true)
    }

    const orderUpdate = () => {

        const SubFunction = () => {
            return new Promise(async (resolve) => {
                const url = process.env.REACT_APP_USER_URL + "/orderupdate"
                try {
                    await fetch(url, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            token: token,
                        },
                        body: JSON.stringify({ id: id, fullName: fullName, house: house, area: area, city: city, pincode: pincode }),
                    })
                }
                catch (e) {
                    console.log(e)
                }
                resolve();
                setUpdateAddress(false)
            }, []);
        }

        if (fullName.length == 0 || house.length == 0 || area.length == 0 || city.length == 0 || pincode.length == 0) {
            console.log("first")
        }
        else {
            console.log("second :- ", (fullName.length == 0 || house.length == 0))
            SubFunction();
        }
    }

    return (
        <div className='adminshow' >
            <table id={clicked ? 'hide' : 'show'}>
                <tr>
                    <th>Email</th>
                    <th>productName</th>
                    <th>ProductPrice</th>
                    <th>Quantity</th>
                    <th>Status</th>
                    <th>Address</th>
                    <th>Detail</th>
                </tr>
                {showTag ? Data.map((product) => {
                    const { _id, quantity, productId, userId, price, status } = product
                    const { email } = userId
                    let counter = -1
                    return (
                        <>
                            {
                                quantity.map(() => {
                                    ++counter
                                    return (
                                        <tr>
                                            <td>{email.slice(0, -10)}</td>
                                            <td>{productId[counter].productName}</td>
                                            <td>{price[counter]}</td>
                                            <td>{quantity[counter]}</td>
                                            <td>{status}</td>
                                            <td><button value={product.addressId._id} onClick={checkAddress}>address</button></td>
                                            <td><button onClick={Detail}>Detail</button></td>
                                        </tr>
                                    )
                                })
                            }
                        </>
                    )
                }) : <BorderExample />}
            </table>

            {/* =========================================================================================================================== */}

            <table id={clicked ? 'shows' : 'hides'}>
                <tr>
                    <th>productName</th>
                    <th>ProductPrice</th>
                    <th>Quantity</th>
                    <th>Status</th>
                </tr>
                {showTag ? Data.map((product) => {
                    const { _id, quantity, productId, userId, price, status } = product
                    const { email } = userId
                    let counter = -1
                    return (
                        <>
                            {
                                quantity.map(() => {
                                    ++counter
                                    return (
                                        <tr>
                                            <td>{productId[counter].productName}</td>
                                            <td>{price[counter]}</td>
                                            <td>{quantity[counter]}</td>
                                            <td>{status}</td>
                                        </tr>
                                    )
                                })
                            }
                        </>
                    )
                }) : <BorderExample />}
            </table>

            {/* ========================================================================================================== */}


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
                            <th>update</th>
                        </tr>
                        {address ? order.map((product) => {
                            const { fullName, house, area, city, pincode, _id } = product
                            return (
                                <tr>
                                    <td>{fullName}</td>
                                    <td>{house}</td>
                                    <td>{area}</td>
                                    <td>{city}</td>
                                    <td>{pincode}</td>
                                    <td>{<button value={_id} onClick={addressUpdate}>Update</button>}</td>
                                </tr>
                            )
                        }) : <></>}
                    </table>

                    {updateAddress ?
                        <div id='updateOrder'>
                            <label id='updateclose'>
                                <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/Circled_times.svg/1200px-Circled_times.svg.png' onClick={handleInputUpdate} />
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
                                <input type='submit' onClick={orderUpdate} />
                            </label>
                        </div>
                        : <></>}
                </div>
                : <></>}
        </div>
    )
}
