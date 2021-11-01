const express = require('express')
const routes = express.Router()

// Define route test
routes.get('/', (req, res) => res.json({"status": "API Running"}))

// Define routes - Manga
const searchManga = require('../src/controllers/manga/search')
const returnManga = require('../src/controllers/manga/resume')

routes.get('/manga/search', searchManga.indexManga)
routes.get('/manga/resume', returnManga.returnInfo)
routes.get('/manga/characters', returnManga.returnCharacter)

// Define routes - Anime

const searchAnime = require('../src/controllers/anime/search')
//const returnAnime = require('../src/controllers/anime/returnAnime')

routes.get('/anime/search', searchAnime.indexAnime)

module.exports = routes