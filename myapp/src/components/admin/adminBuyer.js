import './admin.css'
import { useEffect, useState } from 'react'
import Spinner from 'react-bootstrap/Spinner';

var Data = []
var email = localStorage.getItem("email")
var token = localStorage.getItem("token")

export default function Adminbuyer() {
    const [showTag, setShowTag] = useState(false);

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

    return (
        <div className='adminshow' >
            <table>
                <tr>
                    <th>No.</th>
                    <th>Email</th>
                    <th>productName</th>
                    <th>ProductPrice</th>
                    <th>Quantity</th>
                    <th>Fulllname</th>
                    <th>House No. and Name</th>
                    <th>Area</th>
                    <th>City</th>
                    <th>Pincode</th>
                </tr>

                {showTag ? Data.map((product, counter = 0) => {
                    counter += 1
                    const { _id, quantity, productId, userId, price, fullName, house, area, city, pincode } = product
                    const { ids, productName } = productId
                    const { email } = userId
                    console.log("adta :- ", fullName)
                    return (
                        <tr>
                            <td>{counter}</td>
                            <td>{email.slice(0, -10)}</td>
                            <td>{productName}</td>
                            <td>{price}</td>
                            <td>{quantity}</td>
                            <td>{fullName}</td>
                            <td>{house}</td>
                            <td>{area}</td>
                            <td>{city}</td>
                            <td>{pincode}</td>
                        </tr>
                    )
                }) : <BorderExample />}
            </table>
        </div>
    )
}
