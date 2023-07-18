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

const _id = localStorage.getItem("id");
const token = localStorage.getItem("token");
let Data = []
let updateProduct
let Check123
let stockUpdateId
let paginatIndex = 0
let searchPaginatIndex = 0
let totalLength = 0
let productNameSet
let priceSet

export default function Adminproduct() {

    const [showTag, setShowTag] = useState(false);
    const [productName, setproductName] = useState('')
    const [price, setPrice] = useState('')
    const [isClicked, setIsClicked] = useState(false);
    const [searchApi, setSearchApi] = useState('');
    const [searchProduct, setSearchProduct] = useState(false);
    const [modalShow, setModalShow] = React.useState(false);
    const [validated, setValidated] = useState(false);
    const [changeStock, setChangeStock] = useState('');


    // ============================================ Update stock Modal  ==============================================

    const handleSubmit = async (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.stopPropagation();
        }
        else {
            try {
                if (changeStock === '') {
                    return (" ")
                }
                await axios.post(`${process.env.REACT_APP_ADMIN_URL}/stock`, { _id: stockUpdateId, stock: changeStock }, {
                    headers: {
                        'Content-Type': 'application/json',
                        token: token,
                    },
                })
            }
            catch (e) {
                console.log(e)
            }
        }
        setShowTag(false)
        setModalShow(false)
        setValidated(true);
    };

    const stockUpdate = (id) => {
        stockUpdateId = id
        setModalShow(true)
    }

    const MyVerticallyCenteredModal = (props) => {
        return (
            <Modal {...props} size="sm" aria-labelledby="contained-modal-title-vcenter" centered >
                <Modal.Header closeButton></Modal.Header>
                <Modal.Body>
                    <Form noValidate validated={validated} onSubmit={handleSubmit}>
                        <Row className="mb-3">
                            <Form.Group as={Col} md="6" controlId="validationCustom03">
                                <Form.Control type="number" placeholder="Stock" required value={changeStock} onChange={(e) => setChangeStock(e.target.value)} />
                                <Form.Control.Feedback type="invalid">Enter Valid Stock.</Form.Control.Feedback>
                            </Form.Group>
                        </Row>
                        <Button color='success' type="submit">Submit form</Button>
                    </Form>
                </Modal.Body>
            </Modal>
        );
    }
    // ============================================ All Product get ================================================== 

    async function SubFunction(paginat) {
        try {
            const a = await axios.post(`${process.env.REACT_APP_ADMIN_URL}`, { _id: _id, paginat: paginat }, {
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
            await axios.post(`${process.env.REACT_APP_ADMIN_URL}/remove`, { id: id }, {
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
                await axios.post(`${process.env.REACT_APP_ADMIN_URL}/update`, { productName: productName, price: price, id: updateProduct }, {
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
            const a = JSON.parse(e.target.value)
            const id = a._id

            productNameSet = a.productName
            priceSet = a.price

            updateProduct = id
            setIsClicked(true);
        }
    }

    // ============================================= searching Prodcut ====================================================

    const searchFunc = async () => {
        setSearchProduct(false)
        setShowTag(false)

        try {
            const a = await axios.post(`${process.env.REACT_APP_ADMIN_URL}/search`, { message: searchApi, _id: _id, paginat: searchPaginatIndex },
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
                }, 3000);
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
            }, 3000);
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

            {/* ============================================================================================================================================ */}

            {
                isClicked ?
                    <div id='update_first' >
                        <label id='updateclose'>
                            <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/Circled_times.svg/1200px-Circled_times.svg.png' onClick={e => handleInputUpdate(e, 0)} />
                        </label>
                        <Form noValidate validated={validated} onSubmit={update}>
                            <Row className="mb-3">
                                <Form.Group as={Col} md="6" controlId="validationCustom01">
                                    <MDBInput label='Product Name' name='Proname' defaultValue={`${productNameSet}`} type='text' onChange={(e) => setproductName(e.target.value)} required />
                                    <Form.Control.Feedback type="invalid">
                                        Please provide a valid Product Name.
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group as={Col} md="6" controlId="validationCustom01">
                                    <MDBInput label='Price' type='number' defaultValue={`${priceSet}`} onChange={(e) => setPrice(e.target.value)} required />
                                    <Form.Control.Feedback type="invalid">
                                        Please provide a valid Stock.
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group as={Col} md="6" controlId="validationCustom01">
                                    <MDBFile id='formFileDisabled' required name='Fileselect' />
                                    <Form.Control.Feedback type="invalid">
                                        Please provide a valid file.
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Row>
                            <Button color='success' type="submit">Submit form</Button>
                        </Form>
                    </div>
                    :
                    <></>
            }

            <div className='adminshowproduct position' id={isClicked ? 'updates_first' : 'updates_second'}>
                {searchProduct ?
                    Check123.map((product) => {
                        const { _id, image, productName, stock, price } = product
                        return (
                            <div>
                                <Card style={{ width: '18rem', border: '1px solid black', borderRadius: '1%' }}>
                                    <Card.Img variant="top" src={process.env.REACT_APP_GET_IMAGE + image} id="imageSiza" />
                                    {console.log(image)}
                                    <Card.Body>
                                        <Card.Title>{productName}</Card.Title>
                                        <Card.Text>
                                            Price ::-- <span className="stockPrice">{price}</span>
                                        </Card.Text>
                                        <Card.Text>
                                            InStock ::-- <span className="stockPrice">{stock}</span>
                                            <Button variant="primary" onClick={() => stockUpdate(_id)} value={product} id='stockUpdate'>stock update</Button>
                                            {modalShow ? <MyVerticallyCenteredModal show={modalShow} onHide={() => setModalShow(false)} /> : <></>}
                                        </Card.Text>
                                        <div id="cartButton">
                                            <Button variant="danger" value={_id} role='button' onClick={e => handleInputRemove(e)}>Remove</Button>
                                            <Button variant="info" value={JSON.stringify(product)} role='button' onClick={e => handleInputUpdate(e)}>Update</Button>
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
                                            <Button variant="primary" onClick={() => stockUpdate(_id)} value={product} id='stockUpdate'>stock update</Button>
                                            {modalShow ? <MyVerticallyCenteredModal show={modalShow} onHide={() => setModalShow(false)} /> : <></>}
                                        </Card.Text>
                                        <div id="cartButton">
                                            <Button variant="danger" value={_id} role='button' onClick={e => handleInputRemove(e)}>Remove</Button>
                                            <Button variant="info" value={JSON.stringify(product)} role='button' onClick={e => handleInputUpdate(e)}>Update</Button>
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
