const {DataTypes, Model} = require('sequelize');
const dbChatbotAiITE = require('../../db/db_chatbot_ai_ite_connection');
const User = require('../users/users_model')

class Credits extends Model {
}

Credits.init({
    amount: {
        type: DataTypes.DOUBLE,
        defaultValue: 0.0
    }
}, {
    sequelize: dbChatbotAiITE,
    modelName: 'Credits'
});

(async () => {
    try {
        User.hasOne(Credits);
        Credits.belongsTo(User);
        await Credits.sync({alter:true});
        console.log('Correct Connection Sync Credits')
    } catch (e) {
        throw  new Error('Error to Connection Sync Credits' + e);
    }
})();

module.exports = Credits;