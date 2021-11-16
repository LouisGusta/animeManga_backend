const io = require('socket.io-client')
socket = io('http://localhost:9000/room')

socket.emit('createRoom')
socket.on('returnRoom', (data) => {
    console.log(data)
})