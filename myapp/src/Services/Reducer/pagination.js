import axios from 'axios'

const email = localStorage.getItem("email")
var token = localStorage.getItem("token")
let paginat = []
let search = []

export default function getItem(state = [], action) {
    const pagination = (pageLength) => {
        return new Promise(async (resolve) => {
            const url = process.env.REACT_APP_USER_URL
            try {
                const a = await axios.post(url, { email: email, pageLength: pageLength, pageNumber: pageLength },
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

    const searching = async (message) => {
        return new Promise(async (resolve) => {
            try {
                const a = await axios.post(`${process.env.REACT_APP_USER_URL}/search`, { message: message },
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            token: token,
                        },
                    }
                )
                console.log("Node :- ", a)
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
        case "SEARCH":
            {
                searching(action.data)
                return state = paginat
            }
        default:
            {
                return state
                break;
            }
    }
}