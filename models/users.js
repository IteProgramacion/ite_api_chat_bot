const {DataTypes} = require("sequelize");

import dbChatbotAiITE from '../db/db_sistema_ite_connection'

const Users = dbChatbotAiITE.define('Users', {
    username: {
        type: DataTypes.STRING,
    },
    password: {
        type: DataTypes.STRING,
    },

});


(async () => {
    try {
        await Users.sync();
        console.log('correct Connection')
    } catch (e) {
        console.log(':::::::Error al conectar a la base de datos' + e);
        throw  new Error('::::::Error al conectar a la base de datos ' + e);
    }

})();
module.exports = Users;