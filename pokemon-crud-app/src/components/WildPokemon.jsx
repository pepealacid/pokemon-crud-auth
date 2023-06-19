const WildPokemon = ({ imageUrl, name }) => {
    console.log(imageUrl)
    return(
        <div>
            <img src={imageUrl} alt={name} />
        </div>
    )
}

export default WildPokemon