const axios = require('axios')
const got = require('got')
const form = "search=" + 'Naruto';

async function teste() {
    var return_data = { "chapter_number": "", "images": [], "next_chapter": { "number": "", "release_id": "" } };

    await got.post(
        "https://mangalivre.net/lib/search/series.json", {
        body: form,
        headers: {
            "x-requested-with": "XMLHttpRequest",
            "content-type": "application/x-www-form-urlencoded",
        }
    }).then(async (data) => {
        manga = JSON.parse(data.body).series[0]
        await got.post(
            `https://mangalivre.net/series/chapters_list.json?page=30&id_serie=${manga.id_serie}`, {
            headers: {
                "x-requested-with": "XMLHttpRequest",
                "content-type": "application/x-www-form-urlencoded",
            },
        }
        ).then(async (data) => {
            chapter = JSON.parse(data.body).chapters[1]

            var return_data = { "chapter_number": "", "images": [], "next_chapter": { "number": "", "release_id": "" } };

            for (let i in chapter.releases) {
                _check = i
            }
            await got(
                //`https://mangalivre.net/${chapter.releases[_check]}`, {
                `https://mangalivre.net/ler/null/online/${chapter.id_release}/capitulo-0/`, {
                headers: {
                    "x-requested-with": "XMLHttpRequest",
                    "content-type": "application/x-www-form-urlencoded",
                },
            }
            ).then((data) => {
                console.log(data.body)
            })




        })
    })

}

teste()