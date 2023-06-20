import { useEffect, useState } from "react";
import { Text, Button, Flex } from "@chakra-ui/react";
import WildPokemon from "../../components/WildPokemon";
import pokemonService from "../../../services/pokemon.service";
import "./Meadow.css";
import { Link } from "react-router-dom";

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

  const handleAddPokemon = async (id) => {
    try {
      await pokemonService.addPokemon(id);
      fetchPokemons();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
      <div className="top-half">
        <Flex direction="column" align="center" justify="center" height="100%">
          <Text className="poke-title">A capturar!!</Text>
          <Button onClick={handleCreateNewPokemons}>
            Buscar otros Pokemons
          </Button>
        </Flex>
      </div>
      <div className="lower-half">
        {pokemons.map((pokemon) => (
          <Link key={pokemon._id} onClick={() => handleAddPokemon(pokemon._id)} >
            <WildPokemon
              key={pokemon._id}
              imageUrl={pokemon.image}
              name={pokemon.name}
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Meadow;
