import './admin.css'
import { useState, useEffect } from "react"
import axios from 'axios'
import Spinner from 'react-bootstrap/Spinner';


var email = localStorage.getItem("email");
var token = localStorage.getItem("token");
let Data = []
let id

export default function Adminproduct() {

    const [showTag, setShowTag] = useState(false);
    const [productName, setproductName] = useState('')
    const [price, setPrice] = useState('')
    const [isClicked, setIsClicked] = useState(false);
    const [image, setImage] = useState('')

    const SubFunction = async () => {
        try {
            var a = await axios.post(`${process.env.REACT_APP_ADMIN_URL}`, { email: email }, {
                headers: {
                    'Content-Type': 'application/json',
                    token: token,
                },
            })
            Data = a.data.data
        }
        catch (e) {
            console.log(e)
        }
    }

    SubFunction()
    useEffect(() => {
        const timeout = setTimeout(() => {
            setShowTag(true);
        }, 1000);
    }, []);

    const handleInputRemove = async (e) => {
        const id = e.target.value;
        try {
            await axios.post(`${process.env.REACT_APP_ADMIN_URL}/remove`, { id: id, email: email }, {
                headers: {
                    'Content-Type': 'application/json',
                    token: token,
                },
            })
        }
        catch (e) {
            console.log(e)
        }
        window.location.reload()
    }

    const BorderExample = () => {
        return <Spinner animation="border" />;
    }

    const update = async (e) => {
        if (productName === '' || price === '') {
            return (" ")
        }
        try {
            await axios.post(`${process.env.REACT_APP_ADMIN_URL} /update`, { email: email, productName: productName, price: price }, {
                headers: {
                    'Content-Type': 'application/json',
                    token: token,
                },
            })
        }
        catch (e) {
            console.log(e)
        }
        setIsClicked(false);
        SubFunction()
        window.location.reload()
    }

    const handleInputUpdate = (e, check) => {
        if (check === 0) {
            setIsClicked(false);
        }
        else {
            setIsClicked(true);
        }
    }

    return (
        <div>
            <div id={isClicked ? 'update_first' : 'update_second'}>
                <label id='updateclose'>
                    <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/Circled_times.svg/1200px-Circled_times.svg.png' onClick={e => handleInputUpdate(e, 0)} />
                </label>
                <label>
                    Product name :- <input type="text" placeholder="Product Name" onChange={(e) => setproductName(e.target.value)} name="productName" />
                </label>
                <p className='updatewarm'>asd</p>
                <label>
                    Product Price :- <input type="text" placeholder="Product Price" onChange={(e) => setPrice(e.target.value)} name="price" />
                </label>
                <p className='updatewarm'>asd</p>
                <label id='submit'>
                    <input type='submit' onClick={update} />
                </label>
            </div>
            <div className='adminshowproduct position' id={isClicked ? 'updates_first' : 'updates_second'}>
                {showTag ? Data.map((product) => {
                    const { _id, image, productName, price, ids } = product
                    return (
                        <div className="is">
                            <div className="img-wrappers itemss">
                                <img src={process.env.REACT_APP_GET_IMAGE + image} alt="" />
                            </div>
                            <div className="text-wrappers itemss">
                                <tr>
                                    <td>name:- {productName}</td>
                                </tr>
                                <br />
                                <tr>
                                    <td>Price :- ${price}</td>
                                </tr>
                            </div>
                            <div className='productbuttons'>
                                <button value={_id} role='button' onClick={e => handleInputRemove(e)}>remove</button>
                                <button value={_id} role='button' onClick={e => handleInputUpdate(e)}>update</button>
                            </div>
                        </div>
                    )
                }) : <BorderExample />}
            </div>
        </div>
    )
}
