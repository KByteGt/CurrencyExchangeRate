//https://www.google.com/finance/converter?a=1&from=USD&to='.$to

const validateDate = date => {
    const dateArray = date.split("-")

    if(dateArray.length != 3) return false
    if(dateArray[0] < 2015) return false
    return dateArray
}

const validateCurrency = currency => {
    return currency != "USD" && currency != "EU"
}

const banguatUrl = "https://www.banguat.gob.gt/variables/ws/TipoCambio.asmx";

exports.getRate = (req, res, next) => {
    const currency = req.params.currency
    const date = validateDate(req.params.date)

    if(validateCurrency(currency)){
        res.status(404).json({"message": "Currency "+ req.params.currencyy +" not supported"})
    } else if(!date){
        res.status(404).json({"message": "Date "+ req.params.date +" not supported"})
    } else {
        res.status(200).json({
            "date": req.params.date,
            "currency": currency,
            "rate": 7.74185
        })
    }
}

exports.getIntervalRate = (req, res, next) => {

    const currency = req.params.currency;
    const date1 = validateDate(req.params.date1);
    const date2 = validateDate(req.params.date2);

    if(validateCurrency(currency)){
        res.status(404).json({"message": "Currency "+ req.params.currency +" not supported"})
    } else if(!date1 || !date2){
        res.status(404).json({"message": "Dates "+ req.params.date1 +", "+ req.params.date2 +" not supported"})
    }else {
        res.status(200).json({
            "start_date": req.params.date1,
            "end_date": req.params.date2,
            "currency": req.params.currency,
            "mean": 7.746235,
            "max": 7.75002,
            "min": 7.74185
        })
    }
}