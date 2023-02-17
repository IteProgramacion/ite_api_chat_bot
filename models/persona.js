const {DataTypes} = require("sequelize");

const dbChatbotAiITE = require('../db/db_chatbot_ai_ite_connection');

const User = require("../models/users");

const Profile = dbChatbotAiITE.define('Profile', {
    uid: {
        type: DataTypes.INTEGER,
        primaryKey: true,
    },
    nombre: {
        type: DataTypes.STRING,
    },
    apellidop: {
        type: DataTypes.STRING,
    },
    apellidom: {
        type: DataTypes.STRING,
    },
    fechanacimiento: {
        type: DataTypes.DATE
    },
    carnet: {
        type: DataTypes.STRING,
    },
    telefono: {
        type: DataTypes.STRING,
    },
    habilitado: {
        type: DataTypes.INTEGER,
    },
    isIte: {
        type: DataTypes.BOOLEAN
    }
});

(async () => {
    try {
        await Profile.sync();
        console.log('correct Connection Sync Persona')
    } catch (e) {
        console.log(':::::::Error al conectar a la base de datos' + e);
        throw  new Error('::::::Error al conectar a la base de datos ' + e);
    }

})();

Profile.hasOne(User, {foreignKey: 'uid', onDelete: 'CASCADE'});
module.exports = Profile;