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

// CEO data
exports.ceoUserGet = (event, data) => {
    global.io.emit(event, mapData(data))
}

// CEO data
exports.addProduct = (event, data) => {
    global.io.emit(event, mapData(data))
}
exports.updateProduct = (event, data) => {
    global.io.emit(event, mapData(data))
}
exports.removeProduct = (event, data) => {
    global.io.emit(event, mapData(data))
}

// exports.emitToSocketId = (socketId, eventName, data) => {
//     global.io.to(socketId).emit(eventName, data);
// };
