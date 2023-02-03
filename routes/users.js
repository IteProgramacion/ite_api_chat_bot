const {Router} = require("express");
const {iniciarSesion, userSearch} = require("../controllers/users");
const router = Router();

router.post('/', iniciarSesion);
router.post('/userSearch/', userSearch);
router.post('/saveNewUser/', iniciarSesion);

module.exports = router;