const express = require('express');

const api = express.Router();

api.get('/exchange/rate/:date/:currency', (req, res) => {
    res.json({"message": "Exchange rate date, currency"})
});

api.get('/exchange/rate/:date1/:date2/:currency', (req, res) => {
    res.json({"message": "Exchange rate date, date, currency"})
});

module.exports = api;