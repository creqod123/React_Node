import axios from 'axios'

const email = localStorage.getItem("email")
var token = localStorage.getItem("token")
let paginat = []
let search = []
let check

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
            console.log("second")
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
                check = a.data.data.length
                search = a.data.data
            }
            catch (e) {
                console.log(e)
            }
            resolve();
            console.log("First")
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
                if (check == 0) {
                    return state = paginat
                }
                else {
                    return state = search
                }
            }
        default:
            {
                return state
                break;
            }
    }
}