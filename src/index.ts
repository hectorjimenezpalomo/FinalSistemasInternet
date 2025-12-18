import { ApolloServer } from 'apollo-server';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { typeDefs } from './schema';
import { resolvers } from './resolvers';
import { getUserFromToken } from './utils/auth';

dotenv.config();

mongoose.connect(process.env.MONGO_URI!).then(() => console.log('Conectado a db'));

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const token = req.headers.authorization || '';
    const user = await getUserFromToken(token.replace('Bearer ', ''));
    return { user };
  }
});

server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
  console.log(`🚀 Server listo en ${url}`);
});
