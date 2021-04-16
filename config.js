const schema = 'http';
const domain = 'localhost';
const ip = '127.0.0.1';
const port = process.env.port || 2500;

exports.server = {
    schema,
    domain,
    ip,
    port
}

exports.getDir = schema + "://"+ ip +":"+ port;