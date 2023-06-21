const WildPokemon = ({ imageUrl, name }) => {
    return(
        <div>
            <img src={imageUrl} alt={name} />
        </div>
    )
}

export default WildPokemon