import axios from "axios"
import { useState } from "react"
import './admin.css'


export default function Admincontrol() {

    const [productName, setproductName] = useState('')
    const [price, setPrice] = useState('')
    const [image, setImage] = useState('')
    const [stock, setStock] = useState('')
    const email = localStorage.getItem("email")

    const productAdd = async (e) => {
        const formData = new FormData();
        formData.append('productName', productName);
        formData.append('price', price);
        formData.append('image', image);
        formData.append('email', email)
        formData.append('stock', stock)
        try {
            await axios.post(`${process.env.REACT_APP_ADMIN_URL}/add`, formData)
        }
        catch (e) {
            console.log(e)
        }
    }

    return (
        <div className="admincontrol">
            <form className="product-add">
                <label>
                    Product name :-
                </label>
                <input type="text" placeholder="Product Name" onChange={(e) => setproductName(e.target.value)} name="productName" />
                <label>
                    Product Price :-
                </label>
                <input type="text" placeholder="Product Price" onChange={(e) => setPrice(e.target.value)} name="price" />
                <label>
                    <input type='file' accept="image/png, image/gif, image/jpeg" onChange={(e) => setImage(e.target.files[0])} name="image" />
                </label>
                Stock :-
                <label>
                    <input type='number' onChange={(e) => setStock(e.target.value)} name="stock" />
                </label>
                <label id='submit'>
                    <input type='submit' onClick={productAdd} />
                </label>
            </form>
        </div>
    )
}   