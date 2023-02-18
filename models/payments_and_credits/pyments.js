const {DataTypes} = require("sequelize");
const dbChatbotAiITE = require('../../db/db_chatbot_ai_ite_connection');
const User = require("../users/users");
const Payments = dbChatbotAiITE.define('Payments', {
    // user_uid: {
    //     type: DataTypes.INTEGER,
    // },
    amount: {
        type: DataTypes.DOUBLE,
    }
});

(async () => {
    try {
        await Payments.sync();
        console.log('Correct Connection Sync Payments')
    } catch (e) {
        throw  new Error('Error to Connection Sync Payments' + e);
    }
})();

Payments.belongsTo(User);
module.exports = Payments;