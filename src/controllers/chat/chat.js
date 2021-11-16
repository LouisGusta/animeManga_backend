const express = require('express')
const axios = require('axios')
const socketIO = require('../../../index')

module.exports = {
    async room(req, res){
        socketIO.io.of("/chat").on('connection', (socket) =>{
            console.log(socket)
        })
    }
}