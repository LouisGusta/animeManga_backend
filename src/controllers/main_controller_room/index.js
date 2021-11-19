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
let _id, _lenUsers


module.exports.indexRoom = (socket_io) => {
    async function checkJoinChat(checkIdRoom, checkPasswordRoom) {
        roomActive.forEach(room => {
            if (room.idRoom == checkIdRoom) {
                if (room.passwordRoom == checkPasswordRoom) {
                    return
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
        console.log(`usersActive`)
        console.log(usersActive)
        //console.log(`roomActive`)
        console.log(roomActive)
        //console.log(socket_io.adapter.rooms)
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
        usersActive.push({ idRoom, participants: [{ idUser, idSocket: socket_io.id }] })

        socket_io.join(idRoom)
        socket_io.emit("returnRoom", { idRoom, idSocket: socket_io.id })
    })

    socket_io.on('leaveRoom', async ({ idRoom, idUser, idSocket }) => {
        const _iUser = usersActive.find(x => x.idRoom === idRoom).participants.indexOf(idUser)
        const _iSocket = usersActive.find(x => x.idRoom === idRoom).participantsSocket.indexOf(idSocket)

        if (_iUser > -1) {
            usersActive.find(x => x.idRoom === idRoom).participants.splice(_iUser, 1)
        }

        await socket_io.in(idSocket).disconnectSockets(true)
    })

    socket_io.on("disconnect", () => {
        const _iUsersActive = usersActive.map((x, i) => (x.participants.find(y => y.idSocket === socket_io.id) ? [i, _id = x.idRoom, _lenUsers = x.participants.length] : '')).find(y => y != '')

        const _iRoomActive = roomActive.map((x, i) => x.idRoom === _id ? i : '')

        const _iUser = usersActive.find(x => x.idRoom === _id).participants.map((y, i) => y.idSocket === socket_io.id ? i : '').find(z => z != '')

        if (_iUser > -1) {
            usersActive.find(x => x.idRoom === idRoom).participants.splice(_iUser, 1)
        }

        if (_iUsersActive[0] > -1 && _lenUsers === 1 && _iRoomActive > -1) {
            usersActive.splice(_iUsersActive[0], 1)
            roomActive.splice(_iRoomActive, 1)
            delete socket_io.adapter.rooms[socket_io.id]
        }
    })
}