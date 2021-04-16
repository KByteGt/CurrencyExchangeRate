const config = require('../config');
const timestamp = new Date();

exports.console = (req, res, next) => {
    console.log(config.getDir +" - "+ timestamp)
    NodeList()
};