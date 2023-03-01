const {Router} = require('express')
const {listUsers, registerUser, userLogin} = require("../controllers/users");
const router = Router();

router.post('/listUser', listUsers);
router.post('/registerUser', registerUser);
router.post('/userLogin', userLogin);

module.exports = router;