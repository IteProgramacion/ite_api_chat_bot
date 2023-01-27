const {response, request} = require('express');
// const dbChatbotAiITE = require("../db/db_chatbot_ai_ite_connection");
const dbSistemaite = require("../db/db_sistema_ite_connection");
const Profile = require("../models/persona");
const User = require("../models/users");
const {json} = require("sequelize");

const iniciarSesion = async (req = request, res = response) => {
    const {username, password} = req.body;
    // TODO:
    //  [x]4.1 si es correcto retorna perfil y la sesion iniciada
    //  [x]4.2 si no es correcto, retorna mensaje "usuario o contraseña incorrectos"
    try {
        // TODO:
        //  [-]1: si el usuario NO existe en SistemaITE, Debe inscribirse en el instituto.
        const [resPersonaSistemaITE] = await dbSistemaite.query(
            `SELECT id, nombre, apellidop, apellidom, fechanacimiento, carnet, telefono, habilitado, created_at, updated_at FROM personas WHERE id=(SELECT persona_id FROM estudiantes WHERE persona_id = ${username})`
        );
        if (resPersonaSistemaITE.length === 0) {
            return res.status(404).json({result: 'El usuario no existe, debe inscribirse en ITE'});
        }
        // TODO:
        //  [x]2: si el usuario existe en SistemaITE, entonces verifica en ChatbotITE.
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
            //TODO
            //  [x]3: [debe existir en SistemaITE] si NO existe en ChatbotITE, lo registra en el ChatbotITE...
            //  [x]3.1  y le crea un usuario basado en user = persona_id, password = {this.password}
            const resCreateUserInChatbotITE = await User.create({
                uid: resPersonaSistemaITE[0].id,
                username: resPersonaSistemaITE[0].id,
                password: password
            });
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
            return res.json({result: resCreateUserInChatbotITE, profile: resCreateProfileInChatbotITE});
        }
        //TODO:
        //  [x]4: [debe existir en SistemaITE] si Existe en ChatbotITE, verifica el username y password sean correctos...
    } catch (e) {
        console.log(e);
    }
}
module.exports = {iniciarSesion};