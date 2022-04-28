const { Pokemon, Type } = require("../db.js");
const axios = require("axios")
const { pInfo, pInfoDetail, pInfoType, getPokemonAPI, getPokemonDb, postPokemonDb } = require("./funcions.js")

const getPokemon = async (req, res) => {
    try {
        const { name } = req.query;
        if (name) {
            let pApi = await axios.get('https://pokeapi.co/api/v2/pokemon/' + name)
            // pApi = pInfo(pApi)
            let pApiArray = [pInfo(pApi)]
            console.log(pApiArray)
            if (pApiArray){
                return res.status(200).send(pApiArray)
            } else {
                const pName = name.trim().toLowerCase()
                let pDataBase = await Pokemon.findOne({
                    where: {
                        name: pName
                    }
                }) 
                if (pDataBase) {
                    pDataBase = {
                        ...pDataBase.dataValues,
                        type: pInfoType(pDataBase)
                    }
                    return res.status(200).send([pDataBase])
                }
            }
    
        } else {
            const pokeDb = await getPokemonDb()
            const pokeApi = await getPokemonAPI()
            return res.status(200).send([...pokeApi, ...pokeDb])
    }
    } catch(err) {
        res.status(400).send({msg: "Pokemon not found!"})
    }
}

const getPokemonById = async (req, res) => {
    try {
        const { id } = req.params
        // const pokeDbId = await getPokemonDb()
        // if (id.length > 2) {
        //     let pokeDbIdFilter = await pokeDbId.filter(p => p.id === id)
        //     pokeDbIdFilter.length ? res.status(200).json(pokeDbIdFilter) : res.status(400).send({msg: "Pokemon not found!"})
        // } else {
            let pokeApiId = await axios.get('https://pokeapi.co/api/v2/pokemon/' + id)
            // pokeApiId = pInfoDetail(pokeApiId)
            // console.log(pokeApiId)
            let pokeApiIdArray = [pInfoDetail(pokeApiId)]
            return res.send(pokeApiIdArray)
    } catch(err) {
        res.status(400).send({msg: "Pokemon not found"})
    }
}

const postPokemon = async (req, res) => {
    try {
        const values = req.body
        const createPokemon = await postPokemonDb(values)
        createPokemon.dataValues? res.send({msg: "Pokemon created!", id: createPokemon.dataValues.id}) : res.status(400).send({msg: "Enter the data correctly"})
    } catch (err) {
        res.status(400).send({msg: err})
    }
}

module.exports = {
    getPokemon,
    getPokemonById,
    postPokemon
}