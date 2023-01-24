const {Sequelize} = require("sequelize");

const dbChatbotAiITE = new Sequelize('db_chatbot_ai_ite', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
})

module.exports = dbChatbotAiITE;