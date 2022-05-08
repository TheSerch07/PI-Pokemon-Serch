import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPokemons } from "../store/actions";
import Pokemon from "./Pokemon";

export default function Pokemons() {
    let pokemons = useSelector((state) => state.pokemon)
    let dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchPokemons())
    }, [])
    console.log(pokemons)
    return (
    <div>
        {pokemons.map((pokemon) => {
            // console.log(pokemon)
            return < Pokemon key={pokemon.id} name={pokemon.name} img={pokemon.sprites} health={pokemon.health} attack={pokemon.attack} />
        })}
    </div>
    )
}