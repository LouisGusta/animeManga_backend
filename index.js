const express = require('express')
const cors = require('cors')
const routes = require('./routes/routes')
const conn = require('./db/conn')

const port = 9000
const app = express()
const server = require("http").createServer(app);
const io = require("socket.io")(server);

conn() 

app.use(cors())
app.use(express.json())
app.use(routes)

app.use('/chat', routes)

server.listen(9000, (req, res) => {
    console.log(`Server running at: http://localhost:${port}`)

    io.of('/teste').on('connection', (socket) =>{
        console.log(socket)
    })

})
exports.io = io 