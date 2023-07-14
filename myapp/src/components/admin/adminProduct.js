import './admin.css'
import React from "react"
import { useState, useEffect } from "react"
import { MDBInputGroup, MDBInput, MDBIcon, MDBBtn, MDBFile } from 'mdb-react-ui-kit';
import Modal from 'react-bootstrap/Modal';

import axios from 'axios'
import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

const email = localStorage.getItem("email");
const token = localStorage.getItem("token");
let Data = []
let updateProduct
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
    const [modalShow, setModalShow] = React.useState(false);
    const [validated, setValidated] = useState(false);

    // ============================================ Update stock Modal  ==============================================

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        setValidated(true);
    };

    function MyVerticallyCenteredModal(props) {
        return (
            <Modal {...props} size="sm" aria-labelledby="contained-modal-title-vcenter" centered >
                <Modal.Header closeButton></Modal.Header>
                <Modal.Body>
                    <Form noValidate validated={validated} onSubmit={handleSubmit}>
                        <Row className="mb-3">
                            <Form.Group as={Col} md="6" controlId="validationCustom03">
                                <Form.Control type="number" placeholder="Stock" required />
                                <Form.Control.Feedback type="invalid">
                                    Please provide a valid Stock.
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Row>
                        <Button type="submit">Submit form</Button>
                    </Form>
                </Modal.Body>
            </Modal>
        );
    }
    // ============================================ All Product get ================================================== 

    async function SubFunction(paginat) {
        try {
            const a = await axios.post(`${process.env.REACT_APP_ADMIN_URL}`, { email: email, paginat: paginat }, {
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
    const timeout = setTimeout(() => {
        setShowTag(true);
    }, 3000);

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
        setShowTag(false);
    }

    // ============================================ Update Product =====================================================

    const BorderExample = () => {
        return <Spinner animation="border" id='spinner' />;
    }

    const update = async (event) => {

        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        else {
            try {
                if (productName === '' || price === '') {
                    return (" ")
                }
                await axios.post(`${process.env.REACT_APP_ADMIN_URL}/update`, { email: email, productName: productName, price: price, id: updateProduct }, {
                    headers: {
                        'Content-Type': 'application/json',
                        token: token,
                    },
                })
            }
            catch (e) {
                console.log(e)
            }
            setShowTag(false);
            setIsClicked(false);
        }
        setValidated(true);
    }

    // ================================================ For Css =================================================

    const handleInputUpdate = (e, check) => {
        if (check === 0) {
            setIsClicked(false);
        }
        else {
            updateProduct = e.target.value
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

            if (check !== 0) {
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
            <div className="pagination">
                <div id="searchPaginat">
                    <div id="paginate">
                        {
                            searchProduct ? searchPaginatIndex > 0 ? <button name="previous" onClick={() => changePage("previous")}>{"<"}</button> : <button disabled>{"<"}</button>
                                : paginatIndex > 0 ? <button name="previous" onClick={() => changePage("previous")}>{"<"}</button> : <button disabled>{"<"}</button>
                        }
                        {
                            searchProduct ? searchPaginatIndex > Math.floor(totalLength / 9) ? <button onClick={() => changePage("forward")}>{">"}</button> : <button disabled>{">"}</button>
                                : paginatIndex < Math.floor(totalLength / 9) ? <button onClick={() => changePage("forward")}>{">"}</button> : <button disabled>{">"}</button>
                        }
                    </div>
                    <div id="searchTag">
                        <MDBInputGroup>
                            <MDBInput label='Search' onChange={(e) => setSearchApi(e.target.value)} value={searchApi} />
                            <MDBBtn rippleColor='dark' role='button' onClick={searchFunc}>
                                <MDBIcon type='submit' icon='search' onClick={searchFunc} />
                            </MDBBtn>
                        </MDBInputGroup>
                    </div>
                </div>
            </div>

            <div id={isClicked ? 'update_first' : 'update_second'}>
                <label id='updateclose'>
                    <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/Circled_times.svg/1200px-Circled_times.svg.png' onClick={e => handleInputUpdate(e, 0)} />
                </label>
                <Form noValidate validated={validated} onSubmit={update}>
                    <Row className="mb-3">
                        <Form.Group as={Col} md="6" controlId="validationCustom01">
                            <MDBInput label='Product Name' name='Proname' type='text' onChange={(e) => setproductName(e.target.value)} required />
                            <Form.Control.Feedback type="invalid">
                                Please provide a valid Stock.
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} md="6" controlId="validationCustom01">
                            <MDBInput label='Price' type='text' onChange={(e) => setPrice(e.target.value)} required />
                            <Form.Control.Feedback type="invalid">
                                Please provide a valid Stock.
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} md="6" controlId="validationCustom01">
                            <MDBFile id='formFileDisabled' required name='Fileselect' />
                            <Form.Control.Feedback type="invalid">
                                Please provide a valid Stock.
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Row>
                    <Button color='success' type="submit">Submit form</Button>
                </Form>
            </div>

            <div className='adminshowproduct position' id={isClicked ? 'updates_first' : 'updates_second'}>
                {searchProduct ?
                    Check123.map((product) => {
                        const { _id, image, productName, stock, price } = product
                        return (
                            <div>
                                <Card style={{ width: '18rem', border: '1px solid black', borderRadius: '1%' }}>
                                    <Card.Img variant="top" src={process.env.REACT_APP_GET_IMAGE + image} id="imageSiza" />
                                    <Card.Body>
                                        <Card.Title>{productName}</Card.Title>
                                        <Card.Text>
                                            Price ::-- <span className="stockPrice">{price}</span>
                                        </Card.Text>
                                        <Card.Text>
                                            InStock ::-- <span className="stockPrice">{stock}</span>
                                            <Button variant="success" value={_id}>Remove</Button>
                                        </Card.Text>
                                        <div id="cartButton">
                                            <Button variant="danger" value={_id} role='button' onClick={e => handleInputRemove(e)}>Remove</Button>
                                            <Button variant="info" value={_id} role='button' onClick={e => handleInputUpdate(e)}>Update</Button>
                                        </div>
                                    </Card.Body>
                                </Card>
                            </div>
                        )
                    }) :

                    showTag ? Data.map((product) => {
                        const { _id, image, productName, stock, price } = product
                        return (
                            <div>
                                <Card style={{ width: '18rem', border: '1px solid black', borderRadius: '1%' }}>
                                    <Card.Img variant="top" src={process.env.REACT_APP_GET_IMAGE + image} id="imageSiza" />
                                    <Card.Body>
                                        <Card.Title>{productName}</Card.Title>
                                        <Card.Text>
                                            Price ::-- <span className="stockPrice">{price}</span>
                                        </Card.Text>
                                        <Card.Text>
                                            InStock ::-- <span className="stockPrice">{stock}</span>
                                            <Button variant="primary" onClick={() => setModalShow(true)} value={_id} id='stockUpdate'>stock update</Button>
                                            <MyVerticallyCenteredModal show={modalShow} onHide={() => setModalShow(false)} />
                                        </Card.Text>
                                        <div id="cartButton">
                                            <Button variant="danger" value={_id} role='button' onClick={e => handleInputRemove(e)}>Remove</Button>
                                            <Button variant="info" value={_id} role='button' onClick={e => handleInputUpdate(e)}>Update</Button>
                                        </div>
                                    </Card.Body>
                                </Card>
                            </div>
                        )
                    })
                        : <BorderExample />
                }
            </div>
        </div >
    )
}
