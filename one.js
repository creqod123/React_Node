// Create modal with array for user cart
// Get and use req.user from token to api
// Change admin and seller response in nodejs

const cartSaved = async () => {
    try {
        axios.post(`${process.env.REACT_APP_USER_URL}/cartSaved`, prop,
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
}


useEffect(() => {
    cartSaved()
}, [])