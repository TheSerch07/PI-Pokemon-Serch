export default function Pokemon( {name, img, health, attack} ) {
    console.log(health)
    console.log(name)
    console.log(img)
    return ( 
    <div>
        <h1>{name}</h1>
        <img src={img} alt="img" />
        <h1> Attack: {attack} </h1>
        <h1> Health: {health} </h1>
    </div>
    )
}