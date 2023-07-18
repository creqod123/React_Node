import axios from "axios"
import { useState } from "react"
import './admin.css'
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import FloatingLabel from 'react-bootstrap/FloatingLabel';

const token = localStorage.getItem("token");

export default function Admincontrol() {

    const [productName, setproductName] = useState('')
    const [price, setPrice] = useState('')
    const [image, setImage] = useState('')
    const [stock, setStock] = useState('')
    const _id = localStorage.getItem("id")
    const [validated, setValidated] = useState(false);

    const productAdd = async (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        else {
            const formData = new FormData();
            formData.append('productName', productName);
            formData.append('price', price);
            formData.append('image', image);
            formData.append('_id', _id)
            formData.append('stock', stock)
            try {
                await axios.post(`${process.env.REACT_APP_ADMIN_URL}/add`, formData)
            }
            catch (e) {
                console.log(e)
            }
        }
        setValidated(true);
    }

    return (
        <Form noValidate validated={validated} onSubmit={productAdd} id="adminControlForm">
            <Row className="mb-3">
                <Form.Group as={Col} md="4" controlId="validationCustom01" >
                    <FloatingLabel controlId="floatingInput" label="Product Product." className="mb-3" >
                        <Form.Control type="textarea" required placeholder="Product Product." onChange={(e) => setproductName(e.target.value)} />
                        <Form.Control.Feedback type="invalid">Enter valid product price.</Form.Control.Feedback>
                    </FloatingLabel>
                </Form.Group>
            </Row>
            <Row className="mb-3">
                <Form.Group as={Col} md="4" controlId="validationCustom01">
                    <FloatingLabel controlId="floatingInput" label="Product Price." className="mb-3">
                        <Form.Control required type="number" placeholder="Product Price." onChange={(e) => setPrice(e.target.value)} />
                        <Form.Control.Feedback type="invalid">Enter valid product price.</Form.Control.Feedback>
                    </FloatingLabel>
                </Form.Group>
            </Row>
            <Row className="mb-3">
                <Form.Group as={Col} md="4" controlId="validationCustom01" >
                    <FloatingLabel controlId="floatingInput" label="Product Stock." className="mb-3">
                        <Form.Control required type="number" placeholder="Product Stock" onChange={(e) => setStock(e.target.value)} />
                        <Form.Control.Feedback type="invalid">Enter valid product price.</Form.Control.Feedback>
                    </FloatingLabel>
                </Form.Group>
            </Row>
            <Row className="mb-3">
                <Form.Group as={Col} md="4" controlId="validationCustom01">
                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Control type="file" required accept="image/png, image/gif, image/jpeg" onChange={(e) => setImage(e.target.files[0])} />
                        <Form.Control.Feedback type="invalid">Choose valid file</Form.Control.Feedback>
                    </Form.Group>
                </Form.Group>
            </Row>
            <Button type="submit">Submit form</Button>
        </Form>
    )
}       