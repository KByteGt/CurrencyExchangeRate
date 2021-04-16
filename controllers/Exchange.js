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
                    if(response.TipoCambioFechaInicialMonedaResult.TotalItems != 0){
                        
                        const rate = response.TipoCambioFechaInicialMonedaResult.Vars.Var[0]

                        res.status(200).json({
                            "date": req.params.date,
                            "currency": req.params.currency,
                            "rate": rate.compra
                        })
                        
                    } else {
                        res.status(404).json({"message": "Problems to make the request"})
                    }
                })
            })
        })
    }
}

exports.getIntervalRate = (req, res, next) => {

    const currency = validateCurrency(req.params.currency);
    const date1 = validateDate(req.params.date1);
    const date2 = validateDate(req.params.date2);

    if(!currency){
        res.status(404).json({"message": "Currency "+ req.params.currency +" not supported"})
    } else if(!date1 || !date2){
        res.status(404).json({"message": "Dates "+ req.params.date1 +", "+ req.params.date2 +" not supported"})
    }else {


        const requestArgs = {
            "fechainit": date1,
            "fechafin": date2,
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
                
                let method = client['TipoCambio']['TipoCambioSoap12']['TipoCambioRangoMoneda'];
            
                method(requestArgs, (err, result, envelope, soapHeader) => {
                    const response = JSON.parse(JSON.stringify(result));

                    if(response.TipoCambioRangoMonedaResult.TotalItems != 0){
                        
                        const rateArray = response.TipoCambioRangoMonedaResult.Vars.Var
                        const mean = rateArray.reduce( (sum, actual) => (sum + actual.compra),0) / rateArray.length
                        const max = rateArray.reduce( (num, actual) => ( actual.compra > num ? num = actual.compra : num), 0)
                        const min = rateArray.reduce( (num, actual) => ( num == 0 ? num = actual.compra : actual.compra < num ? num = actual.compra : num), 0)
                        
                        res.status(200).json({
                            "start_date": req.params.date1,
                            "end_date": req.params.date2,
                            "currency": req.params.currency,
                            "mean": mean,
                            "max": max,
                            "min": min
                        })
                        
                    } else {
                        res.status(404).json({"message": "Problems to make the request"})
                    }
                })
            })
        })
    }
}