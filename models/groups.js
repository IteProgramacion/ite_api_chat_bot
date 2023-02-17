const {DataTypes} = require("sequelize");
const dbChatbotAiITE = require('../db/db_chatbot_ai_ite_connection');
const Members = require('../models/members');
const Message = require('../models/message');
const Groups = dbChatbotAiITE.define('Groups', {
    name: {
        type: DataTypes.STRING,
    }
});
(async () => {
    try {
        await Groups.sync();
        console.log('correct Connection Sync Groups');
    } catch (e) {
        console.log(':::::::Error al conectar a la base de datos' + e);
        throw  new Error('::::::Error al conectar a la base de datos ' + e);
    }
})()
Groups.hasOne(Members);
Groups.hasOne(Message);
module.exports = Groups;