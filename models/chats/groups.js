const {DataTypes, Model} = require("sequelize");

const dbChatbotAiITE = require('../../db/db_chatbot_ai_ite_connection');

class Groups extends Model {
}

Groups.init({
    name: {
        type: DataTypes.STRING,
    }
}, {
    sequelize: dbChatbotAiITE, modelName: 'Groups'
});

(async () => {
    try {
        await Groups.sync();
        console.log('correct Connection Sync Groups');
    } catch (e) {
        console.log(':::::::Error al conectar a la base de datos' + e);
        throw  new Error('::::::Error al conectar a la base de datos ' + e);
    }
})();

module.exports = Groups;