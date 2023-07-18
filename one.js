
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