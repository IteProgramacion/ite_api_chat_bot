const dbChatbotAiITE = require('../../db/db_chatbot_ai_ite_connection');
const Group = require('groups');
const {DataTypes} = require("sequelize");
const Members = dbChatbotAiITE.define('Members',{
    isActive:{
        type: DataTypes.BOOLEAN,
        default: true
    }
});

(async () => {
    try {
        await Members.sync();
        console.log('correct Connection Sync Members');
    } catch (e) {
        console.log(':::::::Error al conectar a la base de datos' + e);
        throw  new Error('::::::Error al conectar a la base de datos ' + e);
    }
})();

module.exports = Members;