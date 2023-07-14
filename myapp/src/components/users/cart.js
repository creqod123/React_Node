import axios from 'axios'
import './user.css'
import { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { addtoCart, RemovetoCart } from "../../Services/Actions/actions"
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

let totalcost = 0
let total = 0
let email = localStorage.getItem('email')
let token = localStorage.getItem("token")


function Cart() {
    const [showTag, setShowTag] = useState(false);
    const [fullName, setfullName] = useState('');
    const [house, setHouse] = useState('');
    const [area, setArea] = useState('');
    const [city, setCity] = useState('');
    const [pincode, setPincode] = useState('');
    const [validated, setValidated] = useState(false);
    const [stockValue, setStockValue] = useState(false);

    const dispatch = useDispatch()
    let prop = useSelector((a) => a.cardItems)

    const check1 = async () => {
        setShowTag(true)
    }

    const check2 = async () => {
        setShowTag(false)
    }

    const add = (e) => {
        dispatch(addtoCart(JSON.parse(e.target.value)))
    }

    const remove = (e) => {
        dispatch(RemovetoCart(JSON.parse(e.target.value)))
    }



    const conformOrder = async (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        else {
            const id = localStorage.getItem("id")
            let formdata = new FormData()

            let swap
            let counter = []
            for (let i = 0; i < prop.length; i++) {
                prop[i].cardData.quantity = 1
                prop[i].cardData.fullName = fullName
                prop[i].cardData.house = house
                prop[i].cardData.area = area
                prop[i].cardData.city = city
                prop[i].cardData.pincode = pincode
                for (var j = i + 1; j < prop.length; j++) {
                    if (prop[i].cardData._id === prop[j].cardData._id) {
                        counter.push(prop[i])
                        prop[i].cardData.quantity = prop[i].cardData.quantity + 1
                        prop.splice(j, 1)
                        j--
                    }
                }
            }

            for (let k = 0; k < prop.length; k++) {
                for (let l = k; l < prop.length; l++) {
                    if (prop[k].cardData._id >= prop[l].cardData._id) {
                        swap = prop[l]
                        prop[l] = prop[k]
                        prop[k] = swap
                    }
                }
            }

            formdata = [prop, email]

            try {
                await axios.post(`${process.env.REACT_APP_USER_URL}/checkout`, formdata,
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            token: token,
                        },
                    })
            }
            catch (e) {
                console.log(e)
            }
            // counter.map((e) => prop.push(e))
            // totalcost = 0
            // total = 0
            // window.location.href = '/user/shop'
        }

        setValidated(true);
    }

    let swap
    let counter = []

    for (let i = 0; i < prop.length; i++) {
        prop[i].cardData.quantity = 1
        for (let j = i + 1; j < prop.length; j++) {
            if (prop[i].cardData._id === prop[j].cardData._id) {
                counter.push(prop[i])
                prop[i].cardData.quantity = prop[i].cardData.quantity + 1
                prop.splice(j, 1)
                j--
            }
        }
    }
    for (let k = 0; k < prop.length; k++) {
        for (let l = k; l < prop.length; l++) {
            if (prop[k].cardData._id >= prop[l].cardData._id) {
                swap = prop[l]
                prop[l] = prop[k]
                prop[k] = swap
            }
        }
    }

    const hello = (product) => {
        const { image, productName, price, quantity, stock } = product
        return (
            <div id="showProductUser">
                <div>
                    <Card style={{ width: '18rem', border: '1px solid black', borderRadius: '1%' }}>
                        <Card.Img variant="top" src={process.env.REACT_APP_GET_IMAGE + image} id="imageSiza" />
                        <Card.Body>
                            <Card.Title>{productName}</Card.Title>
                            <Card.Text>
                                Price ::-- {price}
                            </Card.Text>
                            <Card.Text>
                                InStock ::-- {stock - quantity}
                            </Card.Text>
                            {
                                stock > quantity
                                    ?
                                    <div id="cartButton">
                                        <Button variant="primary" value={JSON.stringify(product)} onClick={add}>+</Button>
                                        <p id="productCounter">{quantity}</p>
                                        <Button variant="primary" value={JSON.stringify(product)} onClick={remove}>-</Button>
                                    </div>
                                    :
                                    <div id="cartButton">
                                        <Button variant="primary" disabled>+</Button>
                                        <p id="productCounter">{quantity}</p>
                                        <Button variant="primary" value={JSON.stringify(product)} onClick={remove}>-</Button>
                                    </div>
                            }
                        </Card.Body>
                    </Card>
                </div>
            </div>
        );
    }

    function GridComplexExample() {
        return (
            <Form noValidate validated={validated} onSubmit={conformOrder}>
                <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/Circled_times.svg/1200px-Circled_times.svg.png' onClick={check2} id='imageSizaClose' />
                <Form.Group className="mb-3" controlId="formGridAddress1">
                    <Form.Label>Full Name</Form.Label>
                    <Form.Control placeholder="Full Name." name="productName" onChange={(e) => setfullName(e.target.value)} required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formGridAddress1" >
                    <Form.Label>Address</Form.Label>
                    <Form.Control placeholder="12 - Floor, building name" onChange={(e) => setHouse(e.target.value)} required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formGridAddress2">
                    <Row>
                        <Col xs={7}>
                            <Form.Control placeholder="Area" onChange={(e) => setArea(e.target.value)} required />
                            <Form.Control.Feedback type="invalid">
                                Please provide a valid area.
                            </Form.Control.Feedback>
                        </Col>
                        <Col>
                            <Form.Control placeholder="City" onChange={(e) => setCity(e.target.value)} required />
                            <Form.Control.Feedback type="invalid">
                                Please provide a valid city.
                            </Form.Control.Feedback>
                        </Col>
                        <Col>
                            <Form.Control type="number" min={111111} max={999999} placeholder="Pincode" onChange={(e) => setPincode(e.target.value)} required />
                            <Form.Control.Feedback type="invalid">
                                Please provide a valid pincode  .
                            </Form.Control.Feedback>
                        </Col>
                    </Row>
                </Form.Group>

                <Button variant="primary" type="submit">Submit</Button>
            </Form>
        );
    }


    return (
        <div className="items">
            {showTag ?
                <>
                    <div className="cartprop">{counter.map((e) => prop.push(e))}</div>
                    <div id='orderconfrom'> {GridComplexExample()} </div>
                </>
                : <div>
                    <div id="totalcost">
                        {
                            prop.length != 0 ?
                                <>
                                    <p className='cartc'>Total Cost :- {totalcost}</p>
                                    <button className="cartc" onClick={check1}>CheckOut</button>
                                </>
                                : <h1>Add product</h1>
                        }
                    </div>
                    <div className='position'>
                        {prop.map((product) => hello(product.cardData))}
                    </div>
                    <div className="cartprop">{counter.map((e) => prop.push(e))} {totalcost = 0} {total = 0}</div>
                </div>
            }
        </div>
    )
}




export default Cart