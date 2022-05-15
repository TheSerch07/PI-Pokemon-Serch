import axios from "axios"
export const FETCH_POKEMON = "FETCH_POKEMON"
export const FETCH_POKEMON_NAME = "FETCH_POKEMON_NAME"

export function fetchPokemons() {
    return function(dispatch) {
        axios.get("http://localhost:3001/pokemon/")
        .then((pokemons) => {
            dispatch({
                type: FETCH_POKEMON,
                payload: pokemons.data
            })
        })
        .catch((err) => console.log(err))
    }
}

export function fetchPokemonsName(name) {
    return function(dispatch) {
        axios.get("http://localhost:3001/pokemon/?name=" + name)
        .then((pokemons) => {
            dispatch({
                type: FETCH_POKEMON_NAME,
                payload: pokemons.data
            })
        })
        .catch((err) => console.log(err))
    }
}
