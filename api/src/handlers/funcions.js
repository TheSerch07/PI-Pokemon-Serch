const { Pokemon, Type } = require("../db.js");
// const fetch = require("node-fetch");
const axios = require("axios");

function pInfo(data) {
    return {
        id: data.data.id,
        name: data.data.name,
        health: data.data.stats[0].base_stat,
        attack: data.data.stats[1].base_stat,
        sprites: data.data.sprites.other.dream_world.front_default,
        type: data.data.types.map((t) => t.type.name)
    }
}

function pInfoDetail(data) {
    return {
        id: data.data.id,
        name: data.data.name,
        health: data.data.stats[0].base_stat,
        attack: data.data.stats[1].base_stat,
        defense: data.data.stats[2].base_stat,
        speed: data.data.stats[5].base_stat,
        height: data.data.height,
        weight: data.data.weight,
        img: data.data.sprites.other.dream_world.front_default,
        type: data.data.types.map((t) => t.type.name)
    }
}

function pInfoType(data) {
    return data.types.map((t) => t.dataValues.name)
}

async function getPokemonAPI() {
    const info = await axios('https://pokeapi.co/api/v2/pokemon?limit=12')
    const infoP = [...info.data.results]
    const infoPF = await Promise.all(
        infoP.map((p) => axios.get(p.url))
    )
    let arrayPokemonsApi = []
    infoPF.forEach((p) => {
        arrayPokemonsApi.push({...pInfo(p)})
    })
    return arrayPokemonsApi
}

async function getPokemonApiName(name) {
    const infoForName = await axios.get('https://pokeapi.co/api/v2/pokemon/' + name)
    console.log(pInfo(infoForName))
    return pInfo(infoForName)
}

async function getPokemonApiId(id) {
    const infoForId = await axios.get('https://pokeapi.co/api/v2/pokemon/' + id)
    return pInfoDetail(infoForId)
}

async function getPokemonDb() {
    const pokeDataBase = await Pokemon.findAll({
        include: {
            model: Type,
            attributes: ["name"]
        }
    })
    return pokeDataBase
}

async function getPokemonDbName(name) {
    const pokeDataBaseName = await Pokemon.findOne({
        include: Type,
        where: {
            name
        }
    })
    return pokeDataBaseName
}

async function getPokemonDbId(id) {
    const pokeDataBaseId = await Pokemon.findByPk(id, {
        include: {
            model: Type
        }
    })
    return pokeDataBaseId
}

async function postPokemonDb({ name, health, attack, defense, speed, height, weight, types, img }) {
    const newPokemon = await Pokemon.create({name, health, attack, defense, speed, height, weight, img})
    const typeDb = await Type.findAll({
        where: {
            name: types
        }
    })
    await newPokemon.addType(typeDb)
    return newPokemon
}

async function getTypes() {
    const typesInDb = await Type.findAll()
    if (typesInDb.length < 1) {
    const typesApi = await axios.get('https://pokeapi.co/api/v2/type')
    const typesArray = typesApi.data.results.map((t) => {
        return {
            name: t.name
        }
    })
    await Type.bulkCreate(typesArray)
}
}


async function getTypesDb() {
    let typesInDb = await Type.findAll()
    // typesInDb = typesInDb.map((t) => {t.toJSON()})
    console.log(typesInDb, "lo que estoy retornando")
    return typesInDb
}


module.exports={
    pInfo,
    pInfoDetail,
    pInfoType,
    getPokemonAPI,
    getPokemonApiName,
    getPokemonApiId,
    getPokemonDb,
    getPokemonDbName,
    getPokemonDbId,
    postPokemonDb,
    getTypes,
    getTypesDb
}