const {DataTypes, Model} = require("sequelize");
const dbChatbotAiITE = require('../../db/db_chatbot_ai_ite_connection');
const Groups = require("./groups");
const User = require("../users/users_model");

class Members extends Model {

}

Members.init({
    isActive: {
        type: DataTypes.BOOLEAN, default: true
    },
    GroupId: {
        type: DataTypes.INTEGER,
        references: {
            model: Groups, // 'Movies' would also work
            key: 'id'
        }
    },
    UserId: {
        type: DataTypes.INTEGER,
        references: {
            model: User, // 'Movies' would also work
            key: 'id'
        }
    },
}, {
    modelName: 'Members', sequelize: dbChatbotAiITE,
});

(async () => {
    try {
        // User.belongsToMany(Groups,{through: Members});
        // Groups.belongsToMany(User,{through: Members});
        //

        await Members.sync({alter:true});
        console.log('correct Connection Sync Members');
    } catch (e) {
        console.log(':::::::Error al conectar a la base de datos' + e);
        throw  new Error('::::::Error al conectar a la base de datos ' + e);
    }
})();
module.exports = Members;