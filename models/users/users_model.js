const {DataTypes, Model,UUIDV4} = require("sequelize");
const dbChatbotAiITE = require('../../db/db_chatbot_ai_ite_connection');
const Profile = require("./profile_model");
const Payments = require("../payments_credits_consumption/pyments_model");
const Groups = require("../chats/groups");

class User extends Model {
}

User.init({
    uid:{
        type: DataTypes.UUID,
        defaultValue: UUIDV4,
        primaryKey:true
    },
    username: {
        type: DataTypes.STRING,
        unique:true,
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