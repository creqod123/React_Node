=================== set localstorage ===================

windows.localStorage.setItem("token",token)
windows.localStorage.removeItem("token",token)
localStorage.setItem("data", JSON.stringify(data))

=================== get localstorage ===================

localStorage.getItem("token",token)
const storedNames = JSON.parse(localStorage.getItem("names"));

========================================================


windows.location.href = "/"
window.location.reload();


const myTimeout = setTimeout({myGreeting}, 1000);
const timer = setTimeout(() => {
    console.log('This will run after 1 second!')
  }, 1000);

function myGreeting() {
}

=================== get socket data from react ===================

useEffect(() => {
    if (props.socket) {
        props.socket.on('hello', res => {
            console.log('Check res :- ', res);
        })
    }
}, [])

=================== create and get socket data in nodejs  ===================

exports.try = (event, data) => {                  //Create socket
    global.io.emit(event, mapData(data))
}

const socket = require('../socket/index');
const a = socket.try(event, data);
==================================================================================================================================================