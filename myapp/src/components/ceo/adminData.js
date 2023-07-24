import axios from 'axios'
import './ceo.css'
import { useState, useEffect } from 'react'
import Spinner from 'react-bootstrap/Spinner';
import { MDBBtn, MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import { MDBInputGroup, MDBInput, MDBIcon } from 'mdb-react-ui-kit';

let data = []
let adminData = []
const token = localStorage.getItem("token")
let searchData = []

export default function AdminData() {

    const [isClicked, setIsClicked] = useState(true);
    const [showTag, setShowTag] = useState(false);
    const [searchValue, setSearchValue] = useState('')
    const [showSearchValue, setshowSearchValue] = useState(false)

    const SubFunction = async () => {
        try {
            const a = await axios.get(process.env.REACT_APP_CEO_URL,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        token: token,
                    },
                })
            adminData = a.data.data.seller
            const timer = setTimeout(() => {
                setShowTag(true);
            }, 1000);
        }
        catch (e) {
            console.log(e)
        }
    }
    useEffect(() => {
        SubFunction();
    }, [])

    const checkAdminData = async (e) => {
        const id = e.target.value;
        try {
            const a = await axios.post(`${process.env.REACT_APP_CEO_URL}/admin/detail`, { id: id },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        token: token,
                    },
                })
            data = a.data.data
        }
        catch (e) {
            console.log(e)
        }
        setIsClicked(false);
    }

    const adminProdctRemove = async (e) => {
        const id = e.target.value;
        try {
            axios.post(`${process.env.REACT_APP_CEO_URL}/admin/productremove`, { id: id },
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

        setShowTag(false)
    }

    const handleClick = () => {
        setIsClicked(true);
    };

    const BorderExample = () => {
        return <Spinner animation="border" className='helloworld' variant="primary" />;
    }

    const searchFun = () => {
        const SubFunction = async () => {
            searchData = []
            try {
                const checkEmail = `${searchValue}@gmail.com`
                const a = await fetch(`${process.env.REACT_APP_CEO_URL}/search`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        token: token,
                    },
                    body: JSON.stringify({ email: checkEmail }),
                })

                const data = await a.json()
                searchData = []
                searchData.push(data.data)

                if (searchData[0] === null) {
                    setshowSearchValue(false)
                    setShowTag(true)
                }
                else {
                    setShowTag(false)
                    const timeout2 = setTimeout(() => {
                        setshowSearchValue(true)
                    }, 3000);
                }
            }
            catch (e) {
                console.log(e)
            }
        }

        SubFunction();
    }

    return (
        <div className='adminshow' >
            <MDBInputGroup id='ceoSearch'>
                <MDBInput label='Search' onChange={(e) => setSearchValue(e.target.value)} value={searchValue} />
                <MDBBtn rippleColor='dark' onClick={searchFun}>
                    <MDBIcon type='submit' icon='search' onClick={searchFun} />
                </MDBBtn>
            </MDBInputGroup>

            {
                isClicked ? <></> :

                    <MDBTable align='middle'>
                        <MDBTableHead>
                            <tr>
                                <th scope='col'>No. </th>
                                <th scope='col'>product Name</th>
                                <th scope='col'>price</th>
                                <th scope='col'>Delete</th>
                            </tr>
                        </MDBTableHead>
                        <MDBTableBody>
                            {
                                data.map((admin, counter = 0) => {
                                    counter += 1
                                    const { _id, productName, price } = admin
                                    console.log("Check data map :- ", admin)
                                    return (
                                        <tr>
                                            <td>{counter}</td>
                                            <td>{productName}</td>
                                            <td>{price}</td>
                                            <td><button value={_id} onClick={adminProdctRemove} >Delete</button></td>
                                        </tr>
                                    )
                                })
                            }
                        </MDBTableBody>
                        <MDBTableBody>
                            <MDBBtn style={{ position: "absolute", left: "50%" }} onClick={handleClick}>Close</MDBBtn>
                        </MDBTableBody>
                    </MDBTable>

            }
            {
                isClicked
                    ?
                    <MDBTable align='middle'>
                        <MDBTableHead>
                            <tr>
                                <th scope='col'>No.</th>
                                <th scope='col'>Username</th>
                                <th scope='col'>Mobile No.</th>
                                <th scope='col'>Product</th>
                                <th scope='col'>Delete</th>
                            </tr>
                        </MDBTableHead>
                        <MDBTableBody>
                            {
                                showSearchValue
                                    ? showSearchValue ?
                                        searchData.map((admin, counter = 0) => {
                                            counter += 1
                                            const { email, tel, _id } = admin
                                            return (
                                                <tr>
                                                    <td>{counter}</td>
                                                    <td>{email.slice(0, -10)}</td>
                                                    <td>{tel}</td>
                                                    <td className="userdetail">
                                                        <MDBBtn color='link' rounded size='sm' value={_id} onClick={checkAdminData}>Detail</MDBBtn>
                                                    </td>
                                                    <td className="userdetail">
                                                        <MDBBtn color='link' rounded size='sm' value={_id} onClick={adminProdctRemove}>Remove</MDBBtn>
                                                    </td>
                                                </tr>
                                            )
                                        }) : <BorderExample />
                                    : showTag ? adminData.map((admin, counter = 0) => {
                                        counter += 1
                                        const { email, tel, _id } = admin
                                        return (
                                            <tr>
                                                <td>{counter}</td>
                                                <td>{email.slice(0, -10)}</td>
                                                <td>{tel}</td>
                                                <td className="userdetail">
                                                    <MDBBtn color='link' rounded size='sm' value={_id} onClick={checkAdminData}>Detail</MDBBtn>
                                                </td>
                                                <td className="userdetail">
                                                    <MDBBtn color='link' rounded size='sm' value={_id} onClick={adminProdctRemove}>Remove`  </MDBBtn>
                                                </td>
                                            </tr>
                                        )
                                    }) : <BorderExample />
                            }
                        </MDBTableBody>
                    </MDBTable>
                    :
                    <></>
            }
        </div>
    )
}