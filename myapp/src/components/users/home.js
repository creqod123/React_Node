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
let searchPaginatIndex = 0

function Home() {

    const [showTag, setShowTag] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const [searchData, setSearchData] = useState(false);

    // ========================================================== Get Data, add and remove to cart ==================================================================

    Data = useSelector((a) => a.getItem)
    const dispatch = useDispatch()
    dispatch(pageNation(paginat))
    const totalLength = Data[Data.length - 1]
    Data.pop()

    const timeout = setTimeout(() => {
        setShowTag(true);
    }, 3500);

    const add = (e) => {
        dispatch(addtoCart(JSON.parse(e.target.value)))
    }
    const remove = (e) => {
        dispatch(RemovetoCart(JSON.parse(e.target.value)))
    }

    // ========================================================== Previous forward and spinner ==================================================================

    const changePage = (check) => {

        if (showTag === true) {
            setShowTag(false)
            if (check === "previous") {
                dispatch(pageNation(--paginat))
            }
            else {
                dispatch(pageNation(++paginat))
            }
            const callReload = timeout
        }
        else {
            if (check === "previous") {
                searchFun(--searchPaginatIndex)
            }
            else {
                searchFun(++searchPaginatIndex)
            }
            const timeout = setTimeout(() => {
                setSearchData(true);
            }, 1000);
        }
    }

    const BorderExample = () => {
        return <Spinner animation="border" />;
    }

    // ========================================================== Search Function ==================================================================

    const searchFun = async () => {
        setShowTag(false)
        setSearchData(false)
        try {
            const a = await axios.post(`${process.env.REACT_APP_USER_URL}/search`, { message: searchValue, paginat: searchPaginatIndex },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        token: token,
                    },
                }
            )
            console.log("Check :- ", a)
            const check = a.data.data.data.length
            if (check != 0) {
                Check123 = a.data.data.data
                const timeout = setTimeout(() => {
                    setShowTag(false)
                    setSearchData(true)
                }, 500);
            }
            else {
                const timeout = setTimeout(() => {
                    setSearchData(false)
                    setShowTag(true)
                }, 500);
            }
        }
        catch (e) {
            console.log(e)
        }
    }

    // ========================================================== Display All product ==================================================================

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
                {
                    searchData ? searchPaginatIndex > 0 ? <button name="previous" onClick={() => changePage("previous")}>{"<"}</button> : <button disabled>{"<"}</button>
                        : paginat > 0 ? <button name="previous" onClick={() => changePage("previous")}>{"<"}</button> : <button disabled>{"<"}</button>
                }
                {
                    searchData ? searchPaginatIndex > Math.floor(totalLength / 9) ? <button onClick={() => changePage("forward")}>{">"}</button> : <button disabled>{">"}</button>
                        : paginat < Math.floor(totalLength / 9) ? <button onClick={() => changePage("forward")}>{">"}</button> : <button disabled>{">"}</button>
                }
                <input type="search" id="search" placeholder="Search product" onChange={(e) => setSearchValue(e.target.value)} value={searchValue} />
                <input type="submit" onClick={searchFun} />
            </div>
        </div>
    );
}

export default Home