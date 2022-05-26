const Twitter = require('twitter')
const { Client, Intents } = require('discord.js')
const clientDis = new Client({ intents: Object.keys(Intents.FLAGS) })

const clientTwi = new Twitter({
    consumer_key: '',
    consumer_secret: '',
    access_token_key: '',
    access_token_secret: ''
})

const tokenDis = ''

let urls = []
let ids = []

let waitTimer = 0

clientDis.on('disconnect', (e) => {
    connect()
    console.error(e)
})

clientDis.on("error", (e) => {
    console.error(e);
})
  
clientDis.on("warn", (e) => {
    console.info(e);
})

clientDis.on('ready', () => {
    console.log(`${clientDis.user.tag}でログインしています。`)
    sendFavs()
})

const connect = () => {
    setTimeout(() => {
        clientDis.login(tokenDis)
            .then(() => {
                waitTimer = 0
        })
        .catch((error) => {
            waitTimer += 6000
            connect()
        })
    }, waitTimer)
}

const sendFavs = () => {
    if (urls.length > 80) {
        urls.shift()
    }
    if (ids.length > 80) {
        ids.shift()
    }
    clientTwi.get('favorites/list', function (error, tweets, response) {
        try {
            if (error) throw error;
        }catch (error) {
            console.error(error)
            setTimeout(() => {
                sendFavs()
            }, 10000)
        }
        for (const i in tweets) {
            if (ids.includes(tweets[i].id.toString())) {
                console.log("skipped")
                continue
            }
            try {
                for (const j in tweets[i].extended_entities.media) {
                    if (urls.includes(tweets[i].extended_entities.media[j].media_url.toString())) {
                        continue
                    } else {
                        urls.push(tweets[i].extended_entities.media[j].media_url.toString())
                        clientDis.channels.cache.get('819281572669816832').send(tweets[i].extended_entities.media[j].media_url.toString())
                        console.log(tweets[i].extended_entities.media[j].media_url)
                    }
                }
            } catch (e) {
                console.error(e)
                ids.push(tweets[i].id.toString())
                console.log(ids)
            }
        }
    })
    setTimeout(() => {
        sendFavs()
    }, 10000);
}

// clientTwi.get('favorites/list', function(error, tweets, response) {
//     if (error) throw error;
//     for (const i in tweets) {
//         console.log(tweets[i])
//         try {
//             console.log(tweets[i].extended_entities.media)
//         } catch (e) {
//             console.error(e)
//         }
//     }
//     //console.log(tweets[1].extended_entities.media[1])
// })

clientDis.login(tokenDis)