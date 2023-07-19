import axios from "axios"

let token = localStorage.getItem("token")
let length = []

const cardItems = (state = length, action) => {

    if (action.type === "ADD_TO_CART" || action.type === "REMOVE_TO_CART") {
        console.log("token :- ", token === null)
    }
    switch (action.type) {
        case "ADD_TO_CART":
            const cartSaved = async () => {
                try {
                    axios.post(`${process.env.REACT_APP_USER_URL}/cartSaved`, [...state, { cardData: action.data }],
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
                    axios.post(`${process.env.REACT_APP_USER_URL}/cartSaved`, state,
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
            cartSaved2()

            return [
                ...state,
            ]
        default:
            return state
    }
}

export default cardItems