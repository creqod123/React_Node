import './admin.css'
import { useEffect, useState } from 'react'
import Spinner from 'react-bootstrap/Spinner';

var Data = []
var email = localStorage.getItem("email")
var token = localStorage.getItem("token")
let Address

export default function Adminbuyer() {
    const [showTag, setShowTag] = useState(false);
    const [address, setAddress] = useState(false);

    const SubFunction = () => {
        return new Promise(async (resolve) => {
            const url = process.env.REACT_APP_ADMIN_URL + "/detail"
            try {
                var response = await fetch(url, {
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
            resolve();
        }, []);
    }

    SubFunction();
    useEffect(() => {
        const timeout = setTimeout(() => {
            setShowTag(true);
        }, 1000);
    }, []);

    const BorderExample = () => {

        return <Spinner animation="border" className='helloworld' variant="primary" />;
    }

    const checkAddress = (e) => {
        Address = e.target.value
        console.log("adasd :- ",{Address})
        setAddress(true)
    }

    return (
        <div className='adminshow' >
            <table>
                <tr>
                    <th>No.</th>
                    <th>Email</th>
                    <th>productName</th>
                    <th>ProductPrice</th>
                    <th>Quantity</th>
                    <th>Address</th>
                </tr>

                {showTag ? Data.map((product, counter = 0) => {
                    counter += 1
                    const { _id, quantity, productId, userId, price } = product
                    const { ids, productName } = productId
                    const { email } = userId
                    return (
                        <tr>
                            <td>{counter}</td>
                            <td>{email.slice(0, -10)}</td>
                            <td>{productName}</td>
                            <td>{price}</td>
                            <td>{quantity}</td>
                            <td><button value={product.addressId._id} onClick={checkAddress}>address</button></td>
                        </tr>
                    )
                }) : <BorderExample />}
            </table>


            {address ?
                <table>
                    <tr>
                        <th>Full Name</th>
                        <th>House NO and Name</th>
                        <th>Area</th>
                        <th>City</th>
                        <th>Pincode</th>
                    </tr>

                    <tr>
                        <td>{Address.fullName}</td>
                        <td>{Address.house}</td>
                        <td>{Address.area}</td>
                        <td>{Address.city}</td>
                        <td>{Address.pincode}</td>
                    </tr>
                </table>
                : <></>}



        </div>
    )
}
