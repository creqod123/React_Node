import React, { useState } from 'react';
import './l-s.css'
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

function Check() {

    const [validated, setValidated] = useState(false);
    const loginHandleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        setValidated(true);
    };

    // // ============================================================= Login Form =============================================================

    // const type = localStorage.getItem("type")
    // const [email, setEmail] = useState('')
    // const [password, setPassword] = useState('')
    // const [checkEmail, setCheckEmail] = useState(false)
    // const [checkPassword, setCheckPassword] = useState(false)

    // const login = async (e) => {
    //     e.preventDefault()
    //     try {
    //         const res = await axios.post(process.env.REACT_APP_LOGIN_URL, {
    //             email, password
    //         })
    //         if (res.data.message === "Enter vaild email") {
    //             setCheckEmail(true)
    //             setCheckPassword(false)
    //         }
    //         else if (res.data.message === "Password_not_same") {
    //             setCheckEmail(false)
    //             setCheckPassword(true)
    //         }
    //         else {
    //             localStorage.setItem("email", res.data.email)
    //             localStorage.setItem("token", res.data.token)
    //             localStorage.setItem("type", res.data.type)
    //             if (res.data.type == "seller") {
    //                 window.location.href = "/admin/control"
    //             }
    //             else if (res.data.type == "user") {
    //                 window.location.href = "/user/shop"
    //             }
    //             else {
    //                 window.location.href = "/ceo/user"
    //             }
    //         }
    //     }
    //     catch (e) {
    //         console.log(e)
    //     }
    // }



    // // ============================================================= Register Form =============================================================


    // const [tel, setTel] = useState('')

    // const [emailRegister, setEmailRegister] = useState('')
    // const [passwordRegister, setPasswordRegister] = useState('')
    // const [typeRegister, setTypeRegister] = useState('')
    // const [checkEmailRegister, setCheckEmailRegister] = useState(false)
    // const [CheckPasswordRegister, setCheckPasswordRegister] = useState(false)

    // const [CheckTel, setCheckTel] = useState(false)
    // const [CheckType, setCheckType] = useState(false)
    // const [conPassword, setConpassword] = useState('')



    // // const [CheckConPassword, setCheckConPassword] = useState(false)



    // const pass = { Enter_Password: 'Enter Password', Password_not_same: 'Password not same', Password_Length: 'Password Length' }

    // const register = async (e) => {
    //     e.preventDefault()
    //     let res
    //     try {
    //         res = await axios.post(process.env.REACT_APP_REGISTER_URL, {
    //             email, password, conPassword, tel, type
    //         })
    //         if (res.data.message === "Enter vaild email" || res.data.message === "email already exist") {
    //             setCheckEmail(true)
    //             setCheckPassword(false)
    //             setCheckTel(false)
    //             setCheckType(false)
    //         }
    //         else if (res.data.message === "Password_not_same") {
    //             setCheckEmail(false)
    //             setCheckPassword(true)
    //             setCheckTel(false)
    //             setCheckType(false)
    //         }
    //         else if (res.data.message === "check number") {
    //             setCheckEmail(false)
    //             setCheckPassword(false)
    //             setCheckTel(true)
    //             setCheckType(false)
    //         }
    //         else if (res.data.message === "type") {
    //             setCheckEmail(false)
    //             setCheckPassword(false)
    //             setCheckTel(false)
    //             setCheckType(true)
    //         }
    //         else if (res.data.message === "Succesfull") {
    //             localStorage.setItem("email", res.data.email)
    //             localStorage.setItem("type", res.data.type)
    //             document.getElementById('l-s-check').innerHTML = "Signout"
    //             if (res.data.type == "seller") {
    //                 window.location.href = "/admin/control"
    //             }
    //             else {
    //                 window.location.href = "/user/shop"
    //             }
    //         }
    //     }
    //     catch (e) {
    //         console.log(e)
    //     }
    // }







    return (
        <div className='ls-Form'>
            <div class="section">
                <div class="container">
                    <div class="row full-height justify-content-center">
                        <div class="col-12 text-center align-self-center py-5">
                            <div class="section pb-5 pt-5 pt-sm-2 text-center">
                                <h6 class="mb-0 pb-3"><span>Log In </span><span>Sign Up</span></h6>
                                <input class="checkbox" type="checkbox" id="reg-log" name="reg-log" />
                                <label for="reg-log"></label>
                                <div class="card-3d-wrap mx-auto">
                                    <div class="card-3d-wrapper">
                                        <div class="card-front">
                                            <div class="center-wrap">
                                                <div class="section text-center">
                                                    <Form noValidate validated={validated} onSubmit={loginHandleSubmit}>
                                                        <Row className="mb-3">
                                                            <Form.Group as={Col} md="6" controlId="validationCustom03">
                                                                <Form.Control type="text" placeholder="Enter Email" required id='userName' />
                                                                <Form.Control.Feedback type="invalid">Please provide a valid city.</Form.Control.Feedback>
                                                            </Form.Group>
                                                        </Row>
                                                        <Row className="mb-3">
                                                            <Form.Group as={Col} md="6" controlId="validationCustom03">
                                                                <Form.Control type="text" placeholder="Enter Password" required id='password' />
                                                                <Form.Control.Feedback type="invalid">Please provide a valid city.</Form.Control.Feedback>
                                                            </Form.Group>
                                                        </Row>
                                                        <Button type="submit">Submit form</Button>
                                                        <p class="mb-0 mt-4 text-center"><a href="#0" class="link">Forgot your password?</a></p>
                                                    </Form>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="card-back">
                                            <div class="center-wrap">
                                                <div class="section text-center">
                                                    <Form noValidate validated={validated} onSubmit={loginHandleSubmit}>
                                                        <Row className="mb-3">
                                                            <Form.Group as={Col} md="6" controlId="validationCustom03">
                                                                <Form.Control type="text" placeholder="Enter Email" required id='userName' />
                                                                <Form.Control.Feedback type="invalid">Please provide a valid Email.</Form.Control.Feedback>
                                                            </Form.Group>
                                                        </Row>
                                                        <Row className="mb-3">
                                                            <Form.Group as={Col} md="6" controlId="validationCustom03">
                                                                <Form.Control type="text" placeholder="Enter Password" required id='password' />
                                                                <Form.Control.Feedback type="invalid">Please provide a valid Password.</Form.Control.Feedback>
                                                            </Form.Group>
                                                        </Row>
                                                        <Row className="mb-3">
                                                            <Form.Group as={Col} md="6" controlId="validationCustom03">
                                                                <Form.Control type="text" placeholder="Enter Password" required id='password' />
                                                                <Form.Control.Feedback type="invalid">Please provide a valid Password.</Form.Control.Feedback>
                                                            </Form.Group>
                                                        </Row>
                                                        <Row className="mb-3">
                                                            <Form.Group as={Col} md="6" controlId="validationCustom03">
                                                                <Form.Control type="number" placeholder="Enter Number" required id='password' />
                                                                <Form.Control.Feedback type="invalid">Please provide a valid Number.</Form.Control.Feedback>
                                                            </Form.Group>
                                                        </Row>
                                                        <Row className="mb-3">
                                                            <Form.Group as={Col} md="6" controlId="validationCustom03">
                                                                <Form.Check type="radio" name='check' label="User" aria-label="radio 1" className='checkRadio' required />
                                                                <Form.Check type="radio" name='check' label="Seller" aria-label="radio 1" className='checkRadio' required />
                                                                <Form.Control.Feedback type="invalid">Please Check any one.</Form.Control.Feedback>
                                                            </Form.Group>
                                                        </Row>
                                                        <Button type="submit">Submit form</Button>
                                                        <p class="mb-0 mt-4 text-center"><a href="#0" class="link">Forgot your password?</a></p>
                                                    </Form>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Check;