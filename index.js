const express = require('express')
const cors = require('cors')
const routes = require('./routes/routes')

const port = 9000
const app = express()

app.use(express.json())
app.use(routes)
app.listen(process.env.port||port, () => {
    console.log(`Server running at: http://localhost:${port}`)
})