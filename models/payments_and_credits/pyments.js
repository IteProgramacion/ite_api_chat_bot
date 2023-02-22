const {DataTypes, Model} = require("sequelize");
const dbChatbotAiITE = require('../../db/db_chatbot_ai_ite_connection');
const User = require("../users/users");

class Payments extends Model {
}

Payments.init({
    amount: {
        type: DataTypes.DOUBLE,
    }
}, {
    sequelize: dbChatbotAiITE, modelName: 'Payments'
});

(async () => {
    try {
        await Payments.sync();
        console.log('Correct Connection Sync Payments')
    } catch (e) {
        throw  new Error('Error to Connection Sync Payments' + e);
    }
})();

User.hasOne(Payments);
Payments.belongsTo(User);

module.exports = Payments;