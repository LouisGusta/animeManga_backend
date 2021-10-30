const express = require('express')
const routes = express.Router()

const searchManga = require('../src/controllers/searchManga')
const returnMangaInfo = require('../src/controllers/returnMangaInfo')

routes.get('/searchManga', searchManga.indexManga)
routes.get('/manga/resume', returnMangaInfo.returnInfo)
routes.get('/manga/characters', returnMangaInfo.returnCharacter)

module.exports = routes