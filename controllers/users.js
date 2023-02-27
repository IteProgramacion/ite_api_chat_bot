const {request, response} = require('express');
const Profile = require('../models/users/profile_model')
const User = require('../models/users/users_model')
const Credits = require('../models/payments_credits_consumption/credits_model')
const Groups = require('../models/chats/groups')
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


module.exports = {listUsers,}