const {DataTypes, Model} = require("sequelize");
const dbChatbotAiITE = require('../../db/db_chatbot_ai_ite_connection');

const User = require('../users/users');
const Group = require('../chats/groups');

class Message extends Model {
}

Message.init({
    sender_id: {
        type: DataTypes.INTEGER, references: {
            model: User, key: 'id',
        }
    }, gorup_id: {
        type: DataTypes.INTEGER, references: {
            model: Group, key: 'id'
        }
    }, content: {
        type: DataTypes.STRING
    }, isAssistent: {
        type: DataTypes.BOOLEAN
    }
}, {
    sequelize: dbChatbotAiITE, modelName: 'Message'
});

(async () => {
    try {
        await Message.sync();
        console.log('correct Connection Sync Message');
    } catch (e) {
        console.log(':::::::Error al conectar a la base de datos' + e);
        throw  new Error('::::::Error al conectar a la base de datos ' + e);
    }
})();
User.belongsToMany(Group, {through: Message});
Group.belongsToMany(User, {through: Message});
module.exports = Message;