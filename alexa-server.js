'use strict'

var AlexaAppServer = require('alexa-app-server');

var server = AlexaAppServer.start({
    app_dir: 'alexa',
    app_root: '/alexa/',
    port: 8000
});
