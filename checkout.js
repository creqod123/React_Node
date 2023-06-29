//  ================================== Checkout product ===================================


const hello1 = async () => {

    const id = localStorage.getItem("id")
    const url = process.env.REACT_APP_USER_URL + "/checkout"
    let formdata = new FormData()

    let swap
    let counter = []
    for (let i = 0; i < prop.length; i++) {
        prop[i].cardData.quantity = 1
        for (var j = i + 1; j < prop.length; j++) {
            if (prop[i].cardData._id === prop[j].cardData._id) {
                counter.push(prop[i])
                prop[i].cardData.quantity = prop[i].cardData.quantity + 1
                prop.splice(j, 1)
                j--
            }
        }
    }
    for (let k = 0; k < prop.length; k++) {
        for (let l = k; l < prop.length; l++) {
            if (prop[k].cardData._id >= prop[l].cardData._id) {
                swap = prop[l]
                prop[l] = prop[k]
                prop[k] = swap
            }
        }
    }
    formdata = [prop, email]
    try {
        await axios.post(url, formdata,
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
    counter.map((e) => prop.push(e))
    totalcost = 0
    total = 0
    window.location.href = '/user/shop'
}