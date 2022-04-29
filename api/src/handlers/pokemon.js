const { Pokemon } = require("../db.js");
const axios = require("axios")
const { pInfo, pInfoDetail, pInfoType, getPokemonAPI,  getPokemonApiName, getPokemonDb, postPokemonDb } = require("./funcions.js")

const getPokemon = async (req, res, next) => {
    try {
        const { name } = req.query;
        if (name) {
            const pApiName= await getPokemonApiName(name)
            if (pApiName) {
                return res.status(200).json(pApiName)
            }
            // } else {
            //     const pName = name.trim().toLowerCase()
            //     let pDataBase = await Pokemon.findOne({
            //         where: {
            //             name: pName
            //         }
            //     }) 
            //     if (pDataBase) {
            //         pDataBase = {
            //             ...pDataBase.dataValues,
            //             type: pInfoType(pDataBase)
            //         }
            //         return res.status(200).send([pDataBase])
            //     }
            // }
    
        } else {
            const pokeDb = await getPokemonDb()
            const pokeApi = await getPokemonAPI()
            return res.status(200).json([...pokeDb, ...pokeApi])
    }
    } catch(err) {
        next(err)
    }
}

const getPokemonById = async (req, res, next) => {
    try {
        const { id } = req.params
        // const pokeDbId = await getPokemonDb()
        // if (id.length > 2) {
        //     let pokeDbIdFilter = await pokeDbId.filter(p => p.id === id)
        //     pokeDbIdFilter.length ? res.status(200).json(pokeDbIdFilter) : res.status(400).send({msg: "Pokemon not found!"})
        // } else {
        //     const idDataBase = id.includes("-")
        //     console.log(idDataBase)
        //     console.log(id, "este es el Id")
        // if(idDataBase) {
        //     let pokeDbIdFilter = await getPokemonDb(id)
        //     console.log(pokeDbIdFilter, "el filtro de la base de datos")
        // }
            let pokeApiId = await axios.get('https://pokeapi.co/api/v2/pokemon/' + id)
            let pokeApiIdArray = [pInfoDetail(pokeApiId)]
            return res.send(pokeApiIdArray)
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