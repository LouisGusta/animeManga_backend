const express = require('express')
const axios = require('axios')
const crypto = require("crypto")

module.exports.indexChat = function (socket_io) {
    socket_io.on('msg', (data) => {
        socket_io.emit('return_msg', 'voce que é')
    })
}

roomActive = []
usersActive = []

module.exports.indexRoom = (socket_io) => {
    async function checkJoinChat(checkIdRoom, checkPasswordRoom) {
        roomActive.forEach(room => {
            if (room.idRoom == checkIdRoom) {
                if (room.passwordRoom == checkPasswordRoom) {
                    console.log('bem vindo mané')
                }
                else {
                    console.log('senha errada zé')
                }
            } else {
                console.log('não encontrei essa porra')
            }
        });
    }

    async function listUsersRoom() {

    }

    socket_io.on('listUsers', (data) => {
        console.log(usersActive)
    })

    socket_io.on('joinRoom', ({ idRoom, idUser, passwordRoom }) => {
        try {
            let validate = checkJoinChat(idRoom, passwordRoom)
            if (validate) {
                usersActive.find(x => x.idRoom === idRoom).participants.push(idUser)
                usersActive.find(x => x.idRoom === idRoom).participantsSocket.push(socket_io.id)
                socket_io.join(idRoom)
                return true
            } else {
                return false
            }
        } catch (e) {
            return "Ops! Parece que essa sala não existe mais."
        }
    })

    socket_io.on('createRoom', ({ nameRoom, passwordRoom, limitRoom, idUser }) => {
        let idRoom = crypto.randomBytes(3).toString("hex")
        while (roomActive.includes(idRoom)) {
            idRoom = crypto.randomBytes(3).toString("hex")
        }
        roomActive.push({ idRoom, nameRoom, passwordRoom, limitRoom })
        usersActive.push({ idRoom, participants: [idUser], participantsSocket: [socket_io.id]})

        socket_io.join(idRoom)
        socket_io.emit("returnRoom", { idRoom, idSocket: socket_io.id })
    })

    socket_io.on('leaveRoom', async ({ idRoom, idUser, idSocket }) => {
        const _user = usersActive.find(x=>x.idRoom===idRoom).participants.indexOf(idUser)
        const _socket = usersActive.find(x=>x.idRoom===idRoom).participantsSocket.indexOf(idSocket)

        if (_user > -1){
            usersActive.find(x=>x.idRoom===idRoom).participants.splice(_user, 1)
        } if (_socket > -1){
            usersActive.find(x=>x.idRoom===idRoom).participantsSocket.splice(_socket, 1)
        }

        await socket_io.in(idSocket).disconnectSockets(true)
    })

    socket_io.on("disconnect", () => {
        delete usersActive.find(x=>x.idSocket===socket_io.id)
        delete socket_io.adapter.rooms[socket_io.id]
        //socket_io.broadcast.emit("sayGoodBye");
    })
}