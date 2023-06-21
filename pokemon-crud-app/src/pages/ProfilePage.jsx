import React, { useState, useEffect } from "react";
import authService from "../../services/auth.service";
import pokemonService from "../../services/pokemon.service";
import { Link } from "react-router-dom";
import { Box, Heading, Text, Button, Flex, Image } from "@chakra-ui/react";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [pokemons, setPokemons] = useState([]);

  const obtainUser = async () => {
    const token = localStorage.getItem("authToken");
    const response = await authService.getUser(token);
    const user = response.data;
    return user;
  };

  const fetchPokemons = async () => {
    const user = await obtainUser();
    setUser(user);

    const promises = user.team.map(async (pokemonId) => {
      const response = await pokemonService.getOne(pokemonId);
      const pokemon = response.data;
      return pokemon;
    });

    const pokemonInfo = await Promise.all(promises);
    setPokemons(pokemonInfo);
  };

  const quitPokemon = async (id) => {
    try {
      await pokemonService.quitPokemon(id);
      fetchPokemons();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPokemons();
  }, []);

  return (
    <Box p={4}>
      <Heading as="h1" mb={4}>
        Mi equipo Pokemon
      </Heading>
      {pokemons.length > 0 ? (
        pokemons.map((pokemon) => (
          <Box
            key={pokemon._id}
            borderWidth="1px"
            borderRadius="md"
            p={4}
            mb={4}
            position="relative"
            backgroundColor={"red"}
          >
            <Text>{pokemon.order}</Text>
            <Text>{pokemon.name}</Text>
            <Image src={pokemon.image} alt="" boxSize="100px" objectFit="cover" mb={2} />
            <Button onClick={() => quitPokemon(pokemon._id)} mt={2}>
              Abandonar Pokemon
            </Button>
          </Box>
        ))
      ) : (
        <div>
          <Text >No tienes pokemons</Text>
          <Link to="/meadow">Vamos a capturar alguno!</Link>
        </div>
      )}
      <Link style={{padding: "10px", border: "1px solid black", borderRadius: "10px"}} to="/create-pokemon">Crea tu propio Pokemon</Link>
    </Box>
  );
};

export default ProfilePage;
