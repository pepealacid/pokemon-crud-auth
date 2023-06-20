const router = require("express").Router();
const mongoose = require("mongoose");
const Pokemon = require("../models/Pokemon.model.js");
const { getUserByEmail } = require("../controllers/user.controller");
const { isAuthenticated } = require("../middlewares/verifyToken.middleware.js");

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
    const pokemon = await pokemon.findById(_id);
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

router.post("/add-pokemon/:id", isAuthenticated, async (req, res, next) => {
  try {
    const { id } = req.params;
    const { email } = req.payload;
    const objectId = mongoose.Types.ObjectId(id);

    try {
      const user = await getUserByEmail(email);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      user.team.push(objectId);
      await user.save();
      return res.status(200).json({ message: "Pokémon added to team successfully" });
    } catch (error) {
      console.error("Error adding Pokémon to team:", error);
      return res.status(500).json({ message: "Failed to add Pokémon to team" });
    }
  } catch (error) {
    next(error);
  }
});


// Delete a pokemon

router.delete("/:_id", async (req, res, next) => {
  try {
    const { _id } = req.params;
    await Pokemon.findByIdAndDelete(_id);
    return res
      .status(200)
      .json({ message: `The pokemon with ID: ${_id}has been deleted` });
  } catch (error) {
    next(error);
  }
});

// Edit a pokemon

router.put("/:_id", async (req, res, next) => {
  try {
    const { _id } = req.params;
    const editedPokemon = await Pokemon.findByIdAndUpdate(_id, req.body, {
      new: true,
    });
    return res.status(200).json(editedPokemon);
  } catch (error) {
    next(error);
  }
});
module.exports = router;
