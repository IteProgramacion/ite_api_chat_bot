const {DataTypes, Model} = require("sequelize");

const dbChatbotAiITE = require('../../db/db_chatbot_ai_ite_connection');

const User = require("../users/users");
const Group = require("../chats/groups")

class Members extends Model {

}

Members.init({
    isActive: {
        type: DataTypes.BOOLEAN, default: true
    }
}, {
    modelName: 'Members', sequelize: dbChatbotAiITE,
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

User.belongsToMany(Group, {through: Members})
Group.belongsToMany(User, {through: Members})

module.exports = Members;