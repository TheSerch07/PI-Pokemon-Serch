const { Pokemon, Type } = require("../db.js");
// const fetch = require("node-fetch");
const axios = require("axios")

function pInfo(data) {
    return {
        id: data.data.id,
        name: data.data.name,
        attack: data.data.stats[1].base_stat,
        sprites: data.data.sprites.other.dream_world.front_default,
        type: data.data.types.map((t) => t.type.name)
    }
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

module.exports={
    pInfo,
    getPokemonAPI
}