const {DataTypes, Model} = require("sequelize");

const dbChatbotAiITE = require('../../db/db_chatbot_ai_ite_connection');

const Profile = require("./profile");

class User extends Model {

}

User.init({
    username: {
        type: DataTypes.STRING,
    }, password: {
        type: DataTypes.STRING,
    },
}, {
    sequelize: dbChatbotAiITE, modelName: 'User',
});

(async () => {
    try {
        await User.sync();
        console.log('correct Connection Sync User');
    } catch (e) {
        console.log(':::::::Error al conectar a la base de datos' + e);
        throw  new Error('::::::Error al conectar a la base de datos ' + e);
    }
})();

Profile.hasOne(User)
User.belongsTo(Profile);

module.exports = User;