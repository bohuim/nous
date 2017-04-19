module.change_code = 1

// --------------------
const Alexa = require('alexa-app')
const app = new Alexa.app('Nous')

app.launch((request, response) => {
    response.say('Nous here, what would you like to do?')
})

module.exports = app
