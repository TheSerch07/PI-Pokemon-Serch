import { useState } from "react"
import { useDispatch } from "react-redux"
import { FETCH_POKEMON_NAME, fetchPokemonsName } from "../store/actions"
export default function SearchBar() {
    let dispatch = useDispatch()
    const [search, setSearch] = useState("")
    function onSubmit(e) {
        e.preventDefault()
        dispatch(fetchPokemonsName(search))
    }
    function onInputChange(e) {
        setSearch(e.target.value)
    }
    return (
    <div>
        <form onSubmit={onSubmit}>
            <input type="text" placeholder="Name Pokemon" onChange={onInputChange} value={search}/>
            <input type="submit" value="Search Pokemon!" />
        </form>
    </div>
    )
}