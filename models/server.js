const express = require('express')
const cors = require("cors");
const db = require("../db/connection");

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.userApiPath = '/api/users';

        this.dbConnection();
        this.middlewares();
        this.routes();
    }

    async dbConnection() {
        try {
            await db.authenticate();
        } catch (e) {
            switch (e) {
                case 'SequelizeConnectionError':
                    Error('ERROR en base de datos:'+e);
                    break;
                default:
                    throw Error('ERROR en base de datos DEFAULT:'+e)
            }
        }

    }

    middlewares() {
        // CORS
        this.app.use(cors());

        // Lectura y parceo del body
        this.app.use(express.json());

        // Directorio Publico
        this.app.use(express.static('public'),);
    }

    routes() {
        this.app.use(this.userApiPath, require('../routes/user'),);
    }

    listen() {
        this.app.listen(this.port, () => {

            console.log('Servidor corriendo en puerto', this.port);
        });
    }
}

module.exports = Server;