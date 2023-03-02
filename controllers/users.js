const {request, response} = require('express');
const Profile = require('../models/users/profile_model')
const User = require('../models/users/users_model')
const Credits = require("../models/payments_credits_consumption/credits_model");

const registerUser = async (req = request, res = response) => {
    /**
     * TODO: hay que hacer validar que el username y el password son campos obligatorios, y en la base de datos el campo username no debe permitir nulos.
     * */
    const {username, profile, password} = req.body;
    try {
        const user = await User.create({
            username: username,
            password: password
        });
        if (user) {
            const userProfile = await Profile.create({
                nombre: profile.nombre,
                apellidop: profile.apellidop,
                apellidom: profile.apellidom,
                fechanacimiento: profile.fechanacimiento,
                carnet: profile.carnet,
                telefono: profile.telefono,
                habilitado: profile.habilitado,
                isIte: false,
            });
            await user.setProfile(userProfile);
            const credit = await Credits.create();
            credit.setUser(user);
            const resUser = await User.findOne({where: {username: username}, include: [{model: Profile}]});
            return res.status(200).json({result: resUser});
        }
    } catch (e) {
        if (e.name === 'SequelizeUniqueConstraintError') {
            res.status(409).json({result: 'El registro ' + username + ' ya existe en la base de datos'});
            return;
        }
        res.status(500).json({result: 'Hubo algun error al Registrarse: ' + e});
    }
}

const userLogin = async (req = request, res = response) => {
    const {username, password} = req.body;
    if (!username || !password || username.length === 0 || password.length === 0.) {
        res.status(400).json({result: 'username y password son campos obligatorios'});
        return;
    }

    const user = await User.findOne({where: {username: username}, include: [{model: Profile}]});
    if (user) {
        if (user.password === password) {
            res.status(200).json({result: user});
            return;
        } else {
            return res.status(401).json({result: `Contraseña incorrecta para el usuario: ${username}`});
        }
    }
    return res.status(404).json({result: `Informacion incorrecta o el usuario ${username} no existe`});
}
const listUsers = async (req = request, res = response) => {

// Crear un nuevo usuario y perfil
    const user = await User.create({
        username: 'usuario1',
        password: 'contraseña1',
    });

    const profile = await Profile.create({
        nombre: 'Juan',
        apellidop: 'Pérez',
        apellidom: 'Gómez',
        fechanacimiento: new Date('1980-01-01'),
        carnet: '123456',
        telefono: '12345678',
        habilitado: 1,
        isIte: true,
    });

// Establecer la relación entre el usuario y su perfil
    await user.setProfile(profile);

// Guardar los cambios en la base de datos
    await user.save();
    await profile.save();

    return res.json(User.findAll());
}


module.exports = {listUsers, registerUser, userLogin}