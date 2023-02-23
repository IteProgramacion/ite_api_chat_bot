const {Router} = require('express')
const {listUsers} = require("../controllers/users");
const router = Router();

router.post('/listUser', listUsers);

module.exports = router;