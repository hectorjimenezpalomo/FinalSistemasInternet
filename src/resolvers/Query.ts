import { Pokemon } from '../models/Pokemon';
import { getUserFromToken } from '../utils/auth';

export const Query = {
  me: async (_: any, __: any, { user }: any) => {
    if (!user) return null;
    return user.populate({ path: 'pokemons', populate: { path: 'pokemon' } });
  },
  pokemons: async (_: any, { page = 1, size = 10 }: any) => {
    const skip = (page - 1) * size;
    return Pokemon.find().skip(skip).limit(size);
  },
  pokemon: async (_: any, { id }: any) => {
    return Pokemon.findById(id);
  }
};
