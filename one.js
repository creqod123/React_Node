// ============== React js socket ==============

import { io } from "socket.io-client";

useEffect(() => {
    if (props.socket) {
        props.socket.on('hello', res => {
            console.log('Check res :- ', res);
        })
    }
}, [])


let socket = null;
const initSocket = (token) => {
    socket = io(`localhost:4200?token=${token}`, { transports: ['websocket'] });

    socket.on('hello', (res) => {
        console.log("Check all responses :- ", res);
    })
}

const token = localStorage.getItem('token');
if (token) {
    initSocket(token);
}
