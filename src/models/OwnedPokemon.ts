import mongoose from 'mongoose';

const ownedPokemonSchema = new mongoose.Schema({
  pokemon: { type: mongoose.Schema.Types.ObjectId, ref: 'Pokemon', required: true },
  nickname: { type: String },
  attack: { type: Number, required: true },
  defense: { type: Number, required: true },
  speed: { type: Number, required: true },
  special: { type: Number, required: true },
  level: { type: Number, required: true }
});

export const OwnedPokemon = mongoose.model('OwnedPokemon', ownedPokemonSchema);
