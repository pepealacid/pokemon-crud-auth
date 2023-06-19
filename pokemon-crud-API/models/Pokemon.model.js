const { Schema, model } = require("mongoose");

const pokemonSchema = new Schema(
  {
    name: {
      type: String,
    },
    image: {
      type: String,
      default: "https://www.pngmart.com/files/2/Pokeball-PNG-Photos.png"
    },
    type: {
        type: [String]
    },
    order: {
        type: Number
    },
  },
  {
    timestamps: true
  }
);

const Pokemon = model("Pokemon", pokemonSchema);

module.exports = Pokemon;
