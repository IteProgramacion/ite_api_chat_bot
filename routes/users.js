const {Router} = require("express");
const {iniciarSesion} = require("../controllers/users");
const router = Router();

router.post('/', iniciarSesion);

module.exports = router;