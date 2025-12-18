import mongoose from 'mongoose';

const pokemonSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  height: { type: Number, required: true },
  weight: { type: Number, required: true },
  types: [{ type: String, required: true }]
});

export const Pokemon = mongoose.model('Pokemon', pokemonSchema);
