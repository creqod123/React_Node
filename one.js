import React from "react"
import './user.css'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from "react-redux"
import Spinner from 'react-bootstrap/Spinner';
import {getAllitem} from "../../Services/Actions/actions"

let Data = []
let id
const email = localStorage.getItem("email")
var token = localStorage.getItem("token")

function Home(props) {
    const val = useSelector((a) => a.getItem)
    const dispatch = useDispatch()

    dispatch(getAllitem())

    console.log("val :- ", val)
    console.log("Hello world")

    const [showTag, setShowTag] = useState(false);
    const SubFunction = () => {
        return new Promise(async (resolve) => {
            const url = process.env.REACT_APP_USER_URL
            try {
                const a = await axios.post(url, { email: email },
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            token: token,
                        },
                    }
                )
                Data = a.data.data
                id = a.data.id
            }
            catch (e) {
                console.log(e)
            }

            resolve();
        });
    }

    SubFunction();

    useEffect(() => {
        const timeout = setTimeout(() => {
            setShowTag(true);
        }, 500);
    }, []);

    const BorderExample = () => {
        return <Spinner animation="border" />;
    }

    const showProduct = (props, product) => {
        const { image, productName, price } = product
        return (

            <div className="i">
                <div className="img-wrapper item">
                    <img src="./image/first.png" alt="" />
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