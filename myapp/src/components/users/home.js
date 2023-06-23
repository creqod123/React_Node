import React from "react"
import './user.css'
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from "react-redux"
import Spinner from 'react-bootstrap/Spinner';
import { pageNation } from "../../Services/Actions/actions"

let paginat = 9

function Home(props) {

    const [showTag, setShowTag] = useState(false);
    const [disable, setDisable] = useState(true);
    const Data = useSelector((a) => a.getItem)
    const dispatch = useDispatch()

    dispatch(pageNation(paginat))

    const timeout = setTimeout(() => {
        setShowTag(true);
    }, 2500);

    const previous = () => {
        setShowTag(false);
        dispatch(pageNation(paginat -= 9))
        const callReload = timeout
    }
    const forward = () => {
        setShowTag(false);
        dispatch(pageNation(paginat += 9))
        const callReload = timeout
    }

    const BorderExample = () => {
        return <Spinner animation="border" />;
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
                            {
                                paginat > 9 ? <th name="previous" role="button" onClick={previous}>{"<"}</th> : <th disabled>{"<"}</th>
                            }
                            {
                                <th className="check2" name="forward" role="button" onClick={forward}>{">"}</th>
                            }
                        </tr>
                    </table>
                </div>
        </div>
    );
}

export default Home