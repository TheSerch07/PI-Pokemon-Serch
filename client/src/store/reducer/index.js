import { FETCH_POKEMON, FETCH_POKEMON_NAME } from "../actions"

const initialState = {
    pokemon: [],
    filteredPokemon: []
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_POKEMON:
            return {
                ...state,
                pokemon: action.payload
            }
        case FETCH_POKEMON_NAME:
            return {
                ...state,
                pokemon: action.payload
            }
        default: 
            return state
    }
}