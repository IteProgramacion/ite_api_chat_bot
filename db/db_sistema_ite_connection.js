const {Sequelize} = require("sequelize");

const dbSistemaITE = new Sequelize('sistemaite', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    // logging: false
});
module.exports = dbSistemaITE;

