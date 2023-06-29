import React from "react"
import axios from "axios"
import './user.css'
import { useState } from 'react'
import { useSelector, useDispatch } from "react-redux"
import Spinner from 'react-bootstrap/Spinner';
import { pageNation, addtoCart, RemovetoCart } from "../../Services/Actions/actions"

let paginat = 0
const email = localStorage.getItem("email")
const token = localStorage.getItem("token")
let Data
let Check123

function Home() {

    const [showTag, setShowTag] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const [searchData, setSearchData] = useState(false);

    Data = useSelector((a) => a.getItem)

    const dispatch = useDispatch()
    dispatch(pageNation(paginat))

    const totalLength = Data[Data.length - 1]
    Data.pop()

    const timeout = setTimeout(() => {
        setShowTag(true);
    }, 3500);

    const previous = () => {
        setShowTag(false);
        dispatch(pageNation(--paginat))
        const callReload = timeout
    }
    const forward = () => {
        setShowTag(false);
        dispatch(pageNation(++paginat))
        const callReload = timeout
    }

    const BorderExample = () => {
        return <Spinner animation="border" />;
    }

    const hello = async () => {
        setShowTag(false)
        try {
            const a = await axios.post(`${process.env.REACT_APP_USER_URL}/search`, { message: searchValue },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        token: token,
                    },
                }
            )
            const check = a.data.data.length
            if (check != 0) {
                Check123 = a.data.data
                const timeout = setTimeout(() => {
                    setSearchData(true)
                }, 2000);
            }
            else {
                const timeout = setTimeout(() => {
                    setSearchData(false)
                }, 2000);
            }
        }
        catch (e) {
            console.log(e)
        }
    }

    const add = (e) => {
        dispatch(addtoCart(JSON.parse(e.target.value)))
    }
    const remove = (e) => {
        dispatch(RemovetoCart(JSON.parse(e.target.value)))
    }


    const showProduct = (product) => {
        const { image, productName, price } = product
        return (
            <>
                <div className="i">
                    <div className="img-wrapper item">
                        <img src={process.env.REACT_APP_GET_IMAGE + image} alt="" />
                    </div>
                    <div className="text-wrapper item">
                        <span>{productName}</span>
                        <br />
                        <span>Price ${price}</span>
                    </div>
                    <div className="button-wrapper item">
                        <button value={JSON.stringify(product)} onClick={add}>Add to cart</button>
                    </div>
                    <div className="button-wrapper item">
                        <button value={JSON.stringify(product)} onClick={remove}>Remove</button>
                    </div>
                </div>
            </>
        )
    }
    return (
        <div className="items position">
            {searchData ? Check123.map((product) => showProduct(product)) : showTag ? Data.map((product) => showProduct(product)) : <BorderExample />}

            <div id="pagination">
                <table>
                    <tr>
                        <td>
                            {
                                paginat > 0 ? <th name="previous" onClick={previous}>{"<"}</th> : <th disabled>{"<"}</th>
                            }
                            {
                                paginat < Math.floor(totalLength / 9) ? <th onClick={forward}>{">"}</th> : <th disabled>{">"}</th>
                            }
                        </td>
                        <td>
                            Search  <input type="search" id="search" placeholder="Search product" onChange={(e) => setSearchValue(e.target.value)} value={searchValue} />
                            <input type="submit" onClick={hello} />
                        </td>
                    </tr>
                </table>
            </div>
        </div>
    );
}

export default Home