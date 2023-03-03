const {Router} = require('express')
const {getCredit} = require("../../controllers/payments_credits_consumption/credits_controller");
const router = Router();

router.get('/getCredit', getCredit);



module.exports = router;