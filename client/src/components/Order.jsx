export default function Order() {
    function actualSelect(e) {
        console.log(e.target.value)
    }
    return <select onChange={actualSelect}>
        <option value="Ascendente">A-Z</option>
        <option value="Descendente">Z-A</option>
    </select>
}