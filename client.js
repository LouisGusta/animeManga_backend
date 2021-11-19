const io = require('socket.io-client')
socket = io('http://localhost:9000/room')

//socket.emit('createRoom', {roomName: 'teste', roomPassword: 'senha123', roomLimit: 5})


socket.emit('joinRoom', { idRoom: 'd7e467', passwordRoom: '', idUser: 'Maicão' })


socket.on('returnRoom', (data) => {
    console.log(data)
})