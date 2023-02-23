const {response, request} = require('express');
const dbSistemaite = require("../db/db_sistema_ite_connection");
const {User,Profile} = require("../models/users/users");

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

/*
* captura el [username] y verifica si existe en la base de datos de ITE
*
* return status(404): "El usuario no existe, debe inscribirse en ITE"
*
* return status(200): {result: Profile} //retorna el resultado de busqueda
*
* return status(202): "se  debe crear una contraseña para el usuario"
*
* return status(400): {result: `Informacion incorrecta para el estudiante: ${username}`}
* */
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
            return res.status(202).json({
                result: resPersonaSistemaITE,
                message: "se  debe crear una contraseña para el usuario"
            });
        }
    } catch (e) {
        return res.status(400).json({result: `Informacion incorrecta para el estudiante: ${username}`});
    }
}

/*
* recibe el un objeto [profile] y un [password]
*
* crea un nuevo registro de [Profile]
*
* crea un nuevo registro de  [User]
*
* return status(200): {result: [resCreateUser], profile: [resCreateProfile]}
* */
const userRegister = async (req = request, res = response) => {
    const {profile, password} = req.body;
    try {
        /// TODO: Falta acomodar los valos para el Create en funcion del modelo Profile
        console.log(`Profile: ${JSON.stringify(req.body["profile"].id, null, 2)}`)
        const resCreateProfile = await Profile.create({
            id: profile.id,
            nombre: profile.nombre,
            apellidop: profile.apellidop,
            apellidom: profile.apellidom,
            fechanacimiento: profile.fechanacimiento,
            carnet: profile.carnet,
            telefono: profile.telefono,
            habilitado: profile.habilitado,
        });
        const resCreateUser = await User.create({
            id: profile.id,
            username: profile.id,
            password: password
        })
        res.status(200).json({result: resCreateUser, profile: resCreateProfile})
    } catch (e) {
        console.log(e)
    }
}

/*
* recibe el un [username] y un [password]
*
* return status(200): {result: resUser, profile: resProfile}
*
* return status(401):{result: `Contraseña incorrecta para el usuario: ${username}`}
* */
const userLogin = async (req = request, res = response) => {
    const {username, password} = req.body;
    //TODO: Revisar por que esta buscando una columna ProfileId y no encuentra la relacion entre las tablas
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
        return res.status(404).json({result: `Informacion incorrecta para el estudiante: ${username}`});
    } catch (e) {
        console.log(e);
    }
}
module.exports = {iniciarSesion, userSearch, userRegister, userLogin};