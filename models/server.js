const express = require('express')
const cors = require("cors");
const dbSistemaITE = require("../db/db_sistema_ite_connection");
const dbChatbotAiITE = require("../db/db_chatbot_ai_ite_connection");

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.personaApiPath = '/api/persona';
        this.usersApiPath = '/api/users';
        this.iteUsersApiPath = '/api/users/ite';

        this.dbSistemaiteConnection().then(r => console.log('---dbSistemaiteConnection : ' + r));
        this.dbChatbotAiITEConnection().then(r => console.log('---dbChatbotAiITEConnection : ' + r));
        this.middlewares();
        this.routes();
    }

    async dbChatbotAiITEConnection() {
        try {
            await dbChatbotAiITE.authenticate();
        } catch (e) {
            throw  Error('Error en base de datos dbChatbotAiITEConnection: ' + e);
        }
    }

    async dbSistemaiteConnection() {
        try {
            await dbSistemaITE.authenticate();
        } catch (e) {
            throw  Error('Error en base de datos dbSistemaiteConnection: ' + e);
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
        this.app.use(this.personaApiPath, require('../routes/persona'),);
        this.app.use(this.usersApiPath, require('../routes/users'),);
        this.app.use(this.iteUsersApiPath, require('../routes/users_ite'),);
    }

    listen() {
        this.app.listen(this.port, () => {

            console.log('Servidor corriendo en puerto', this.port);
        });
    }
}

module.exports = Server;