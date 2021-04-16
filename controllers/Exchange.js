exports.getRate = (req, res, next) => {
    const currency = req.params.currency
    const date = req.params.date

    if(currency != "USD" && currency != "EU"){
        res.status(204).json({"message": "Currency "+ currency +" not supported"})
    } else if(date.split("-")[0] < 2015){
        res.status(204).json({"message": "Date "+ date +" not supported"})
    } else {
        res.status(200).json({
            "date": date,
            "currency": currency,
            "rate": 7.74185
        })
    }
}

exports.getIntervalRate = (req, res, next) => {
    res.status(200).json({
        "start_date": req.params.date1,
        "end_date": req.params.date2,
        "currency": req.params.currency,
        "mean": 7.746235,
        "max": 7.75002,
        "min": 7.74185
    })
}