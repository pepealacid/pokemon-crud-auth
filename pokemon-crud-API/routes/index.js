const router = require("express").Router();

router.use("/pokemons", require('./pokemon.routes'))
router.use("/auth", require("./auth.routes"))

module.exports = router;
