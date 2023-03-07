const {request, response} = require("express");
const Payment = require("../../models/payments_credits_consumption/pyments_model");
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
const creditConsumption = async (req = request, res = response) => {
    const {userUid, amount} = req.body;
    const user = await User.findByPk(userUid);
    const credit = await user.getCredit();
    if (credit.amount > 0 && credit.amount <= amount) {
        credit.amount = credit.amount - amount;
        await credit.save();
        return res.status(200).json({result: credit});
    } else {
        return res.status(402).json({result: 'Saldo insuficiente'});
    }
}

const buyCredit = async (req = request, res = response) => {
    const {userUid, amount} = req.body;
    const user = await User.findByPk(userUid);
    const credit = await user.getCredit();
    if (credit) {
        //la multiplicacion por 1, es la tasa de conversion del ITEcoin.
        credit.amount = credit.amount + (amount * 1);

        /**
         * TODO: falta guardar la compra de credito en el historial de transacciones del usuario
         * */
        const transaction = await Payment.create({amount:amount});
        await transaction.setUser(user);
        await credit.save();
        return res.status(200).json({result: credit});
    }else{
        return res.status(400).json({result: 'Ha ocurrido algun error, revise los datos y vuelva a intentarlo'});

    }
}

const myTransacion = async (req = request, res = response) => {
    const {userUid} = req.body;
    const historyTransaction = await Payment.findAll({where:{'UserUID': userUid}});
    res.status(200).json(historyTransaction);
}

module.exports = {getCredit, creditConsumption, buyCredit, myTransacion}