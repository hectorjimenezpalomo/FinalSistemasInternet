import mongoose from 'mongoose';

const trainerSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  pokemons: [{ type: mongoose.Schema.Types.ObjectId, ref: 'OwnedPokemon' }]
});

export const Trainer = mongoose.model('Trainer', trainerSchema);
