const { Op } = require("sequelize")
const axios = require("axios")
const { pInfo, pInfoDetail, pInfoType, getPokemonAPI,  getPokemonApiName, getPokemonApiId, getPokemonDb, getPokemonDbName, getPokemonDbId, postPokemonDb } = require("./funcions.js")

const getPokemon = async (req, res, next) => {
    try {
        const { name } = req.query;
        let pokeDb
        let pokeApi
        if (name) {
            pokeDb = await getPokemonDbName(name)
            if (pokeDb) return res.status(200).json([pokeDb])
            pokeApi = await getPokemonApiName(name)
            return res.status(200).json([pokeApi])
        } else {
            pokeDb = await getPokemonDb()
            pokeApi = await getPokemonAPI()
            return res.status(200).json([...pokeDb, ...pokeApi])
    }
    } catch(err) {
        next(err)
    }
}

const getPokemonById = async (req, res, next) => {
    try {
        const { id } = req.params
        let pokeApi
        let pokeDb
        if (id.length > 6) {
            pokeDb = await getPokemonDbId(id)
            return res.send([pokeDb])
        }
        pokeApi = await getPokemonApiId(id)
        return res.send([pokeApi])
    } catch(err) {
        next(err)
    }
}

const postPokemon = async (req, res, next) => {
    try {
        const values = req.body
        const createPokemon = await postPokemonDb(values)
        console.log(createPokemon, "jeje")
        createPokemon.dataValues? res.send({msg: "Pokemon created!", id: createPokemon.dataValues.id, name: "Su nombre es, " + createPokemon.dataValues.name + ". Que genial!"}) : res.status(400).send({msg: "Enter the data correctly"})
    } catch (err) {
        next(err)
    }
}

module.exports = {
    getPokemon,
    getPokemonById,
    postPokemon
}
//