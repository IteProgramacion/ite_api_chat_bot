const {request, response} = require("express");
const getCredit = async (req= request,res = response)=>{
    const {userUid,} = req.body;
    res.json(req.body);
}

module.exports = {getCredit}