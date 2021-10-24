const express = require('express')
const routes = express.Router()

const searchManga = require('../src/controllers/searchManga')

routes.get('/searchManga', searchManga.indexManga)

module.exports = routes