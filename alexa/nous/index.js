module.change_code = 1

// --------------------
const Alexa = require('alexa-app')
const PubNub = require('pubnub')


const pubnub = new PubNub({
    publishKey: 'pub-c-8fd5e639-8131-4b76-867c-c38d0c1d15fc',
    subscribeKey: 'sub-c-7eaa1852-2563-11e7-bb8a-0619f8945a4f'
})

const app = new Alexa.app('Nous')

app.launch((request, response) =>
{
    // const session = request.getSession()
    // if (!session)
    //     response.say('Sorry, could not retrieve the session. Exiting Nous.').shouldEndSession(true)

    // const user = session.get('user')

    // if (!user.accessToken)
    // {
    //     console.log('no linked user')
    //     response.linkAccount()
    //     return response.say('Nous here. To save and view practice interviews, please link your Amazon account.')
    // }

    // console.log(user.accessToken)
    // return response.say(`Hello, Nous here. What can I do for you?`)

    pubnub.publish({
        channel: 'nous-alexa',
        message: 'Hello there.'
    })

    return response.say('Nous here what can I do for you?')
})


// --------------------
// Helpers

module.exports = app
