const { Pokemon, Type } = require("../db.js");
const axios = require("axios")
const { pInfo, pInfoDetail, pInfoType, getPokemonAPI, getPokemonDb } = require("./funcions.js")

const getPokemon = async (req, res) => {
    try {
        const { name } = req.query;
        if (name) {
            name = name.trim().toLowerCase()
            let pDb = await Pokemon.findOne({
                where: {
                    name: name
                },
                include: Type
            })
            if (pDb) {
                pDb = {
                    ...pDb.dataValues,
                    type: pInfoType(pDb)
                }
                let pDbArray = [pDb]
                return res.send(pDbArray)
            } else {
                let pApi = await axios.get('https://pokeapi.co/api/v2/pokemon/' + name)
                pApi = pInfo(pApi)
                let pApiArray = [pApi]
                if (pApiArray){
                    return res.send(pApiArray)
                }
            }
        }

        else {
            const pokeDb = await getPokemonDb()
            const pokeApi = await getPokemonAPI()
            return res.send([...pokeApi, ...pokeDb])
        }
    } catch(err) {
        res.status(400).send({msj: "Pokemon not found!"})
    }
}

const getPokemonById = async (req, res) => {
    try {
        const { id } = req.params
        const pokeDbId = await getPokemonDb()
        if (id.length > 2) {
            let pokeDbIdFilter = await pokeDbId.filter(p => p.id === id)
            pokeDbIdFilter.length ? res.status(200).json(pokeDbIdFilter) : res.status(400).send({msj: "Pokemon not found!"})
        } else {
            let pokeApiId = await axios('https://pokeapi.co/api/v2/pokemon/' + id)
            pokeApiId = pInfoDetail(pokeApiId)
            return res.send(pokeApiId)
        }
    } catch(err) {
        res.status(400).send({msj: err})
    }
}