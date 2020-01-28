import { ApolloServer, gql } from 'apollo-server';
import typeDefs from './schema';
import resolvers from './resolvers';
import ThingAPI from './datasources/thing';

const server = new ApolloServer({
  context: async ({ req }) => ({ token: req.headers.authorization }),
  typeDefs,
  resolvers,
  dataSources: () => ({ thingAPI: new ThingAPI() }),
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
