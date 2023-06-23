const router = require("express").Router();
const mongoose = require("mongoose");
const Pokemon = require("../models/Pokemon.model.js");
const { isAuthenticated } = require("../middlewares/verifyToken.middleware.js");
const User = require("../models/User.model.js");

router.get("/", async (req, res, next) => {
  try {
    const pokemons = await Pokemon.find();
    return res.status(200).json(pokemons);
  } catch (error) {
    next(error);
  }
});

router.get("/:_id", async (req, res, next) => {
  try {
    const { _id } = req.params;
    const pokemon = await Pokemon.findById(_id);
    return res.status(200).json(pokemon);
  } catch (error) {
    next(error);
  }
});

// Create pokemon

router.post("/", async (req, res, next) => {
  try {
    if (req.body.name) {
      const newPokemon = await Pokemon.create(req.body);
      return res.status(201).json(newPokemon);
    }
    return res
      .status(400)
      .json({ message: "Bad request, the pokemon name is needed" });
  } catch (error) {
    next(error);
  }
});

router.put("/add-pokemon", isAuthenticated, async (req, res, next) => {
  try {
    const { id: pokemon_id } = req.body;
    const { _id: user_id } = req.payload;

    try {
      
     await User.findByIdAndUpdate(user_id, {$push: { team: pokemon_id} })
     console.log("hemos añadido", pokemon_id, user_id)
      return res.status(200).json({ message: "Pokémon added to team successfully" });
    } catch (error) {
      console.error("Error adding Pokémon to team:", error);
      return res.status(500).json({ message: "Failed to add Pokémon to team" });
    }
  } catch (error) {
    next(error);
  }
});

router.put("/quit-pokemon", isAuthenticated, async (req, res, next) => {
  const { id: pokemon_id } = req.body;
  const { _id: user_id } = req.payload;

  try {
    await User.findByIdAndUpdate(user_id, { $pull: { team: pokemon_id } });
    return res.status(200).json({ message: "Pokémon removed from team successfully" });
  } catch (error) {
    console.error("Error removing Pokémon from team:", error);
    return res.status(500).json({ message: "Failed to remove Pokémon from team" });
  }
});

module.exports = router;
