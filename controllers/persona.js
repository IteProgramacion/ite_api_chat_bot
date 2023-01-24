const {response, request} = require('express');
const dbSistemaite = require("../db/db_sistema_ite_connection");


const personaGet = async (req = request, res = response) => {
    const {id} = req.params;
    try {
        const [result = Array()] = await dbSistemaite.query(`SELECT id, nombre, apellidop, apellidom, fechanacimiento, carnet, telefono, habilitado, created_at, updated_at FROM personas WHERE id=(SELECT persona_id FROM estudiantes WHERE persona_id = ${id})`);
        if (result.length === 0) {
            res.status(404).json({result: `El usuario no ${id} existe`})
            return;
        }
        res.json({result: result.pop()});
    } catch (e) {
        console.log('ERROR EN BASE DE DATOS*************' + e);
    }
}

const personaPut = (req = request, res = response) => {
    res.json({'message': 'Welcome to my Jungle with a PUT'});
}

const personaPost = async (req = request, res = response) => {
    // const body = req.body;
    // res.json({'message': 'Welcome to my Jungle with a POST', body});
    const {username, password} = req.body;
    try {
        const [result = Array()] = await dbSistemaite.query(`SELECT id, nombre, apellidop, apellidom, fechanacimiento, carnet, telefono, habilitado, created_at, updated_at FROM personas WHERE id=(SELECT persona_id FROM estudiantes WHERE persona_id = ${username})`);
        if (result.length === 0) {
            res.status(404).json({result: `El usuario ${username} no exite, por favor comuniquese con ITE para mas informacion.`})
            return;
        }
        res.json({'result': result.pop()});
    } catch (e) {
        console.log('ERROR EN BASE DE DATOS*************' + e);
    }
}

const personaDelete = (req = request, res = response) => {
    res.json({'message': 'Welcome to my Jungle with a DELETE'});
}

const personaPatch = (req = request, res = response) => {
    res.json({'message': 'Welcome to my Jungle with a Patch'})
}

module.exports = {personaGet, personaPut, personaPost, personaDelete, personaPatch}