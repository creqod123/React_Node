import axios from 'axios'
import './ceo.css'
import { useState, useEffect } from 'react'
import Spinner from 'react-bootstrap/Spinner';

let data = []
let adminData = []
const token = localStorage.getItem("token")
let searchData = []

export default function AdminData(props) {

    const [isClicked, setIsClicked] = useState(false);
    const [showTag, setShowTag] = useState(false);
    const [searchValue, setSearchValue] = useState('')
    const [showSearchValue, setshowSearchValue] = useState(false)

    props = props.props
    useEffect(() => {
        if (props.socket) {
            props.socket.on('ceoUserData', res => {
                adminData = res.data[1]
                setShowTag(true);
            })
        }
    }, []);

    const SubFunction = async () => {
        try {
            const a = await axios.get(process.env.REACT_APP_CEO_URL,
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
    }

    SubFunction();

    const checkAdminData = async (e) => {
        const id = e.target.value;
        try {
            const a = await axios.post(`${process.env.REACT_APP_CEO_URL}/admin/detail`, { id: id },
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

    const adminProdctRemove = async (e) => {
        const id = e.target.value;
        try {
            axios.post(`${process.env.REACT_APP_CEO_URL}/admin/productremove`, { id: id },
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

        setShowTag(false)
    }

    const handleClick = () => {
        setIsClicked(false);
    };

    const BorderExample = () => {
        return <Spinner animation="border" className='helloworld' variant="primary" />;
    }

    const searchFun = () => {
        const SubFunction = async () => {
            searchData = []
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
                if (data.data == null) {
                    setshowSearchValue(false)
                    setShowTag(true)
                }
                else {
                    searchData.push(data.data)
                    setShowTag(false)
                    const timeout2 = setTimeout(() => {
                        setshowSearchValue(true)
                    }, 4000);
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
                            <th>No. </th>
                            <th>product Name</th>
                            <th>price</th>
                            <th>Delete</th>
                        </tr>
                        {
                            showTag ?
                                data.map((admin, counter = 0) => {
                                    counter += 1
                                    const { _id, productName, price } = admin
                                    return (
                                        <tr>
                                            <td>{counter}</td>
                                            <td>{productName}</td>
                                            <td>{price}</td>
                                            <td><button value={_id} onClick={adminProdctRemove} >Delete</button></td>
                                        </tr>
                                    )
                                }) : <BorderExample />
                        }
                    </table>
                </div>
            </div>
            <table className={isClicked ? 'hide' : 'show'}>
                <tr>
                    <th>No.</th>
                    <th>Username</th>
                    <th style={showSearchValue ? { display: "none" } : { display: "block" }}>Mobile No.</th>
                    <th>Product</th>
                    <th>Delete</th>
                </tr>
                {
                    showSearchValue
                        ? showSearchValue ?
                            searchData.map((admin, counter = 0) => {
                                counter += 1
                                const { email, tel, _id } = admin
                                return (
                                    <tr>
                                        <td>{counter}</td>
                                        <td>{email.slice(0, -10)}</td>
                                        <td className="userdetail"><button value={_id} onClick={checkAdminData}>Product</button></td>
                                        <td className="userdetail"><button value={_id} onClick={adminProdctRemove}>Delete</button></td>
                                    </tr>
                                )
                            }) : <BorderExample />
                        : showTag ?
                            adminData.map((admin, counter = 0) => {
                                counter += 1
                                const { email, tel, _id } = admin
                                return (
                                    <tr>
                                        <td>{counter}</td>
                                        <td>{email.slice(0, -10)}</td>
                                        <td>{tel}</td>
                                        <td className="userdetail"><button value={_id} onClick={checkAdminData}>Product</button></td>
                                        <td className="userdetail"><button value={_id} onClick={adminProdctRemove}>Delete</button></td>
                                    </tr>
                                )
                            }) : <BorderExample />
                }
            </table>
        </div>
    )
}