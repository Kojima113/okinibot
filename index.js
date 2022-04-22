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

clientDis.on('ready', () => {
    console.log(`${clientDis.user.tag}でログインしています。`)
    sendFavs()
})

const sendFavs = () => {
    clientTwi.get('favorites/list', function (error, tweets, response) {
        if (error) throw error;
        for (const i in tweets) {
            try {
                for (const j in tweets[i].extended_entities.media) {
                    clientDis.channels.cache.get('チャンネルID').send(tweets[i].extended_entities.media[j].media_url.toString())
                    console.log(tweets[i].extended_entities.media[j].media_url)
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