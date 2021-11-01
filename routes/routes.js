const express = require('express')
const routes = express.Router()

// Define routes - Manga
const searchManga = require('../src/controllers/manga/searchManga')
const returnManga = require('../src/controllers/manga/returnManga')

routes.get('/manga/searchManga', searchManga.indexManga)
routes.get('/manga/resume', returnManga.returnInfo)
routes.get('/manga/characters', returnManga.returnCharacter)

// Define routes - Anime

const searchAnime = require('../src/controllers/anime/searchAnime')
//const returnAnime = require('../src/controllers/anime/returnAnime')

routes.get('/anime/searchAnime', searchAnime.indexAnime)

module.exports = routes