const {response, request} = require('express');
const dbSistemaite = require("../db/db_sistema_ite_connection");
const Profile = require("../models/persona");
const User = require("../models/users");

const iniciarSesion = async (req = request, res = response) => {
    const {username, password} = req.body;
    try {
        const [resPersonaSistemaITE] = await dbSistemaite.query(
            `SELECT id, nombre, apellidop, apellidom, fechanacimiento, carnet, telefono, habilitado, created_at, updated_at FROM personas WHERE id=(SELECT persona_id FROM estudiantes WHERE persona_id = ${username})`
        );
        if (resPersonaSistemaITE.length === 0) {
            return res.status(404).json({result: 'El usuario no existe, debe inscribirse en ITE'});
        }
        const resChatbotITE = await Profile.findByPk(username);
        if (resChatbotITE) {
            //si resChatbotITE es null,:entonces no existe en base de datos
            //si entra aqui, es por que existe en base de datos
            const resUserChatbotITE = await User.findByPk(username);

            if (resUserChatbotITE.password === password) {
                return res.status(200).json({result: resUserChatbotITE, profile: resChatbotITE});
            } else {
                return res.status(401).json({result: `Contraseña incorrecta para el usuario: ${username}`});
            }
        } else {
            const resCreateProfileInChatbotITE = await Profile.create({
                uid: resPersonaSistemaITE[0].id,
                nombre: resPersonaSistemaITE[0].nombre,
                apellidop: resPersonaSistemaITE[0].apellidop,
                apellidom: resPersonaSistemaITE[0].apellidom,
                fechanacimiento: resPersonaSistemaITE[0].fechanacimiento,
                carnet: resPersonaSistemaITE[0].carnet,
                telefono: resPersonaSistemaITE[0].telefono,
                habilitado: resPersonaSistemaITE[0].habilitado,

            });
            const resCreateUserInChatbotITE = await User.create({
                uid: resPersonaSistemaITE[0].id,
                username: resPersonaSistemaITE[0].id,
                password: password
            });

            return res.json({result: resCreateUserInChatbotITE, profile: resCreateProfileInChatbotITE});
        }
    } catch (e) {
        console.log(e)
    }
}

const userSearch = async (req = request, res = response) => {
    const {username} = req.body;
    try {
        const [resPersonaSistemaITE] = await dbSistemaite.query(
            `SELECT id, nombre, apellidop, apellidom, fechanacimiento, carnet, telefono, habilitado, created_at, updated_at FROM personas WHERE id=(SELECT persona_id FROM estudiantes WHERE persona_id = ${username})`
        );

        if (resPersonaSistemaITE.length === 0) {
            return res.status(404).json({result: 'El usuario no existe, debe inscribirse en ITE'});
        }

        const resChatbotITE = await Profile.findByPk(username);
        if (resChatbotITE) {//Si existe el objeto en Profile
            return res.status(200).json({result: resChatbotITE});
        } else {//Si no existe el objeto en Profile
            return res.status(404).json({
                result: resChatbotITE,
                message: "se  debe crear una contraseña para el usuario"
            });
        }
    } catch (e) {
        return res.status(400).json({result: `Informacion incorrecta para el estudiante: ${username}`});
    }
}

const userRegister = async (req = request, res = response) => {
    const {profile, password} = req.body;
    try {
        const resCreateProfile = await Profile.create(profile);
        console.log("--------------------------" + resCreateProfile)
        const resCreateUser = await User.create({
            uid: resCreateProfile.uid,
            username: resCreateProfile.uid,
            password: password
        })
        res.status(200).json({result: resCreateUser, profile: resCreateProfile})
    } catch (e) {
        console.log(e)
    }
}

const userLogin = async (req = request, res = response) => {
    const {username, password} = req.body;
    try {
        const resUser = await User.findByPk(username)
        if (resUser) {
            if (resUser.password === password) {
                const resProfile = await Profile.findByPk(username);
                return res.status(200).json({result: resUser, profile: resProfile})
            } else {
                return res.status(401).json({result: `Contraseña incorrecta para el usuario: ${username}`});
            }
        }
    } catch (e) {
        console.log(e);
    }
}
module.exports = {iniciarSesion, userSearch, userRegister, userLogin};