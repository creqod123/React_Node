import React from "react"
import axios from "axios"
import './user.css'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux"
import { pageNation, addtoCart, RemovetoCart } from "../../Services/Actions/actions"
import { MDBInputGroup, MDBInput, MDBIcon, MDBBtn } from 'mdb-react-ui-kit';
import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

let paginat = 0
const token = localStorage.getItem("token")
let Data
let Check123
let searchPaginatIndex = 0
let totalLength
let dataStock

function Home(props) {

    const [showTag, setShowTag] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const [searchData, setSearchData] = useState(false);
    const dispatch = useDispatch()
    const history = useNavigate('')
    const [first, setFirst] = useState(false);
    const [second, setSecond] = useState(false);

    Data = useSelector((a) => a.getItem)
    dataStock = useSelector((a) => a.cardItems)
    dispatch(pageNation(paginat))
    totalLength = Data[Data.length - 1]

    useEffect(() => {
        setTimeout(() => {
            setShowTag(true);
        }, 1000);
    }, [])

    useEffect(() => {
        if (props.props.socket) {
            props.props.socket.on('updateProduct', res => {
                setShowTag(false)
                setTimeout(() => {
                    setShowTag(true)
                }, 1000)
            })

            props.props.socket.on('addProduct', res => {
                setShowTag(false)
                setTimeout(() => {
                    setShowTag(true)
                }, 1000)
            })
            props.props.socket.on('addProduct', res => {
                setShowTag(false)
                setTimeout(() => {
                    setShowTag(true)
                }, 1000)
            })
        }
    }, [])


    useEffect(() => {
        if (props.props.socket) {
            props.props.socket.on('updateProduct', res => {
                setShowTag(false)
                setTimeout(() => {
                    setShowTag(true)
                }, 1000)
            })
        }
    })

    // ========================================================== Get Data, add and remove to cart ==================================================================

    const add = (e) => {
        const a = JSON.parse(e.target.value)
        dispatch(addtoCart(JSON.parse(e.target.value)))
    }
    const remove = (e) => {
        dispatch(RemovetoCart(JSON.parse(e.target.value)))
    }
    const goToCart = () => {
        history('/user/cart')
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
            setTimeout(() => {
                setShowTag(true);
            }, 800);
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
        return <Spinner animation="border" id="spinner" />;
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

    const BasicExample = (product) => {
        if (product.image != null) {
            const { image, productName, price, stock, _id } = product
            let cartCheck
            let stockLimit
            return (
                <div id="showProductUser">
                    <Card style={{ width: '18rem', border: '1px solid black', borderRadius: '1%' }}>
                        <Card.Img variant="top" src={process.env.REACT_APP_GET_IMAGE + image} id="imageSiza" />
                        <Card.Body>
                            <Card.Title>{productName}</Card.Title>
                            <Card.Text>
                                Price ::-- <span className="stockPrice">{price}</span>
                            </Card.Text>
                            <Card.Text>
                                InStock ::-- <span className="stockPrice">{stock}</span>
                            </Card.Text>

                            {
                                dataStock.map((product) => {
                                    if (product.cardData._id === _id) {
                                        cartCheck = true
                                    }
                                })
                            }

                            {stock === 0 ? stockLimit == true : <></>}

                            {cartCheck ?
                                <div id="cartButton">
                                    <Button variant="success" onClick={goToCart}>go to cart</Button>
                                    <Button variant="danger" value={JSON.stringify(product)} onClick={remove}>Remove</Button>
                                </div> :
                                <div id="cartButton">
                                    {stock ?
                                        <>
                                            <Button variant="primary" value={JSON.stringify(product)} onClick={add}>Add to cart</Button>
                                        </> :
                                        <>
                                            <Button variant="danger" disabled>Out of Stock</Button>
                                        </>
                                    }
                                </div>
                            }
                        </Card.Body>
                    </Card>
                </div>
            );
        }
    }

    return (
        <div className="items">
            <div className="pagination">
                <div id="searchPaginat">
                    <div id="paginate">
                        {
                            searchData ? searchPaginatIndex > 0 ? <button name="previous" onClick={() => changePage("previous")}>{"<"}</button> : <button disabled>{"<"}</button>
                                : paginat > 0 ? <button name="previous" onClick={() => changePage("previous")}>{"<"}</button> : <button disabled>{"<"}</button>
                        }
                        {
                            searchData ? searchPaginatIndex > Math.floor(totalLength / 9) ? <button onClick={() => changePage("forward")}>{">"}</button> : <button disabled>{">"}</button>
                                : paginat < Math.floor(totalLength / 9) ? <button onClick={() => changePage("forward")}>{">"}</button> : <button disabled>{">"}</button>
                        }
                    </div>
                    <div id="searchTag">
                        <MDBInputGroup>
                            <MDBInput label='Search' onChange={(e) => setSearchValue(e.target.value)} value={searchValue} />
                            <MDBBtn rippleColor='dark'>
                                <MDBIcon type='submit' icon='search' onClick={searchFun} />
                            </MDBBtn>
                        </MDBInputGroup>
                    </div>
                </div>
            </div>
            <div className="position">
                {searchData ? Check123.map((product) => BasicExample(product)) : showTag ? Data.map((product) => BasicExample(product)) : <BorderExample />}
            </div>
            <div className="calc">
                FIRST<input type="number" placeholder="first" onChange={(e) => { setFirst(e.target.value) }} />
                SECOND<input type="number" placeholder="second" onChange={(e) => { setSecond(e.target.value) }} />
                F * S<input value={first * second} />
                F * S / 9<input value={(first * second / 9).toFixed(2)} />
                F - S<input value={(first - second)} />
                F / 2<input value={(first / 2)} />
                {/* <input type="submit" onClick={restBtn} /> */}
            </div>
        </div>
    );
}

export default Home