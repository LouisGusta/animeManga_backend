const express = require('express');
const axios = require('axios')

module.exports = {
    async indexManga(req, res) {
        const mangaList = []
        var itemsProcessed = 0;
        
        graphQuery = `
        query ($page: Int, $perPage: Int, $name: String) {
            Page (page: $page, perPage: $perPage) {
                pageInfo {
                    total
                    currentPage
                    lastPage
                    hasNextPage
                    perPage
                }
            media (search: $name, format:MANGA) {
                id
                status
                format
                bannerImage
                coverImage{
                    extraLarge
                }
                genres
                isAdult 
                averageScore
                title {
                    romaji
                    english
                    native
                }
            }
        }
        }
        `
        //async function returnAllManga(mangaName){
            await axios({
                url: 'https://graphql.anilist.co',
                method: "POST",
                data: { 
                    query: graphQuery,
                    variables: {
                        name: req.headers.querysearch
                    }
                }
            }).then((ok)=>{
                res.json(ok.data.data.Page.media)
            })
        //} 

        manga = []
        
        manga.forEach(async (elem, index, array) => {
            const Cover = await requireCover(elem.mainCover.id)
            const Chapters = await requireChapter(elem.id)
            const Tags = []

            elem.tags.forEach((item, index) => {
                Tags.push(item.localizedName.en)
            })

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
            res.json(graphQuery)
        }
    },
}

