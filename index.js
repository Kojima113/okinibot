const Twitter = require('twitter')
const {Client, Intents } = require('discord.js')
const clientDis = new Client({ intents: Object.keys(Intents.FLAGS) })

const clientTwi = new Twitter({
    consumer_key: '',
    consumer_secret: '',
    access_token_key: '',
    access_token_secret: ''
})

clientDis.on('ready', () => {
    console.log(`${clientDis.user.tag}でログインしています。`)
})

clientTwi.get('favorites/list', function(error, tweets, response) {
    if(error) throw error;
    for(const i in tweets) {
        //console.log(clientDis.channels.cache.get('819281572669816832'))
        console.log(tweets[i].entities.media[0].media_url.toString())
    }
})

console.log(clientDis.channels.cache)

clientDis.login('')