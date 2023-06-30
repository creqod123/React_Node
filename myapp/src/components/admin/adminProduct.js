import './admin.css'
import { useState, useEffect } from "react"
import axios from 'axios'
import Spinner from 'react-bootstrap/Spinner';


var email = localStorage.getItem("email");
var token = localStorage.getItem("token");
let Data = []
let id
let Check123
let paginatIndex = 0
let searchPaginatIndex = 0
let totalLength = 0

export default function Adminproduct() {

    const [showTag, setShowTag] = useState(false);
    const [productName, setproductName] = useState('')
    const [price, setPrice] = useState('')
    const [isClicked, setIsClicked] = useState(false);
    const [searchApi, setSearchApi] = useState('');
    const [searchProduct, setSearchProduct] = useState(false);
    const [image, setImage] = useState('')

    // ============================================ All Product get ===================================================== 

    async function SubFunction(paginat) {
        try {
            var a = await axios.post(`${process.env.REACT_APP_ADMIN_URL}`, { email: email, paginat: paginat }, {
                headers: {
                    'Content-Type': 'application/json',
                    token: token,
                },
            })
            totalLength = a.data.data.totalPosts
            Data = a.data.data.data
        }
        catch (e) {
            console.log(e)
        }
    }
    SubFunction(paginatIndex)
    useEffect(() => {
        const timeout = setTimeout(() => {
            setShowTag(true);
        }, 1000);
    }, []);

    // ============================================ Remove Product =====================================================

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

    // ============================================ Update Product =====================================================

    const BorderExample = () => {
        return <Spinner animation="border" />;
    }

    const update = async (e) => {
        try {
            if (productName === '' || price === '') {
                return (" ")
            }
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

    // ================================================ For Css =================================================

    const handleInputUpdate = (e, check) => {
        if (check === 0) {
            setIsClicked(false);
        }
        else {
            setIsClicked(true);
        }

    }

    // ============================================= searching Prodcut ====================================================

    const searchFunc = async () => {

        setSearchProduct(false)
        setShowTag(false)

        try {
            const a = await axios.post(`${process.env.REACT_APP_ADMIN_URL}/search`, { message: searchApi, email: email, paginat: searchPaginatIndex },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        token: token,
                    },
                }
            )
            const { data } = a.data
            const check = data.data.length

            if (check != 0) {
                paginatIndex = 0
                Check123 = data.data
                totalLength = data.totalPosts
                const timeout = setTimeout(() => {
                    setSearchProduct(true)
                }, 400);
            }
            else {
                const timeout = setTimeout(() => {
                    searchPaginatIndex = 0
                    setSearchProduct(false)
                    setShowTag(true)
                }, 400);
            }

        }
        catch (e) {
            console.log(e)
        }
    }

    const changePage = (check) => {

        if (showTag === true) {
            setShowTag(false)
            if (check === "previous") {
                SubFunction(--paginatIndex)
            }
            else {
                SubFunction(++paginatIndex)
            }
            const timeout = setTimeout(() => {
                setShowTag(true);
            }, 1000);
        }
        else {
            if (check === "previous") {
                searchFunc(--searchPaginatIndex)
            }
            else {
                searchFunc(++searchPaginatIndex)
            }
            const timeout = setTimeout(() => {
                setSearchProduct(true);
            }, 1000);
        }
    }


    return (
        <div>
            <div id='Searching'>

                {
                    searchProduct ? searchPaginatIndex > 0 ? <button name="previous" onClick={() => changePage("previous")}>{"<"}</button> : <button disabled>{"<"}</button>
                        : paginatIndex > 0 ? <button name="previous" onClick={() => changePage("previous")}>{"<"}</button> : <button disabled>{"<"}</button>
                }
                {
                    searchProduct ? searchPaginatIndex > Math.floor(totalLength / 9) ? <button onClick={() => changePage("forward")}>{">"}</button> : <button disabled>{">"}</button>
                        : paginatIndex < Math.floor(totalLength / 9) ? <button onClick={() => changePage("forward")}>{">"}</button> : <button disabled>{">"}</button>
                }

                <input type="search" id="search" placeholder="Search product" onChange={(e) => setSearchApi(e.target.value)} value={searchApi} />
                <input type="submit" onClick={searchFunc} />
            </div>

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
                {
                    searchProduct ?
                        Check123.map((product) => {
                            const { _id, image, productName, price } = product
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
                        }) :

                        showTag ?
                            Data.map((product) => {
                                const { _id, image, productName, price } = product
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
                            }) :
                            <BorderExample />}
            </div>
        </div>
    )
}
