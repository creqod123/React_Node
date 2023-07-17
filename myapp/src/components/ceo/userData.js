import axios from 'axios'
import './ceo.css'
import { useState, useEffect } from 'react'
import Spinner from 'react-bootstrap/Spinner';

const token = localStorage.getItem("token")
let userdatas = []
let data = []
let searchData = []

export default function UserData() {

    const [isClicked, setIsClicked] = useState(false);
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
            userdatas = a.data.user
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
        setIsClicked(true);
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
        setIsClicked(false);
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
                searchData = data.data
                if (searchData == null) {
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
            <div className='SearchCeo'>
                <button disabled>{"<"}</button>
                <button disabled>{">"}</button>
                <input type="search" id="search" placeholder="Search product" onChange={(e) => setSearchValue(e.target.value)} value={searchValue} />
                <input type="submit" onClick={searchFun} />
            </div>
            <div id='userdetailshow1' className={isClicked ? 'show' : 'hide'}>
                <div id='userdetailclose'>
                    <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/Circled_times.svg/1200px-Circled_times.svg.png' alt='img' onClick={handleClick} />
                </div>
                <div id='userdetailshow2'>
                    <table id='getss'>
                        <tr>
                            <td>product Name</td>
                            <td>price</td>
                            <td>qantity</td>
                        </tr>
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
                    </table>
                </div>
            </div>
            <table className={isClicked ? 'hide' : 'show'}>
                <tr>
                    <th>No.</th>
                    <th>Username</th>
                    <th>Mobile No.</th>
                    <th>Full Detail</th>
                    <th>Block</th>
                </tr>
                {showSearchValue ?
                    showSearchValue ?
                        searchData.map((user, counter = 0) => {
                            counter += 1
                            const { userId } = user
                            const { email, tel, _id } = userId
                            if (counter === 1) {
                                return (
                                    <tr>
                                        <td>{counter}</td>
                                        <td>{email.slice(0, -10)}</td>
                                        <td>{tel}</td>
                                        <td className="userdetail"><button value={_id} onClick={e => checkUserData(e)}>Detail</button></td>
                                        <td className="userdetail"><button value={_id} onClick={e => removeUser(e)}>Delete</button></td>

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
                                    <td className="userdetail"><button value={_id} onClick={e => checkUserData(e)}>Detail</button></td>
                                    <td className="userdetail"><button value={_id} onClick={e => removeUser(e)}>Delete</button></td>
                                </tr>
                            )
                        }) : <BorderExample />
                }
            </table>
        </div>
    )
}   