const Server = require("./models/server");
require('dotenv').config();


// const Server = require('./models/server');

console.log('error*********************')
const server = new Server();

server.listen();
