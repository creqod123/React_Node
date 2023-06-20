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
    // const [image, setImage] = useState('')

    const SubFunction = () => {
        return new Promise(async (resolve) => {
            var url = process.env.REACT_APP_ADMIN_URL
            try {
                var a = await axios.post(url, { email: email }, {
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
            resolve();
        });
    }
    SubFunction()
    useEffect(() => {
        const timeout = setTimeout(() => {
            setShowTag(true);
        }, 1000);
    }, []);

    const handleInputremove = async (e) => {
        const id = e.target.value;
        const url = process.env.REACT_APP_ADMIN_URL + "/remove"
        try {
            await axios.post(url, { id: id, email: email }, {
                headers: {
                    'Content-Type': 'application/json',
                    token: token,
                },
            })
        }
        catch (e) {
            console.log(e)
        }
        SubFunction()
    }

    const BorderExample = () => {
        return <Spinner animation="border" />;
    }

    const update = async (e) => {
        if (productName === '' || price === '') {
            return (" ")
        }
        const url = process.env.REACT_APP_ADMIN_URL + "/update"
        try {
            await axios.post(url, { email: email, productName: productName, price: price }, {
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

    const handleInputupdate = (e, check) => {

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
                    <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/Circled_times.svg/1200px-Circled_times.svg.png' onClick={e => handleInputupdate(e, 0)} />
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
                                <img src={image} alt="" />
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
                                <button value={_id} role='button' onClick={e => handleInputremove(e)}>remove</button>
                                <button value={_id} role='button' onClick={e => handleInputupdate(e)}>update</button>
                            </div>
                        </div>
                    )
                }) : <BorderExample />}
            </div>
        </div>
    )
}
