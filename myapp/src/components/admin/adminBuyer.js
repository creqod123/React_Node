import './admin.css'
import { useState, useEffect } from 'react'
import Spinner from 'react-bootstrap/Spinner';
import { MDBInputGroup, MDBInput, MDBIcon, MDBBtn } from 'mdb-react-ui-kit';
import { MDBBadge, MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';

let Data = []
let searchData = []
let check
let order = []
let email = localStorage.getItem("email")
let _id = localStorage.getItem("_id")
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

            <div className="pagination">
                <div id="searchPaginat">
                    <div id="paginate">
                        <button disabled>{"<"}</button>
                        <button disabled>{">"}</button>
                    </div>
                    <div id="searchTag">
                        <MDBInputGroup>
                            <MDBInput label='Search' onChange={(e) => setSearchValue(e.target.value)} value={searchValue} />
                            <MDBBtn rippleColor='dark' role='button' onClick={searchFun}>
                                <MDBIcon type='submit' icon='search' onClick={searchFun} />
                            </MDBBtn>
                        </MDBInputGroup>
                    </div>
                </div>
            </div>
            <div className='SearchBuyer'>
                {clicked ? <></> :
                    <MDBTable align='middle'>
                        <MDBTableHead>
                            <tr>
                                <th scope='col'>No.</th>
                                <th scope='col'>Username</th>
                                <th scope='col'>Product Name</th>
                                <th scope='col'>Stock</th>
                                <th scope='col'>Price</th>
                                <th scope='col'>Quantity</th>
                                <th scope='col'>Status</th>
                                <th scope='col'>Delete</th>
                                <th scope='col'>Address</th>
                            </tr>
                        </MDBTableHead>
                        <MDBTableBody>
                            {showSearchValue
                                ? showSearchValue ? searchData.map((product, counter = 0) => {
                                    const { _id, quantity, productId, userId, price, status } = product
                                    const { productName, stock } = productId
                                    const { email } = userId
                                    return (
                                        <tr>
                                            <td>{counter + 1}</td>
                                            <td>{email.slice(0, -10)}</td>
                                            <td>{productName}</td>
                                            <td>{stock}</td>
                                            <td>{price}</td>
                                            <td>{quantity}</td>
                                            <td>{
                                                status === 'Conform' ?
                                                    <MDBBadge color='success' rounded size='sm' value={product._id} pill>
                                                        conform
                                                    </MDBBadge>
                                                    :
                                                    <MDBBtn color='warning' rounded size='sm' role='button' value={product._id} onClick={conform} pill>
                                                        conform
                                                    </MDBBtn>
                                            }
                                            </td>
                                            <td>
                                                {
                                                    status === 'Conform' ?
                                                        <MDBBtn color='danger' rounded size='sm' disabled>
                                                            Delete
                                                        </MDBBtn>
                                                        :
                                                        <MDBBtn color='danger' rounded size='sm' value={product._id} onClick={del}>
                                                            Delete
                                                        </MDBBtn>
                                                }
                                            </td>
                                            <td>
                                                <MDBBtn color='dark' rounded size='sm' value={product.addressId._id} onClick={checkAddress}>
                                                    Check Address
                                                </MDBBtn>
                                            </td>
                                        </tr>
                                    )
                                }) : <BorderExample />

                                : showTag ? Data.map((product, counter = 0) => {
                                    const { _id, quantity, productId, userId, price, status } = product
                                    const { productName, stock } = productId
                                    const { email } = userId
                                    return (
                                        <tr>
                                            <td>{counter + 1}</td>
                                            <td>{email.slice(0, -10)}</td>
                                            <td>{productName}</td>
                                            <td>{stock}</td>
                                            <td>{price}</td>
                                            <td>{quantity}</td>
                                            <td>
                                                {
                                                    status === 'Conform' ?
                                                        <MDBBadge color='success' rounded size='sm' value={product._id} pill>
                                                            conform
                                                        </MDBBadge>
                                                        :
                                                        <MDBBtn color='warning' rounded size='sm' role='button' value={product._id} onClick={conform} pill>
                                                            Conform
                                                        </MDBBtn>
                                                }
                                            </td>
                                            <td>
                                                {
                                                    status === 'Conform' ?
                                                        <MDBBtn color='danger' rounded size='sm' disabled>
                                                            Delete
                                                        </MDBBtn>
                                                        :
                                                        <MDBBtn color='danger' rounded size='sm' value={product._id} onClick={del}>
                                                            Delete
                                                        </MDBBtn>
                                                }
                                            </td>
                                            <td>
                                                <MDBBtn color='dark' rounded size='sm' value={product.addressId._id} onClick={checkAddress}>
                                                    Check Address
                                                </MDBBtn>
                                            </td>
                                        </tr>
                                    )
                                }) : <BorderExample />
                            }
                        </MDBTableBody>
                    </MDBTable>}
            </div>

            {/* =========================================================================================================================== */}
            <div className='SearchBuyer'>
                {detail ?
                    <MDBTable align='middle'>
                        <MDBTableHead>
                            <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/Circled_times.svg/1200px-Circled_times.svg.png' id='close' onClick={e => handleInputUpdate(0)} />
                            <tr>
                                <th scope='col'>ProductName</th>
                                <th scope='col'>Stock</th>
                                <th scope='col'>ProductPrice</th>
                                <th scope='col'>Quantity</th>
                            </tr>
                        </MDBTableHead>
                        <MDBTableBody>
                            {
                                showTag ? Data.map((product, counter = 0) => {
                                    const { quantity, productId, price, status } = product
                                    const { productName, stock } = productId
                                    if (counter === 0) {
                                        return (
                                            <tr>
                                                <td>{productName}</td>
                                                <td>{stock}</td>
                                                <td>{price}</td>
                                                <td>{quantity}</td>
                                            </tr>
                                        )
                                    }
                                }) : <BorderExample />}
                        </MDBTableBody>
                    </MDBTable> : <></>}
            </div>
            {/* ========================================================================================================== */}

            <div className='SearchBuyer'>
                {address ?
                    <div>
                        <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/Circled_times.svg/1200px-Circled_times.svg.png' id='close' onClick={e => handleInputUpdate(0)} />
                        <MDBTable align='middle'>
                            <MDBTableHead>
                                <tr>
                                    <th scope='col'>Full Name</th>
                                    <th scope='col'>House NO and Name</th>
                                    <th scope='col'>Area</th>
                                    <th scope='col'>City</th>
                                    <th scope='col'>Pincode</th>
                                </tr>
                            </MDBTableHead>
                            <MDBTableBody>

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
                            </MDBTableBody>
                        </MDBTable>
                    </div>
                    : <></>}
            </div>
        </div >
    )
}
