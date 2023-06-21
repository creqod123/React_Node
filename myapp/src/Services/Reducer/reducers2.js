import axios from 'axios'

const email = localStorage.getItem("email")
var token = localStorage.getItem("token")
let data = []
export default function getItem(state = [], action) {

    const abc = () => {
        return new Promise(async (resolve) => {
            const url = process.env.REACT_APP_USER_URL
            try {
                const a = await axios.post(url, { email: email },
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            token: token,
                        },
                    }
                )
                data = a.data.data
            }
            catch (e) {
                console.log(e)
            }
            resolve();
        });
    }

    switch (action.type) {
        case "GET_ALL_ITEMS":
            {
                abc()
                return state = data 
                break;
            }
        default:
            {
                return state
                break;
            }
    }
}