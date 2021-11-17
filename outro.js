const io = require('socket.io-client')
socket = io('http://localhost:9000/room')

socket.emit('listUsers')