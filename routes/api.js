const express = require('express');

const api = express.Router();

api.get('/exchange/rate/:date/:currency', (req, res) => {
    res.status(200).json({
        "date": req.params.date,
        "currency": req.params.currency,
        "rate": 7.74185
    })
});

api.get('/exchange/rate/:date1/:date2/:currency', (req, res) => {
    res.status(200).json({
        "start_date": req.params.date1,
        "end_date": req.params.date2,
        "currency": req.params.currency,
        "mean": 7.746235,
        "max": 7.75002,
        "min": 7.74185
    })
});

module.exports = api;