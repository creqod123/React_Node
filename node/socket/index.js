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
        console.log('user connected - ' + socket.id)
    })
}

exports.try = (event, data) => {
    global.io.emit(event, mapData(data))
}

// exports.emitToSocketId = (socketId, eventName, data) => {
//     global.io.to(socketId).emit(eventName, data);
// };
