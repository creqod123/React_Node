const mapData = (data, message = '') => {
    return {
        success: true,
        code: 200,
        message,
        data,
        error: null
    }
}

exports.init = () => {
    global.io.on('connection', (socket) => {
        console.log("Token :- ", socket.handshake.query.token)
        console.log('user connected - ' + socket.id)
    })
}

exports.adminDataGet = (event, data) => {
    global.io.emit(event, mapData(data))
}

exports.ceoUserGet = (event, data) => {
    global.io.emit(event, mapData(data))
}

exports.ceoAdminGet = (event, data) => {
    global.io.emit(event, mapData(data))
}

exports.userDataGet = (event, data) => {
    global.io.emit(event, mapData(data))
}

// exports.emitToSocketId = (socketId, eventName, data) => {
//     global.io.to(socketId).emit(eventName, data);
// };
