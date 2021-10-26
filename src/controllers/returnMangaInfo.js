const express = require('express');
const axios = require('axios')

module.exports = {
    async returnInfo(req, res){
        let graphQuery = `
        query ($name: String) {
            Media (search: $name, format:MANGA) {
                id
                format
                bannerImage
                startDate {
                    day
                    month
                    year
                }
                averageScore
                popularity
                    title {
                    romaji
                    english
                    native
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
            res.json(result.data)
        }).catch((err)=>{
            console.log(err)
        })
    }
}