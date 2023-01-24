const {response, request} = require('express');
const dbChatbotAiITE = require("../db/db_chatbot_ai_ite_connection");
const dbSistemaite = require("../db/db_sistema_ite_connection");

const iniciarSesion = async (req = request, res = response) => {
    const {username, password} = req.body;
        // TODO:
        //  [-]1: si el usuario NO existe en SistemaITE, Debe inscribirse en el instituto.
        //  [x]2: si el usuario existe en SistemaITE, entonces verifica en ChatbotITE.
        //  [x]3: [debe existir en SistemaITE] si NO existe en ChatbotITE, lo registra en el ChatbotITE...
        //  [x]3.1  y le crea un usuario basado en user = persona_id, password = {this.password}
        //  [x]4: [debe existir en SistemaITE] si Existe en ChatbotITE, verifica el username y password sean correctos...
        //  [x]4.1 si es correcto retorna perfil y la sesion iniciada
        //  [x]4.2 si no es correcto, retorna mensaje "usuario o contraseña incorrectos"
    try {
        const [resPersonaITE = Array()] = await dbSistemaite.query(
            `SELECT id, nombre, apellidop, apellidom, fechanacimiento, carnet, telefono, habilitado, created_at, updated_at FROM personas WHERE id=(SELECT persona_id FROM estudiantes WHERE persona_id = ${username})`
        );
        if (resPersonaITE.length ===0) {
            /// El usuario no existe en el Sistema ITE
        }
        const [resChatbotITE = Array()] = await
    } catch (e) {
        throw SQLException;
    }
    res.json({username: username, password: password})
}
module.exports = {iniciarSesion};