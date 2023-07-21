import axios from "axios"

let token = localStorage.getItem("token")
let length = []

const cardItems = (state = length, action) => {

    switch (action.type) {
        case "ADD_TO_CART":
            const cartSaved = async () => {
                try {
                    const response = fetch(`${process.env.REACT_APP_USER_URL}/cartSaved`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            token: token,
                        },
                        body: JSON.stringify({ data: [...state, { cardData: action.data }] }),
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

                    const response = await fetch(`${process.env.REACT_APP_USER_URL}/cartSaved`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            token: token,
                        },
                        body: JSON.stringify({ data: state }),
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