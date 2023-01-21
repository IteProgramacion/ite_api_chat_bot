const {response, request} = require('express');
const db = require("../db/connection");


const userGet = async (req = request, res = response) => {
    const {id} = req.params;
    try {
        const [result = Array()] = await db.query(`SELECT id, nombre, apellidop, apellidom, fechanacimiento, carnet, telefono, habilitado, created_at, updated_at FROM personas WHERE id=(SELECT persona_id FROM estudiantes WHERE persona_id = ${id})`);
        if (result.length === 0) {
            res.status(204).json({'as': 'dsa'})
            return;
        }
        res.json({'status': 'ok', 'result': result.pop()});
    } catch (e) {
        console.log('ERROR EN BASE DE DATOS*************' + e);
    }
}

const userPut = (req = request, res = response) => {
    res.json({'message': 'Welcome to my Jungle with a PUT'});
}

const userPost = (req = request, res = response) => {
    const body = req.body;
    res.json({'message': 'Welcome to my Jungle with a POST', body});
}

const userDelete = (req = request, res = response) => {
    res.json({'message': 'Welcome to my Jungle with a DELETE'});
}

const userPatch = (req = request, res = response) => {
    res.json({'message': 'Welcome to my Jungle with a Patch'})
}

module.exports = {userGet, userPut, userPost, userDelete, userPatch}