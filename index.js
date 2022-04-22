const Twitter = require('twitter')
const { Client, Intents } = require('discord.js')
const { bashCompletionSpecFromOptions } = require('dashdash')
const clientDis = new Client({ intents: Object.keys(Intents.FLAGS) })

const clientTwi = new Twitter({
    consumer_key: '',
    consumer_secret: '',
    access_token_key: '',
    access_token_secret: ''
})

const tokenDis = ''

const urls = []

clientDis.on('ready', () => {
    console.log(`${clientDis.user.tag}でログインしています。`)
    sendFavs()
})

const sendFavs = () => {
    if (urls.length > 1000) {
        urls.length = 0
    }
    clientTwi.get('favorites/list', function (error, tweets, response) {
        if (error) throw error;
        for (const i in tweets) {
            try {
                for (const j in tweets[i].extended_entities.media) {
                    if (urls.includes(tweets[i].extended_entities.media[j].media_url.toString())) {
                        continue
                    } else {
                        urls.push(tweets[i].extended_entities.media[j].media_url.toString())
                        clientDis.channels.cache.get('チャンネルID').send(tweets[i].extended_entities.media[j].media_url.toString())
                        console.log(tweets[i].extended_entities.media[j].media_url)
                    }
                }
            } catch (e) {
                console.error(e)
            }
        }
    })
    setTimeout(() => {
        sendFavs()
    }, 7200000);
}

// clientTwi.get('favorites/list', function(error, tweets, response) {
//     if (error) throw error;
//     for (const i in tweets) {
//         try {
//             console.log(tweets[i].extended_entities.media)
//         } catch (e) {
//             console.error(e)
//         }
//     }
//     //console.log(tweets[1].extended_entities.media[1])
// })

clientDis.login(tokenDis)