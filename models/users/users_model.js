const {DataTypes, Model} = require("sequelize");
const dbChatbotAiITE = require('../../db/db_chatbot_ai_ite_connection');
const Profile = require("./profile_model");
const Payments = require("../payments_credits_consumption/pyments_model");
const Groups = require("../chats/groups");

class User extends Model {
}

User.init({
    username: {
        type: DataTypes.STRING,
    }, password: {
        type: DataTypes.STRING,
    },
}, {
    sequelize: dbChatbotAiITE, modelName: 'User'
});


(async () => {
    try {
        User.belongsTo(Profile);
        Profile.hasOne(User);

        User.hasOne(Payments);
        Payments.belongsTo(User);


        await User.sync({alter:true});
        await Payments.sync({alter:true});
        await Groups.sync({alter:true});
        console.log('correct Connection Sync User and Payments');

    } catch (e) {
        console.log(':::::::Error al conectar a la base de datos' + e);
        throw  new Error('::::::Error al conectar a la base de datos ' + e);
    }
})();

module.exports = User;