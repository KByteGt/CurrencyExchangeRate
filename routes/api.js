const express = require('express');

//Controller
const exchangeController = require('../controllers/Exchange');

const api = express.Router();

api.get('/exchange/rate/:date/:currency', exchangeController.getRate);

api.get('/exchange/rate/:date1/:date2/:currency', exchangeController.getIntervalRate);

module.exports = api;