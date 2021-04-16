const express = require('express');
const bodyParser = require('body-parser');

//Middlewares
const logger = require('./middleware/logger');

//Config
const config = require('./config');

//Routes
const api = require('./routes/api');

//Express
const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use( (req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET')
    res.setHeader('Access-Control-Allow-Header','*')
    next()
});

app.use(logger.console);

app.use('/api', api);

app.use('/', (req,res) => {
    res.status(400).json({'message': 'Invalid route'})
});

app.listen(config.server.port, config.server.ip, () => {
    console.log('Server started at: ' + config.getDir)
});