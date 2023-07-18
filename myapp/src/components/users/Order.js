import { useEffect, useState } from 'react'
import Spinner from 'react-bootstrap/Spinner';
import './user.css'
import { MDBInputGroup, MDBInput, MDBIcon, MDBBtn } from 'mdb-react-ui-kit';
import { MDBBadge, MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';

import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Modal from 'react-bootstrap/Modal';

let check
let Data = []
let order = []
const _id = localStorage.getItem("id")
const email = localStorage.getItem("email")
const token = localStorage.getItem("token")
let id

export default function Order(props) {
    const [showTag, setShowTag] = useState(false);
    const [address, setAddress] = useState(false);
    const [updateAddress, setUpdateAddress] = useState(false);
    const [clicked, setClicked] = useState(false);
    const [fullName, setfullName] = useState('');
    const [house, setHouse] = useState('');
    const [area, setArea] = useState('');
    const [city, setCity] = useState('');
    const [pincode, setPincode] = useState('');
    const [searchValue, setSearchValue] = useState('');
    const [validated, setValidated] = useState(false);

    const SubFunction = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_USER_URL}/detail`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    token: token,
                },
                body: JSON.stringify({ _id: _id }),
            })
            const data = await response.json();
            Data = data.data
        }
        catch (e) {
            console.log(e)
        }
    }

    SubFunction();
    const timeout = setTimeout(() => {
        setShowTag(true)
    }, 1000);


    useEffect(() => {

        if (props.props.socket) {
            props.props.socket.on('conformOrder', res => {
                setShowTag(false)
            })
        }
    }, [])

    const BorderExample = () => {

        return <Spinner animation="border" className='spinLoader' variant="primary" />;
    }

    const checkAddress = (e) => {
        const id = e.target.value
        const SubFunction = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_USER_URL}/order`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        token: token,
                    },
                    body: JSON.stringify({ _id: id }),
                })
                const data = await response.json();
                order = data.data
            }
            catch (e) {
                console.log(e)
            }
            setClicked(true)
        }
        SubFunction();
        const timeout = setTimeout(() => {
            setAddress(true)
        }, 100);
    }

    const handleInputUpdate = () => {
        setAddress(false)
        setUpdateAddress(false)
        setClicked(false)
    }

    const addressUpdate = (e) => {
        id = e.target.value
        setUpdateAddress(true)
    }

    const orderUpdate = (event) => {

        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        else {
            const SubFunction = async () => {
                try {
                    await fetch(`${process.env.REACT_APP_USER_URL}/orderupdate`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            token: token,
                        },
                        body: JSON.stringify({ id: id, fullName: fullName, house: house, area: area, city: city, pincode: pincode }),
                    })
                }
                catch (e) {
                    console.log(e)
                }
                setUpdateAddress(false)
            }

            if (fullName.length == 0 || house.length == 0 || area.length == 0 || city.length == 0 || pincode.length == 0) {
            }
            else {
                SubFunction();
            }
        }
        setValidated(true)
    }

    // ============================================================================================

    const searchFun = () => {

    }


    return (
        <div id='main'>
            <div className={updateAddress ? 'back' : <></>}>
                <div className='pagination'>
                    <div id="searchPaginat">
                        <div id="paginate">
                            <button disabled>{"<"}</button>
                            <button disabled>{">"}</button>
                        </div>
                        <div id="searchTag">
                            <MDBInputGroup>
                                <MDBInput label='Search' onChange={(e) => setSearchValue(e.target.value)} value={searchValue} />
                                <MDBBtn rippleColor='dark' role='button' onClick={searchFun}>
                                    <MDBIcon type='submit' icon='search' onClick={searchFun} />
                                </MDBBtn>
                            </MDBInputGroup>
                        </div>
                    </div>
                </div>
                <div className='adminshow' >
                    {clicked ? <></> :
                        <MDBTable align='middle'>
                            <MDBTableHead>
                                <tr className='userTableProduct'>
                                    <th scope='col' >Product Name.</th>
                                    <th scope='col' >Product Price</th>
                                    <th scope='col' >Quantity</th>
                                    <th scope='col' >Status</th>
                                    <th scope='col' >Address</th>
                                </tr>
                            </MDBTableHead>
                            < MDBTableBody >
                                {showTag ? Data.map((product) => {
                                    const { quantity, productId, price, status } = product
                                    return (
                                        < tr className='userTableProduct'>
                                            <td>
                                                <div className='d-flex align-items-center'>
                                                    <div className='ms-3'>
                                                        <p className='fw-bold mb-1'>{productId.productName}</p>
                                                        <p className='text-muted mb-0'>{email}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <p className='fw-normal mb-1'>₹ {price}</p>
                                            </td>
                                            <td>
                                                <p className='fw-normal mb-1'>{quantity}</p>
                                            </td>
                                            <td>
                                                {
                                                    status === "Pending" ?
                                                        <MDBBadge color='warning' pill>
                                                            {status}
                                                        </MDBBadge>
                                                        :
                                                        <MDBBadge color='success' pill>
                                                            {status}
                                                        </MDBBadge>
                                                }
                                            </td>
                                            <td>
                                                <MDBBtn color='link' rounded size='sm' value={product.addressId._id} onClick={checkAddress}>
                                                    address
                                                </MDBBtn>
                                            </td>
                                        </tr>
                                    )
                                }) : <BorderExample />}
                            </MDBTableBody>
                        </MDBTable>}

                    {address ?
                        <div id={clicked ? 'show' : 'hide'}>
                            <MDBTable align='middle'>
                                <MDBTableHead>
                                    <tr className='userTableProduct'>
                                        <th scope='col' >Full Name.</th>
                                        <th scope='col' >House NO and Name</th>
                                        <th scope='col' >Area</th>
                                        <th scope='col' >City</th>
                                        <th scope='col' >Pincode</th>
                                        <th scope='col' >update</th>
                                    </tr>
                                </MDBTableHead>
                                < MDBTableBody >
                                    {address ? order.map((product) => {
                                        const { fullName, house, area, city, pincode, _id } = product
                                        return (
                                            < tr className='userTableProduct'>
                                                <td>
                                                    <div className='d-flex align-items-center'>
                                                        <div className='ms-3'>
                                                            <p className='fw-bold mb-1'>{fullName}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <p className='fw-normal mb-1'>{house}</p>
                                                </td>
                                                <td>
                                                    <p className='fw-normal mb-1'>{area}</p>
                                                </td>
                                                <td>
                                                    <p className='fw-normal mb-1'>{city}</p>
                                                </td><td>
                                                    <p className='fw-normal mb-1'>{pincode}</p>
                                                </td>
                                                <td>
                                                    <MDBBtn color='link' rounded size='sm' value={_id} onClick={addressUpdate}>
                                                        Update
                                                    </MDBBtn>
                                                </td>
                                            </tr>
                                        )
                                    }) : <BorderExample />}
                                    <Button variant="secondary" onClick={handleInputUpdate} id='userTableClose'>Close</Button>
                                </MDBTableBody>
                            </MDBTable>
                        </div>
                        : <></>
                    }
                </div >
            </div>
            {
                updateAddress ?
                    <div className="modal show" style={{ display: 'block', position: 'initial' }}>
                        <Modal.Dialog>
                            <Modal.Header >
                                <Form noValidate validated={validated} onSubmit={orderUpdate}>
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
                                            <Col xs={5}>
                                                <Form.Control placeholder="Area" onChange={(e) => setArea(e.target.value)} required />
                                                <Form.Control.Feedback type="invalid">
                                                    Provide valid area.
                                                </Form.Control.Feedback>
                                            </Col>
                                            <Col>
                                                <Form.Control placeholder="City" onChange={(e) => setCity(e.target.value)} required />
                                                <Form.Control.Feedback type="invalid">
                                                    Enter valid city
                                                </Form.Control.Feedback>
                                            </Col>
                                            <Col>
                                                <Form.Control type="number" min={111111} max={999999} placeholder="Pincode" onChange={(e) => setPincode(e.target.value)} required />
                                                <Form.Control.Feedback type="invalid">
                                                    Enter valid Pincode
                                                </Form.Control.Feedback>
                                            </Col>
                                        </Row>
                                    </Form.Group>
                                    <Modal.Footer>
                                        <Button variant="secondary" onClick={handleInputUpdate}>Close</Button>
                                        <Button variant="primary" type="submit">Save changes</Button>
                                    </Modal.Footer>
                                </Form>
                            </Modal.Header>
                        </Modal.Dialog>
                    </div>
                    : <></>
            }
        </div >
    )
}
