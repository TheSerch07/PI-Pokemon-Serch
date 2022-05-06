import axios from "axios"
export const FETCH_POKEMON = "FETCH_POKEMON"

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