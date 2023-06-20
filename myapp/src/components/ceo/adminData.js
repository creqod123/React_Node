import axios from 'axios'
import './ceo.css'
import { useState } from 'react'
import Spinner from 'react-bootstrap/Spinner';

var data = []
var adminData = []
var token = localStorage.getItem("token")

export default function AdminData() {

    const [isClicked, setIsClicked] = useState(false);
    const [showTag, setShowTag] = useState(false);

    const SubFunction = () => {
        return new Promise(async (resolve) => {
            var url = process.env.REACT_APP_CEO_URL
            try {
                const a = await axios.get(url,
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            token: token,
                        },
                    })
                adminData = a.data.seller
            }
            catch (e) {
                console.log(e)
            }
            resolve();
            setShowTag(true);
        });
    }

    SubFunction();
    const checkAdminData = async (e) => {

        const id = e.target.value;
        var url = process.env.REACT_APP_CEO_URL + "/admin/detail"
        try {
            const a = await axios.post(url, { id: id },
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
        var url = process.env.REACT_APP_CEO_URL + "/admin/productremove"
        try {
            axios.post(url, { id: id },
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
                    <th>Mobile No.</th>
                    <th>Product</th>
                    <th>Delete</th>
                </tr>
                {
                    showTag ?
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