const {DataTypes}= require('sequelize');
const dbChatbotAiITE = require('../db/db_chatbot_ai_ite_connection');
const User = require('../models/users')
const Credits =dbChatbotAiITE.define('Credits',{
    amount:{
        type: DataTypes.DOUBLE,
        default: 0.0
    },
})
(async () => {
    try {
        await Credits.sync();
        console.log('Correct Connection Sync Credits')
    } catch (e) {
        throw  new Error('Error to Connection Sync Credits' + e);
    }
})();

Credits.belongsTo(User)
module.exports = Credits;