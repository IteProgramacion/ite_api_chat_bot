const {DataTypes} = require("sequelize");

const dbChatbotAiITE = require('../db/db_sistema_ite_connection');

const Personas = dbChatbotAiITE.define('Personas', {
    cod_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
    },
    nombre: {
        type: DataTypes.STRING,
    },
    apellidop: {
        type: DataTypes.STRING,
    },
    apellidom: {
        type: DataTypes.STRING,
    },
    fechanacimiento: {
        type: DataTypes.DATE
    },
    carnet: {
        type: DataTypes.STRING,
    },
    telefono: {
        type: DataTypes.STRING,
    },
    habilitado: {
        type: DataTypes.INTEGER,
    },
});

(async () => {
    try {
        await Personas.sync();
        console.log('correct Connection')
    } catch (e) {
        console.log(':::::::Error al conectar a la base de datos' + e);
        throw  new Error('::::::Error al conectar a la base de datos ' + e);
    }

})();

module.exports = Personas;