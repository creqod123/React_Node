import { useEffect, useState } from 'react'
import Spinner from 'react-bootstrap/Spinner';
import './user.css'
import { MDBInputGroup, MDBInput, MDBIcon, MDBBtn } from 'mdb-react-ui-kit';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

let check
let Data = []
let order = []
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
                body: JSON.stringify({ email: email }),
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

        return <Spinner animation="border" className='helloworld' variant="primary" />;
    }

    const checkAddress = (e) => {
        const email = e.target.value
        const SubFunction = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_USER_URL}/order`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        token: token,
                    },
                    body: JSON.stringify({ email: email }),
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
        <div>
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
                {clicked ? <></> : <table>
                    <tr>
                        <th>productName</th>
                        <th>ProductPrice</th>
                        <th>Quantity</th>
                        <th>Status</th>
                        <th>Address</th>
                    </tr>
                    {showTag ? Data.map((product) => {
                        const { quantity, productId, price, status } = product
                        return (
                            <tr>
                                <td>{productId.productName}</td>
                                <td>{price}</td>
                                <td>{quantity}</td>
                                <td>{status}</td>
                                <td><button value={product.addressId._id} onClick={checkAddress}>address</button></td>
                            </tr>
                        )
                    }) : <BorderExample />}
                </table>}

                {address ?
                    <div id={clicked ? 'show' : 'hide'}>
                        <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/Circled_times.svg/1200px-Circled_times.svg.png' id='close' onClick={e => handleInputUpdate(0)} />
                        <table>
                            <tr>
                                <th>Full Name</th>
                                <th>House NO and Name</th>
                                <th>Area</th>
                                <th>City</th>
                                <th>Pincode</th>
                                <th>update</th>
                            </tr>
                            {address ? order.map((product) => {
                                const { fullName, house, area, city, pincode, _id } = product
                                return (
                                    <tr>
                                        <td>{fullName}</td>
                                        <td>{house}</td>
                                        <td>{area}</td>
                                        <td>{city}</td>
                                        <td>{pincode}</td>
                                        <td>{<button value={_id} onClick={addressUpdate}>Update</button>}</td>
                                    </tr>
                                )
                            }) : <></>}
                        </table>

                        {updateAddress ?
                            <Form noValidate validated={validated} onSubmit={orderUpdate}>
                                <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/Circled_times.svg/1200px-Circled_times.svg.png' onClick={handleInputUpdate} id='imageSizaClose' />
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
                            : <></>}
                    </div>
                    : <></>}
            </div>
        </div>
    )
}
