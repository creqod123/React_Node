import axios from 'axios'
import './ceo.css'
import { useState } from 'react'
import Spinner from 'react-bootstrap/Spinner';

var userdatas = []
var data = []
var token = localStorage.getItem("token")

export default function UserData() {

    let [isClicked, setIsClicked] = useState(false);
    const [showTag, setShowTag] = useState(false);
    const [detail, setDetail] = useState(false)


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
        setShowTag(true);
    }
    SubFunction();

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
        setShowTag(true);
        setIsClicked(true);
    }

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

    const userProductRemove = async (e) => {
        var id = e.target.value
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

    return (
        <div className='adminshow' >
            <div id='userdetailshow1' className={isClicked ? 'show' : 'hide'}>
                <div id='userdetailclose'>
                    <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/Circled_times.svg/1200px-Circled_times.svg.png' alt='img' onClick={handleClick} />
                </div>
                <div id='userdetailshow2'>
                    <table id='getss'>
                        <tr>
                            <td>No.1</td>
                            <td>product Name</td>
                            <td>price</td>
                            <td>qantity</td>
                            <td>total</td>
                        </tr>
                        {
                            0 !== data.length ?
                                data.map((user, counter = 0) => {
                                    console.log("user product :- ",user)
                                    counter += 1
                                    const { productName, _id } = user.productId
                                    const { quantity, price } = user
                                    return (
                                        <tr>
                                            <td>{counter}</td>
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
                {
                    showTag ?
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