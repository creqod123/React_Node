import axios from "axios"

let token = localStorage.getItem("token")
let length = []

const cardItems = (state = length, action) => {

    switch (action.type) {
        case "ADD_TO_CART":
            const cartSaved = async () => {
                try {
                    const Data = []
                    const prop = [...state, { cardData: action.data }]
                    for (let i = 0; i < prop.length; i++) {
                        prop[i].cardData.quantity = 1
                        for (let j = i + 1; j < prop.length; j++) {
                            if (prop[i].cardData._id === prop[j].cardData._id) {
                                prop[i].cardData.quantity = prop[i].cardData.quantity + 1
                                prop.splice(j, 1)
                                j--
                            }
                        }
                        Data.push({ productId: prop[i].cardData._id, quantity: prop[i].cardData.quantity })
                    }

                    const response = fetch(`${process.env.REACT_APP_USER_URL}/cartSaved`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            token: token,
                        },
                        body: JSON.stringify({ data: Data }),
                    })
                }
                catch (e) {
                    console.log(e)
                }
            }

            cartSaved()
            return [
                ...state,
                { cardData: action.data }
            ]

        case "REMOVE_TO_CART":
            const check = action.data._id

            let del
            for (const property in state) {
                if (state[property].cardData._id == check) {
                    del = property
                    break
                }
                else {
                    del = null
                }
            }
            if (del != null) {
                state.splice(del, 1)
            }


            const cartSaved2 = async () => {
                try {

                    const prop = [...state]
                    const Data = []
                    for (let i = 0; i < prop.length; i++) {
                        prop[i].cardData.quantity = 1
                        for (let j = i + 1; j < prop.length; j++) {
                            if (prop[i].cardData._id === prop[j].cardData._id) {
                                prop[i].cardData.quantity = prop[i].cardData.quantity + 1
                                prop.splice(j, 1)
                                j--
                            }
                        }
                        Data.push({ productId: prop[i].cardData._id, quantity: prop[i].cardData.quantity })
                    }

                    const response = await fetch(`${process.env.REACT_APP_USER_URL}/cartSaved`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            token: token,
                        },
                        body: JSON.stringify({ data: Data }),
                    })
                }
                catch (e) {
                    console.log(e)
                }
            }

            cartSaved2()
            return [
                ...state,
            ]
        default:
            return state
    }
}

export default cardItems