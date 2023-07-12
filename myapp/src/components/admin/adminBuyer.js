import './admin.css'
import { useState, useEffect } from 'react'
import Spinner from 'react-bootstrap/Spinner';

let Data = []
let searchData = []
let check
let order = []
let email = localStorage.getItem("email")
let token = localStorage.getItem("token")

export default function Adminbuyer(props) {

    const [showTag, setShowTag] = useState(false);
    const [address, setAddress] = useState(false);
    const [clicked, setClicked] = useState(false);
    const [detail, setDetail] = useState(false)
    const [searchValue, setSearchValue] = useState('')
    const [showSearchValue, setshowSearchValue] = useState('')

    const SubFunction = async (check) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_ADMIN_URL}/detail`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    token: token,
                },
                body: JSON.stringify({ email: check }),
            })

            const data = await response.json();

            if (data.message !== "fail") {
                Data = data.data
                searchData = Data
            }
            else {
                setshowSearchValue(false)
                setShowTag(true)
                const timeout = setTimeout(() => {
                    setShowTag(true)
                }, 2000);
            }
        }
        catch (e) {
            console.log(e)
        }
    }

    SubFunction(email);
    const timeout = setTimeout(() => {
        setShowTag(true)
    }, 3000);

    useEffect(() => {
        if (props.props.socket) {
            props.props.socket.on('productCheckout', res => {
                setShowTag(false)
                setTimeout(() => {
                    setShowTag(true)
                }, 1000)
            })
        }
    }, [])

    const BorderExample = () => {
        return <Spinner animation="border" className='helloworld' variant="primary" />;
    }

    const checkAddress = (e) => {
        const email = e.target.value
        const SubFunction = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_ADMIN_URL}/order`, {
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
            setClicked(true)
        }
        SubFunction();

        const timeout = setTimeout(() => {
            setAddress(true)
        }, 500);

    }


    const handleInputUpdate = () => {
        setShowTag(true)
        setAddress(false)
        setClicked(false)
        setDetail(false)
    }

    const conform = (e) => {
        const id = e.target.value
        const SubFunction = async () => {
            try {
                await fetch(`${process.env.REACT_APP_ADMIN_URL}/status`, {
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
        }
        SubFunction();
        setShowTag(false)
    }

    const Detail = (e) => {
        check = e.target.value
        setDetail(true)
        setClicked(true)
    }

    const del = (e) => {
        const id = e.target.value
        const SubFunction = async () => {
            try {
                await fetch(`${process.env.REACT_APP_ADMIN_URL}/status`, {
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
        }
        SubFunction();
    }

    const searchFun = () => {
        setShowTag(false)
        setshowSearchValue(true)
        SubFunction(`${searchValue}@gmail.com`);
    }

    return (
        <div className='adminshow' >
            <div className='SearchBuyer'>
                <button disabled>{"<"}</button>
                <button disabled>{">"}</button>
                <input type="search" id="search" placeholder="Search product" onChange={(e) => setSearchValue(e.target.value)} value={searchValue} />
                <input type="submit" onClick={searchFun} />
            </div>
            {clicked ? <></> : <table>
                <tr>
                    <th>No.</th>
                    <th>Username</th>
                    <th>status</th>
                    <th>Conform</th>
                    <th>Delete</th>
                    <th>Address</th>
                    <th>Detail</th>
                </tr>
                {showSearchValue
                    ? showSearchValue ? searchData.map((product, counter = 0) => {
                        const { _id, quantity, productId, userId, price, status } = product
                        const { productName } = productId
                        const { email } = userId
                        return (
                            <tr>
                                <td>{counter + 1}</td>
                                <td>{email.slice(0, -10)}</td>
                                <td>{status}</td>
                                <td>{status === 'Conform' ? '-' : <button value={product._id} onClick={conform} >Conform</button>}</td>
                                <td><button value={product._id} onClick={del}>Delete</button></td>
                                <td><button value={product.addressId._id} onClick={checkAddress}>address</button></td>
                                <td><button value={counter++} onClick={Detail}>Detail</button></td>
                            </tr>
                        )
                    }) : <BorderExample />

                    : showTag ? Data.map((product, counter = 0) => {
                        const { _id, quantity, productId, userId, price, status } = product
                        const { productName } = productId
                        const { email } = userId
                        return (
                            <tr>
                                <td>{counter + 1}</td>
                                <td>{email.slice(0, -10)}</td>
                                <td>{status}</td>
                                <td>{status === 'Conform' ? '-' : <button value={product._id} onClick={conform} >Conform</button>}</td>
                                <td><button value={product._id} onClick={del}>Delete</button></td>
                                <td><button value={product.addressId._id} onClick={checkAddress}>address</button></td>
                                <td><button value={counter++} onClick={Detail}>Detail</button></td>
                            </tr>
                        )
                    }) : <BorderExample />
                }
            </table>}

            {/* =========================================================================================================================== */}

            {detail ? <table>
                <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/Circled_times.svg/1200px-Circled_times.svg.png' id='close' onClick={e => handleInputUpdate(0)} />
                <tr>
                    <th>productName</th>
                    <th>ProductPrice</th>
                    <th>Quantity</th>
                    <th>Status</th>
                </tr>
                {
                    showTag ? Data.map((product, count = 0) => {
                        if (count == check) {
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
                        }
                        ++count
                    }) : <BorderExample />}
            </table> : <></>}

            {/* ========================================================================================================== */}


            {address ?
                <div>
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
