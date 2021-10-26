const express = require('express');
const MFA = require('mangadex-full-api');
const axios = require('axios')
const translatte = require('translatte')

module.exports = {
    async indexManga(req, res) {

        async function requireCover(coverId) {
            return await axios({
                url: `https://api.mangadex.org/cover/${coverId}`,
                method: 'GET'
            })
        }

        async function requireChapter(mangaId){
            return await axios({
                url: `https://api.mangadex.org/manga/${mangaId}/feed`,
                method: 'GET',
                params:{
                    limit: 500,
                    translatedLanguage: ['pt-br']
                }
            })
        }

        await MFA.login('DarksGol', 'R@ul1605', './md_cache/')
        const mangaList = []
        // Aqui tem o ID do manga.
        // Aqui tem a capa do manga.
        // Aqui tem a descrição/sinopse do manga.
        // Aqui tem o genero/tipo do manga.
        const teste = await MFA.Manga.get
        const manga = await MFA.Manga.search(req.headers.querysearch)
        const chapter = await manga
        var itemsProcessed = 0;
        manga.forEach(async (elem, index, array) => {
            const Cover = await requireCover(elem.mainCover.id)
            const Chapters = await requireChapter(elem.id)
            const Tags = []
            mangaList.push({
                status: elem.status,
                title: elem.title,
                idManga: elem.id,
                qtdChapters: Chapters.data.data.length,
                urlCover: `https://uploads.mangadex.org//covers/${elem.id}/${Cover.data.data.attributes.fileName}`,
                tags: Tags,
            })

            itemsProcessed++
            if (itemsProcessed === array.length) {
                callback()
            }
        })
        
        function callback() {
            res.json(mangaList)
        }
    },
}

