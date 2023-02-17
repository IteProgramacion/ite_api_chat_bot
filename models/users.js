const {DataTypes} = require("sequelize");

const dbChatbotAiITE = require('../db/db_chatbot_ai_ite_connection');

const Person = require("../models/persona");
const Payments = require("../models/pyments");
const Credits = require("../models/credits");

const User = dbChatbotAiITE.define('User', {
    uid: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    username: {
        type: DataTypes.STRING,
    },
    password: {
        type: DataTypes.STRING,
    },

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

User.belongsTo(Person);
User.hasOne(Payments);
User.hasOne(Credits);
module.exports = User;