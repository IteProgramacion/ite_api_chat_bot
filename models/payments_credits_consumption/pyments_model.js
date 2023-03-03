const {DataTypes, Model} = require("sequelize");
const dbChatbotAiITE = require('../../db/db_chatbot_ai_ite_connection');

class Payments extends Model {
}

Payments.init({
    amount: {
        type: DataTypes.DOUBLE,
    },

}, {
    sequelize: dbChatbotAiITE, modelName: 'Payments'
});

(async () => {
    try {


        console.log('Correct Connection Sync Payments')
    } catch (e) {
        throw  new Error('Error to Connection Sync Payments' + e);
    }
})();

module.exports = Payments;