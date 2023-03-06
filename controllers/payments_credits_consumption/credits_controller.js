const {request, response} = require("express");
const Credits = require("../../models/payments_credits_consumption/credits_model");
const User = require("../../models/users/users_model");
const getCredit = async (req = request, res = response) => {
    const {userUid,} = req.body;
    const credit = await User.findByPk(userUid);
    if (credit) {
        res.status(200).json({result: await credit.getCredit()});
        return;
    }
    res.status(404).json({result: 'Usuario no existe'})
}
const updateCredit = async (req = request, res = response) => {
    const {userUid, amount} = req.body;
    const user = await User.findByPk(userUid);
    const credit = await user.getCredit();
    if (credit.amount > 0 && credit.amount <= amount) {
        credit.amount = credit.amount - amount;
        await credit.save();
    } else {
        res.status(402).json({result: 'Saldo insuficiente'})
    }
    res.json(credit);
}

module.exports = {getCredit, updateCredit}