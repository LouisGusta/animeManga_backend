const express = require('express')
const axios = require('axios')
const crypto = require("crypto")

module.exports.indexChat = function (socket_io) {
    socket_io.on('msg', (data) => {
        socket_io.emit('return_msg', 'voce que é')
    })
}

module.exports.indexRoom = (socket_io) => {
    roomActive = []
    console.log(roomActive)
    socket_io.on('createRoom', (data) => {
        let idRoom = crypto.randomBytes(3).toString("hex")
        while (roomActive.includes(idRoom)) {
            idRoom = crypto.randomBytes(3).toString("hex")
        }
        roomActive.push(idRoom)
        socket_io.join(idRoom)
        socket_io.emit("returnRoom", "#" + idRoom)
    })

    socket_io.on("join", (data) => { socket_io.join(data) })

    socket_io.on("disconnecting", () => {
        console.log(socket_io.adapter.rooms)
        // if (socket_io.sockets.adapter.rooms.length == 0) {
        //     roomActive.pop(socket_io.rooms[1])
        // }
    })
    socket_io.on("disconnect", () => {
        socket_io.broadcast.emit("sayGoodBye");
    })
}