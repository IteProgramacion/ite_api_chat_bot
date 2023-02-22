const {DataTypes, Model} = require('sequelize');
const dbChatbotAiITE = require('../../db/db_chatbot_ai_ite_connection');
const User = require('../users/users')

class Credits extends Model {

}

Credits.init({
    amount: {
        type: DataTypes.DOUBLE,
        default: 0.0
    }
}, {
    sequelize: dbChatbotAiITE,
    modelName: 'Credits'
});

(async () => {
    try {
        await Credits.sync();
        console.log('Correct Connection Sync Credits')
    } catch (e) {
        throw  new Error('Error to Connection Sync Credits' + e);
    }
})();

User.hasOne(Credits);
Credits.belongsTo(User);

module.exports = Credits;