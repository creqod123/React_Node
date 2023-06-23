import axios from 'axios'
import Home from '../../components/users/home'

const email = localStorage.getItem("email")
var token = localStorage.getItem("token")
let data = []

export default function getItem(state = [], action) {

    const abc = (pageLength) => {
        return new Promise(async (resolve) => {
            const url = process.env.REACT_APP_USER_URL
            try {
                const a = await axios.post(url, { email: email, pageLength: pageLength },
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
        case "PAGINATION":
            {
                const pageLength = action.data
                abc(pageLength)
                return state = data
            }
        default:
            {
                return state
                break;
            }
    }
}