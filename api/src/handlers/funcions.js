const { Pokemon, Type } = require("../db.js");
// const fetch = require("node-fetch");
const axios = require("axios")

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

// async function getPokemonDb(id) {
//     // const infoPDb = []
//     const infoPDb = await Pokemon.findByPk(id, {
//         attributes: ['name']
//     })
//     console.log(infoPDb, "k esta pasando?")
//     return infoPDb

    // return infoPDb
    
    // infoPDb = infoPDb.map((p) => {
    //     return {...p.dataValues, type: pInfoType(p.dataValues)}
    // })
    
    // return infoPDb.reverse()
// }

async function getPokemonDb() {
    const pokeDataBase = await Pokemon.findAll({})
    return pokeDataBase
}
// const apiLlamada = await Pokemon.findByPk(id, {
//     attributes: ["name"]
// })

// console.log(apiLlamada, "aaaaa")

async function postPokemonDb({ name, health, attack, defense, speed, height, weight, type, img }) {
    const newPokemon = await Pokemon.create({name, health, attack, defense, speed, height, weight, img})
    const typeDb = await Type.findAll({
        where: {
            name: type
        }
    })
    await newPokemon.addType(typeDb)
    return newPokemon
}
// getPokemonAPI()

// postPokemonDb("Poke2", 5, 5, 5, 5, 5, 5, "a", "a")

module.exports={
    pInfo,
    pInfoDetail,
    pInfoType,
    getPokemonAPI,
    getPokemonApiName,
    getPokemonDb,
    postPokemonDb
}