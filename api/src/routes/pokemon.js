const { Router } = require("express");
const { getPokemon, getPokemonById, postPokemon } = require("../handlers/pokemon")

const router = Router()

router.get("/", getPokemon)
router.get("/:id", getPokemonById)
router.post("/", postPokemon) 

module.exports = router