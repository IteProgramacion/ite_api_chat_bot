const {Router} = require("express");
const {iniciarSesion, userSearch, userRegister, userLogin} = require("../../controllers/users/users_ite");
const router = Router();

router.post('/', iniciarSesion);
router.post('/userSearch/', userSearch);
router.post('/userRegister/', userRegister);
router.post('/userLogin/', userLogin);

module.exports = router;