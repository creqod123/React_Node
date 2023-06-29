import axios from 'axios'

const email = localStorage.getItem("email")
var token = localStorage.getItem("token")
let paginat = []

export default function getItem(state = [], action) {
    const pagination = (pageLength) => {
        return new Promise(async (resolve) => {
            try {
                const a = await axios.post(process.env.REACT_APP_USER_URL, { email: email, pageLength: pageLength, pageNumber: pageLength },
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            token: token,
                        },
                    }
                )
                paginat = a.data.data.data
                paginat.push(a.data.data.totalPosts)
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
                pagination(pageLength)
                return state = paginat
            }
        default:
            {
                return state
                break;
            }
    }
}