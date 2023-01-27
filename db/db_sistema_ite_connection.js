const {Sequelize} = require("sequelize");

// Configuraciones para Desarrollo
// const dbSistemaITE = new Sequelize('sistemaite', 'root', '', {
//     host: 'localhost',
//     dialect: 'mysql',
//     // logging: false
// });

// Configuraciones para Produccion
const dbSistemaITE = new Sequelize('vaninquz_bd_sistemaite', 'vaninquz_usersistemaite', '', {
    host: 'localhost',
    dialect: 'mysql',
    // logging: false
});


module.exports = dbSistemaITE;

