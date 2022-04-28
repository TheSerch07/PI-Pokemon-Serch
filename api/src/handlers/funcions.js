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
        // .then(r => r.json())
        // .then(data => console.log(data.data.results))
    // const infoP = [...info.data]
    // await console.log( "ESTOOOO",info, "ES INFOPOOO")
    // console.log(infoP, "info ppppp")
    // return info
    const infoP = [...info.data.results]
    const infoPF = await Promise.all(
        infoP.map((p) => axios.get(p.url))
    )
    let array = []
    infoPF.forEach((p) => {
        array.push({...pInfo(p)})
    })
    return array
}

async function getPokemonDb() {
    let infoPDb = []
    infoPDb = await Pokemon.findAll({
        include: {
            model: Type,
            atributes: ["name"],
            thorugh: {
                atributes: []
            }
        }
    })

    infoPDb = infoPDb.map((p) => {
        return {...p.dataValues, type: pInfoType(p.dataValues)}
    })

    return infoPDb.reverse()
}

async function postPokemonDb({ id, name, health, attack, defense, speed, height, weight, type, img }) {
    const newPokemon = await Pokemon.create({id, name, health, attack, defense, speed, height, weight, img})
    const typeDb = await Type.findAll({
        where: {
            name: type
        }
    })
    await newPokemon.addTypes(typeDb)
    return newPokemon
}
// getPokemonAPI()

module.exports={
    pInfo,
    pInfoDetail,
    pInfoType,
    getPokemonAPI,
    getPokemonDb,
    postPokemonDb
}