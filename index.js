const express = require('express')
const cors = require('cors')
const routes = require('./routes/routes')
const conn = require('./db/conn')

const port = 9000
const app = express()

conn() 

app.use(cors())
app.use(express.json())
app.use(routes)

app.listen(9000, () => {
    console.log(`Server running at: http://localhost:${port}`)
})
