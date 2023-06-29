import React from "react"
import './user.css'
import { useState } from 'react'
import { useSelector, useDispatch } from "react-redux"
import Spinner from 'react-bootstrap/Spinner';
import { pageNation } from "../../Services/Actions/actions"

let paginat = 0
let hello123

function Home(props) {

    const [showTag, setShowTag] = useState(false);
    const Data = useSelector((a) => a.getItem)
    const dispatch = useDispatch()
    const totalLength = Data[Data.length - 1]
    Data.pop()
    dispatch(pageNation(paginat))

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

    const hello = (e) => {
        console.log(e.target.value)
    }


    const showProduct = (props, product) => {
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
                        <button onClick={() => props.addtoCartHandler(product)}>Add to cart</button>
                    </div>
                    <div className="button-wrapper item">
                        <button onClick={() => props.RemovetoCartHandler(product)}>Remove</button>
                    </div>
                </div>
            </>
        )
    }
    return (
        <div className="items position">
            {showTag ? Data.map((product) => showProduct(props, product)) : <BorderExample />}
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
                            Search  <input type="search" id="search" placeholder="Search product" onChange={hello} value={hello123}/>
                        </td>
                    </tr>
                </table>
            </div>
        </div>
    );
}

export default Home