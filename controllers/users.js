const {request, response} = require('express');
const Profile = require('../models/users/profile')
const Users = require('../models/users/users')
const Credits = require('../models/payments_credits_consumption/credits')
const Groups = require('../models/chats/groups')
const listUsers = (req = request, res = response) => {
    return res.json(Groups.findAll());
}


module.exports = {listUsers,}