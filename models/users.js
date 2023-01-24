import {DataTypes} from "sequelize";

import dbChatbotAiITE from '../db/db_sistema_ite_connection'

const Users = dbChatbotAiITE.define('Users', {
    username: {
        type: DataTypes.STRING,

    },
    password: {
        type: DataTypes.STRING,
    },
    persona:{

    }
});