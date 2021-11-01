const express = require('express');
const axios = require('axios')

module.exports = {
    async returnInfo(req, res){
        let graphQuery = `
        query ($name: String) {
            Media (search: $name, format:MANGA) {
                id
                startDate {
                    day
                    month
                    year
                }
                description
                countryOfOrigin
                averageScore
                popularity
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
        }).then((result)=>{
            res.json(result.data.data.Media)
        }).catch((err)=>{
            console.log(err)
        })
    },

    async returnCharacter(req, res) {
        let graphQuery = `
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
                    characters (role:MAIN) {
                        edges {
                            node {
                                siteUrl
                                name {
                                    full
                                    native
                                }
                                image {
                                    large
                                }
                            }
                        }
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
        }).then((result)=>{
            res.json(result.data.data.Page.media[0].characters.edges)
            console.log(result.data.data.Page.media[0].characters.edges.length)
        })
    }
}