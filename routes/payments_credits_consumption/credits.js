const {Router} = require('express')
const {getCredit, updateCredit} = require("../../controllers/payments_credits_consumption/credits_controller");
const router = Router();

router.get('/getCredit', getCredit);
router.post('/updateCredit', updateCredit);



module.exports = router;