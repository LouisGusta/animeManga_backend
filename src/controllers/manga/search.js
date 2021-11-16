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
            media (sort:SCORE_DESC, search: $name, format:MANGA) {
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
        await axios({
            url: 'https://graphql.anilist.co',
            method: "POST",
            data: {
                query: graphQuery,
                variables: {
                    name: req.headers.querysearch
                }
            }
        }).then((ok) => {
            res.json(ok.data.data.Page.media)
        })
    },
}

