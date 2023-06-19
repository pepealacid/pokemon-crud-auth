import { useEffect, useState } from "react";
import { Text, Button, Flex } from "@chakra-ui/react";
import WildPokemon from "../../components/WildPokemon";
import pokemonService from "../../../services/pokemon.service";
import "./Meadow.css";

const Meadow = () => {
  const [pokemons, setPokemons] = useState([]);

  useEffect(() => {
    fetchPokemons();
  }, []);

  const fetchPokemons = async () => {
    try {
      const response = await pokemonService.getAll();
      const allPokemons = response.data;
      const randomPokemons = getRandomPokemons(allPokemons);
      setPokemons(randomPokemons);
    } catch (error) {
      console.error("Error fetching pokemons:", error);
    }
  };

  const getRandomPokemons = (pokemons) => {
    const shuffled = pokemons.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 3);
  };

  const handleCreateNewPokemons = () => {
    fetchPokemons();
  };

  return (
    <div className="container">
    <div className="top-half">
      <Flex direction="column" align="center" justify="center" height="100%">
        <Text className="poke-title">A capturar!!</Text>
        <Button onClick={handleCreateNewPokemons}>Buscar otros Pokemons</Button>
      </Flex>
      </div>
      <div className="lower-half">
        {pokemons.map((pokemon) => (
          <WildPokemon
            key={pokemon._id}
            imageUrl={pokemon.image}
            name={pokemon.name}
          />
        ))}
      </div>
    </div>
  );
};

export default Meadow;
