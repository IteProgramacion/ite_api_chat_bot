const {Router} = require('express')
const {
    getCredit,
    creditConsumption,
    buyCredit,
    myTransacion
} = require("../../controllers/payments_credits_consumption/credits_controller");
const router = Router();

router.get('/getCredit', getCredit);
router.post('/creditConsumption', creditConsumption);
router.post('/buyCredit', buyCredit);
router.get('/myTransaction', myTransacion);


module.exports = router;