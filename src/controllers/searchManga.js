const express = require('express');
const MFA = require('mangadex-full-api');
const axios = require('axios')
const translatte = require('translatte')


module.exports = {

    async indexManga(req, res) {

        async function requireCover(coverId) {
            return await axios.get(`https://api.mangadex.org/cover/${coverId}`)
        }

        await MFA.login('DarksGol', 'R@ul1605', './md_cache/')
        const mangaList = []
        // Aqui tem o ID do manga.
        // Aqui tem a capa do manga.
        // Aqui tem a descrição/sinopse do manga.
        // Aqui tem o genero/tipo do manga.
        const manga = await MFA.Manga.search(req.headers.querysearch)
        var itemsProcessed = 0;
        manga.forEach(async (elem, index, array) => {
            const Cover = await requireCover(elem.mainCover.id)
            const Tags = []

            elem.tags.forEach((item, index) => {
                Tags.push(item.localizedName.en)
            })

            mangaList.push({
                status: elem.status,
                title: elem.title,
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

