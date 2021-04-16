"use strict";

const soap = require('strong-soap').soap;
const WSDL = soap.WSDL;

const validateDate = date => {
    const dateArray = date.split("-")

    if(dateArray.length != 3 || dateArray[0] < 2015) return null
    return dateArray[2]+"/"+dateArray[1]+"/"+dateArray[0]
}

const validateCurrency = currency => {
    if(currency == "USD") return 2
    if(currency == "EU") return 24
    return null
}

const banguatUrl = "https://www.banguat.gob.gt/variables/ws/TipoCambio.asmx?WSDL";

const soapRequest = new Promise( (resolve, reject) => {
    
})

exports.getRate = (req, res, next) => {
    const currency = validateCurrency(req.params.currency)
    const date = validateDate(req.params.date)
    
    console.log(currency, date)

    if(!currency){
        res.status(404).json({"message": "Currency "+ req.params.currency +" not supported"})
    } else if(!date){
        res.status(404).json({"message": "Date "+ req.params.date +" not supported"})
    } else {

        const requestArgs = {
            "fechainit": date,
            "moneda": currency
        }

        const options = {};
        WSDL.open(banguatUrl, options, (err, wsdl) => {
            const clientOptions = {
                WSDL_CACHE: {
                    banguatwsdl: wsdl
                }
            };
        
            soap.createClient('banguatwsdl', clientOptions, (err, client) => {
                let method = client['TipoCambio']['TipoCambioSoap12']['TipoCambioFechaInicialMoneda'];
                
                method(requestArgs, (err, result, envelope, soapHeader) => {
                    const response = JSON.parse(JSON.stringify(result));
                    const rate = response.TipoCambioFechaInicialMonedaResult.Vars.Var[0]
                    console.log(rate)

                    res.status(200).json({
                        "date": req.params.date,
                        "currency": req.params.currency,
                        "rate": rate.compra
                    })
                })
            })
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