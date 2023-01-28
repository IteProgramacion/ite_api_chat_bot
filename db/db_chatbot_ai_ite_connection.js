const {Sequelize} = require("sequelize");

// configuraciones para desarrollo
// const dbChatbotAiITE = new Sequelize('db_chatbot_ai_ite', 'root', '', {
//     host: 'localhost',
//     dialect: 'mysql'
// });

// configuraciones para produccion
const dbChatbotAiITE = new Sequelize('db_chatbot_ai_ite', 'vaninquz_user_chatbot_ai_ite', 'UE4hU6vwk3rxQqV', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = dbChatbotAiITE;