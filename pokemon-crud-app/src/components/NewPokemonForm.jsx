import React, { useState, useEffect } from "react";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Select,
  Button,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import pokemonService from "../../services/pokemon.service";

const CreatePokemonForm = () => {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [type, setType] = useState("");
  const [lastOrder, setLastOrder] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLastOrder = async () => {
      const response = await pokemonService.getAll();
      const pokemons = response.data;
      if (pokemons.length > 0) {
        const highestOrder = Math.max(...pokemons.map((pokemon) => pokemon.order));
        setLastOrder(highestOrder);
      }
    };

    fetchLastOrder();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newOrder = lastOrder + 1;

    const newPokemon = {
      name,
      image: image || undefined,
      type,
      order: newOrder,
    };

    const createdPokemon = await pokemonService.create(newPokemon)
    await pokemonService.addPokemon(createdPokemon.data._id)

    setName("");
    setImage("");
    setType("");
    navigate("/profile")
  };

  return (
    <Box as="form" onSubmit={handleSubmit} maxW="sm" m="auto">
      <FormControl id="name" mb={4}>
        <FormLabel>Name</FormLabel>
        <Input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </FormControl>
      <FormControl id="image" mb={4}>
        <FormLabel>Image URL</FormLabel>
        <Input
          type="text"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
      </FormControl>
      <FormControl id="type" mb={4}>
        <FormLabel>Type</FormLabel>
        <Select
          value={type}
          onChange={(e) => setType(e.target.value)}
          required
        >
          <option value="fire">Fire</option>
          <option value="water">Water</option>
          <option value="grass">Grass</option>
          <option value="electric">Electric</option>
        </Select>
      </FormControl>
      <Button type="submit" colorScheme="blue">
        Create Pokemon
      </Button>
    </Box>
  );
};

export default CreatePokemonForm;
