const express = require('express')
const cors = require('cors')
const routes = require('./routes/routes')
const conn = require('./db/conn')

const port = 9000
const app = express()
const server = require("http").createServer(app);
const io = require("socket.io")(server, {
    cors: {
        origin: "*",
        methods: ['GET', 'POST', 'HEAD']
    }
});

const main_controller_room = require('./src/controllers/main_controller_room/')

conn()

app.use(cors())
app.use(express.json())
app.use(routes)

server.listen(9000, (req, res) => {
    console.log(`Server running at: http://localhost:${port}`)

    io.of('/chat').on('connection', (socket) => {
        main_controller_room.indexChat(socket)
    })
    io.of('/room').on('connection', (socket) => {
        main_controller_room.indexRoom(socket)
    })
})