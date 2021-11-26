const express = require('express')
const routes = express.Router()

// Define route test
routes.get('/', (req, res) => res.json({"status": "API Running"}))

// Define route Login / Register
const returnAccess = require('../src/controllers/access/access')

routes.post('/login', returnAccess.login)
routes.post('/register', returnAccess.register)

// Define route - Profile
const returnProfile = require('../src/controllers/perfil/perfil')

routes.get('/profile', returnProfile.indexProfile)

// Define routes - Manga
const searchManga = require('../src/controllers/manga/search')
const returnManga = require('../src/controllers/manga/resume')

const temp = require('../src/controllers/manga/index')

routes.get('/manga/search', searchManga.indexManga)
routes.get('/manga/resume', returnManga.returnInfo)
routes.get('/manga/characters', returnManga.returnCharacter)
routes.get('/manga/staff', returnManga.returnStaff)
routes.get('/manga/page', temp.indexManga)

// Define routes - Anime
const searchAnime = require('../src/controllers/anime/search')
//const returnAnime = require('../src/controllers/anime/returnAnime')

routes.get('/anime/search', searchAnime.indexAnime)

module.exports = routes