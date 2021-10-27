const express = require('express')
const routes = express.Router()

const searchManga = require('../src/controllers/searchManga')
const returnMangaInfo = require('../src/controllers/returnMangaInfo')

routes.get('/searchManga', searchManga.indexManga)
routes.get('/returnMangaInfo', returnMangaInfo.returnInfo)

module.exports = routes