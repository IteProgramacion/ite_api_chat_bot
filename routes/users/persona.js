const {Router} = require("express");
const {
    personaGet,
    personaPut,
    personaPost,
    personaDelete,
    personaPatch
} = require("../../controllers/users/persona");
const router = Router();

router.get('/:id', personaGet);
router.put('/', personaPut);
router.post('/', personaPost);
router.patch('/', personaPatch);
router.delete('/', personaDelete);
module.exports = router;