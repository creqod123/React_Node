import axios from 'axios'
import './ceo.css'
import { useState, useEffect } from 'react'
import Spinner from 'react-bootstrap/Spinner';
import { MDBBtn, MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import { MDBInputGroup, MDBInput, MDBIcon } from 'mdb-react-ui-kit';

const token = localStorage.getItem("token")
let userdatas = []
let data = []
let searchData = []

export default function UserData() {

    const [isClicked, setIsClicked] = useState(true);
    const [showTag, setShowTag] = useState(false);
    const [searchValue, setSearchValue] = useState('')
    const [showSearchValue, setshowSearchValue] = useState(false)

    const SubFunction = async () => {
        try {
            const a = await axios.get(process.env.REACT_APP_CEO_URL,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        token: token,
                    },
                })
            userdatas = a.data.data.user
        }
        catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        SubFunction();
        const timeout = setTimeout(() => {
            setShowTag(true)
        }, 3000);
    }, [])


    // ========================================= Check User Data =========================================

    const checkUserData = async (e) => {

        const id = e.target.value;
        try {
            const a = await axios.post(`${process.env.REACT_APP_CEO_URL}/user/detail`, { id: id },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        token: token,
                    },
                })
            data = a.data.data
        }
        catch (e) {
            console.log(e)
        }
        setIsClicked(false);
    }

    // ========================================= Remove user =========================================

    const removeUser = async (e) => {
        const id = e.target.value;
        try {
            await axios.post(`${process.env.REACT_APP_CEO_URL}/user/delete`, { id: id },
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
        window.location.href = "/ceo/user"
    }

    // ========================================= User Product Remove =========================================

    const userProductRemove = async (e) => {
        const id = e.target.value
        try {
            await axios.post(`${process.env.REACT_APP_CEO_URL}/user/delete`, { id: id },
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
        window.location.href = "/"
    }

    const handleClick = () => {
        setIsClicked(true);
    };

    const BorderExample = () => {
        return <Spinner animation="border" className='helloworld' variant="primary" />;
    }


    // ========================================= Search user =========================================


    const searchFun = () => {
        const SubFunction = async () => {
            try {
                const checkEmail = `${searchValue}@gmail.com`
                const a = await fetch(`${process.env.REACT_APP_CEO_URL}/search`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        token: token,
                    },
                    body: JSON.stringify({ email: checkEmail }),
                })
                const data = await a.json()
                searchData = []
                searchData.push(data.data)

                if (searchData[0] === null) {
                    setshowSearchValue(false)
                    setShowTag(true)
                }
                else {
                    setShowTag(false)
                    const timeout = setTimeout(() => {
                        setshowSearchValue(true)
                    }, 3000);
                }
            }
            catch (e) {
                console.log(e)
            }
        }
        SubFunction();
    }


    return (
        <div className='adminshow' >
            <MDBInputGroup id='ceoSearch'>
                <MDBInput label='Search' onChange={(e) => setSearchValue(e.target.value)} value={searchValue} />
                <MDBBtn rippleColor='dark' onClick={searchFun}>
                    <MDBIcon type='submit' icon='search' onClick={searchFun} />
                </MDBBtn>
            </MDBInputGroup>

            {
                isClicked ? <></> :
                    <MDBTable align='middle'>
                        <MDBTableHead>
                            <tr>
                                <td scope='col'>product Name</td>
                                <td scope='col'>price</td>
                                <td scope='col'>qantity</td>
                                <td scope='col'>Remove</td>
                            </tr>
                        </MDBTableHead>
                        <MDBTableBody>
                            {
                                0 !== data.length ?
                                    data.map((user) => {
                                        const { quantity, productId, price } = user
                                        const { productName, _id } = productId
                                        return (
                                            <tr>
                                                <td>{productName}</td>
                                                <td>{price}</td>
                                                <td>{quantity}</td>
                                                <td><button value={_id} onClick={e => userProductRemove(e)}>Remove</button></td>
                                            </tr>

                                        )
                                    }) : <h1>Product not order </h1>
                            }
                        </MDBTableBody>
                        <MDBTableBody>
                            <MDBBtn style={{ position: "absolute", left: "50%" }} onClick={handleClick}>Close</MDBBtn>
                        </MDBTableBody>
                    </MDBTable>
            }
            {
                isClicked
                    ? <MDBTable align='middle'>
                        <MDBTableHead>
                            <tr>
                                <th scope='col'>No.</th>
                                <th scope='col'>Username</th>
                                <th scope='col'>Mobile No.</th>
                                <th scope='col'>Full Detail</th>
                                <th scope='col'>Block</th>
                            </tr>
                        </MDBTableHead>
                        <MDBTableBody>
                            {
                                showSearchValue ?
                                    showSearchValue ?
                                        searchData.map((user, counter = 0) => {
                                            console.log("check user :- ", user)
                                            counter += 1
                                            const { email, tel, _id } = user
                                            if (counter === 1) {
                                                return (
                                                    <tr>
                                                        <td>{counter}</td>
                                                        <td>{email.slice(0, -10)}</td>
                                                        <td>{tel}</td>
                                                        <td className="userdetail">
                                                            <MDBBtn color='link' rounded size='sm' value={_id} onClick={e => checkUserData(e)}>Detail</MDBBtn>
                                                        </td>
                                                        <td className="userdetail">
                                                            <MDBBtn color='link' rounded size='sm' value={_id} onClick={e => removeUser(e)}>Delete</MDBBtn>
                                                        </td>

                                                    </tr>
                                                )
                                            }
                                        }) : <BorderExample />
                                    : showTag ?
                                        userdatas.map((user, counter = 0) => {
                                            counter += 1
                                            const { email, tel, _id } = user
                                            return (
                                                <tr>
                                                    <td>{counter}</td>
                                                    <td>{email.slice(0, -10)}</td>
                                                    <td>{tel}</td>
                                                    <td className="userdetail">
                                                        <MDBBtn color='link' rounded size='sm' value={_id} onClick={e => checkUserData(e)}>Detail</MDBBtn>
                                                    </td>
                                                    <td className="userdetail">
                                                        <MDBBtn color='link' rounded size='sm' value={_id} onClick={e => removeUser(e)}>Delete</MDBBtn>
                                                    </td>
                                                </tr>
                                            )
                                        }) : <BorderExample />
                            }
                        </MDBTableBody>
                    </MDBTable>
                    :
                    <></>
            }
        </div>
    )
}   