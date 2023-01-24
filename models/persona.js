import {DataTypes} from "sequelize";

import dbChatbotAiITE from '../db/db_sistema_ite_connection'

const Personas = dbChatbotAiITE.define('Personas', {
    cod_id: {
        type: DataTypes.INTEGER
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

export default Personas;