const axios = require("axios");
const mongoose = require("mongoose");
const MONGO_URI =
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/pokemon-crud-API";

require("dotenv").config();
const Pokemon = require("../models/Pokemon.model");

const getPokemons = async () => {
  try {
    const response = await axios.get(
      "https://pokeapi.co/api/v2/pokemon/?limit=100"
    );
    const { results } = response.data;

    const pokemons = [];

    for (const pokemon of results) {
      const pokemonDetailsResponse = await axios.get(pokemon.url);
      const { name, sprites, types, order } = pokemonDetailsResponse.data;

      const newPokemon = new Pokemon({
        name: name,
        image: sprites.front_default,
        type: types.map((type) => type.type.name),
        order: order,
      });

      pokemons.push(newPokemon);
    }

    return pokemons;
  } catch (error) {
    console.error("Error retrieving Pokemon data from PokeAPI:", error);
    throw error;
  }
};

mongoose
  .connect(MONGO_URI)
  .then(async () => {
    console.log("Connected to DB!");

    try {
      const pokemons = await getPokemons();
      await Pokemon.deleteMany();
      await Pokemon.insertMany(pokemons);

      console.log("Pokemons added to the database:", pokemons.length);
    } catch (error) {
      console.error("Error inserting pokemons into the database:", error);
    } finally {
      mongoose.disconnect();
      console.log("Disconnected from DB!");
    }
  });
