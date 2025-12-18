import { Trainer } from '../models/Trainer';
import { Pokemon } from '../models/Pokemon';
import { OwnedPokemon } from '../models/OwnedPokemon';
import { createToken, hashPassword, comparePassword } from '../utils/auth';
import { randomStats } from '../utils/randomStats';

export const Mutation = {
  startJourney: async (_: any, { name, password }: any) => {
    const existing = await Trainer.findOne({ name });
    if (existing) throw new Error('Trainer already exists');
    const hashed = await hashPassword(password);
    const trainer = await Trainer.create({ name, password: hashed, pokemons: [] });
    return createToken(trainer);
  },
  login: async (_: any, { name, password }: any) => {
    const trainer = await Trainer.findOne({ name });
    if (!trainer) throw new Error('Invalid credentials');
    const valid = await comparePassword(password, trainer.password);
    if (!valid) throw new Error('Invalid credentials');
    return createToken(trainer);
  },
  createPokemon: async (_: any, args: any, { user }: any) => {
    if (!user) throw new Error('Unauthorized');
    return Pokemon.create(args);
  },
  catchPokemon: async (_: any, { pokemonId, nickname }: any, { user }: any) => {
    if (!user) throw new Error('Unauthorized');
    if (user.pokemons.length >= 6) throw new Error('Team full');
    const pokemon = await Pokemon.findById(pokemonId);
    if (!pokemon) throw new Error('Pokemon not found');
    const stats = randomStats();
    const owned = await OwnedPokemon.create({ pokemon: pokemon._id, nickname, ...stats });
    user.pokemons.push(owned._id);
    await user.save();
    return owned.populate('pokemon');
  },
  freePokemon: async (_: any, { ownedPokemonId }: any, { user }: any) => {
    if (!user) throw new Error('Unauthorized');
    if (!user.pokemons.includes(ownedPokemonId)) throw new Error('Not your pokemon');
    await OwnedPokemon.findByIdAndDelete(ownedPokemonId);
    user.pokemons = user.pokemons.filter((p: any) => p.toString() !== ownedPokemonId);
    await user.save();
    return user.populate({ path: 'pokemons', populate: { path: 'pokemon' } });
  }
};
