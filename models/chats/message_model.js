const {DataTypes, Model} = require("sequelize");
const dbChatbotAiITE = require('../../db/db_chatbot_ai_ite_connection');

const User = require('../users/users_model');
const Group = require('../chats/groups');

class Message_model extends Model {
}

Message_model.init({
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
    sequelize: dbChatbotAiITE, modelName: 'Message',
});

(async () => {
    try {
        User.hasMany(Message_model);
        Message_model.belongsTo(User);

        Group.hasMany(Message_model);
        Message_model.belongsTo(Group);

        await Message_model.sync({alter:true});
        console.log('correct Connection Sync Message_model');
    } catch (e) {
        console.log(':::::::Error al conectar a la base de datos' + e);
        throw  new Error('::::::Error al conectar a la base de datos ' + e);
    }
})();

module.exports = Message_model;