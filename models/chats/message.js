const {DataTypes} = require("sequelize");
const dbChatbotAiITE = require('../../db/db_chatbot_ai_ite_connection');

const User = require('../users/users');
const Group = require('../chats/groups');

const Message = dbChatbotAiITE.define('Message',{
    sender_id:{
        type: DataTypes.INTEGER,
        references:{
            model: User,
            key: 'uid',
        }
    },
    gorup_id:{
        type: DataTypes.INTEGER,
        references: {
            model: Group,
            key: 'id'
        }
    },
    content: {
        type:DataTypes.STRING
    },
    isAssistent:{
        type: DataTypes.BOOLEAN
    }
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

