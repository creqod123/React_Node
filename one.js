import React from "react"
import './user.css'
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from "react-redux"
import Spinner from 'react-bootstrap/Spinner';
import { getAllitem } from "../../Services/Actions/actions"

function Home(props) {

    const [showTag, setShowTag] = useState(false);
    const Data = useSelector((a) => a.getItem)
    const dispatch = useDispatch()

    dispatch(getAllitem())

    useEffect(() => {
        const timeout = setTimeout(() => {
            setShowTag(true);   
        }, 1000);
    }, []);

    const BorderExample = () => {
        return <Spinner animation="border" />;
    }

    const showProduct = (props, product) => {
        const { image, productName, price } = product
        return (
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
        )
    }

    return (
        <div className="items position">
            {showTag ? Data.map((product) => showProduct(props, product)) : <BorderExample />}
        </div>
    );
}

export default Home






// {disable ? <th value="" name="previous" role="button" onClick={previous}>{"<"}</th> : <>hello world</>}
// {disable ? <th value="" name="forward" role="button" onClick={forward}>{">"}</th> : <>hello world</>}