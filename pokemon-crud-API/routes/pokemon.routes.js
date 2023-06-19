const router = require("express").Router()
const Pokemon = require("../models/Pokemon.model.js")


router.get("/", async(req, res, next)=>{
    try {
        const pokemons = await Pokemon.find()
        return res.status(200).json(pokemons)
    } catch (error) {
        next(error)
    }
})

router.get("/:_id", async(req, res, next)=>{
    try {
        const {_id} = req.params
        const pokemon = await pokemon.findById(_id)
        return res.status(200).json(pokemon)
    } catch (error) {
        next(error)
    }
})

// Create pokemon

router.post("/", async(req,res,next)=>{
    try {
        if (req.body.name){
            const newPokemon = await Pokemon.create(req.body)
            return res.status(201).json(newPokemon)
        }
        return res.status(400).json({ message: "Bad request, the pokemon name is needed" })
    } catch (error) {
        next(error)
    }
})

// Delete a pokemon

router.delete("/:_id", async(req,res,next)=>{
    try {
        const {_id} = req.params
        await Pokemon.findByIdAndDelete(_id)
        return res.status(200).json({ message: `The pokemon with ID: ${_id}has been deleted` });
    } catch (error) {
        next(error);
    }
})

// Edit a pokemon

router.put("/:_id", async(req,res,next)=>{
    try {
        const { _id } = req.params;
        const editedPokemon = await Pokemon.findByIdAndUpdate(_id, req.body, { new: true });
        return res.status(200).json(editedPokemon);
    } catch (error) {
        next(error);
    }
})
module.exports = router