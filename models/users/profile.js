const {DataTypes, Model} = require("sequelize");

const dbChatbotAiITE = require('../../db/db_chatbot_ai_ite_connection');


class Profile extends Model {
}

Profile.init({
    nombre: {
        type: DataTypes.STRING,
    }, apellidop: {
        type: DataTypes.STRING,
    }, apellidom: {
        type: DataTypes.STRING,
    }, fechanacimiento: {
        type: DataTypes.DATE
    }, carnet: {
        type: DataTypes.STRING,
    }, telefono: {
        type: DataTypes.STRING,
    }, habilitado: {
        type: DataTypes.INTEGER,
    }, isIte: {
        type: DataTypes.BOOLEAN
    }
}, {
    sequelize: dbChatbotAiITE, modelName: 'Profile'
});

(async () => {
    try {
        await Profile.sync();
        console.log('correct Connection Sync Profile')
    } catch (e) {
        console.log(':::::::Error al conectar a la base de datos' + e);
        throw  new Error('::::::Error al conectar a la base de datos ' + e);
    }

})();


module.exports = Profile;