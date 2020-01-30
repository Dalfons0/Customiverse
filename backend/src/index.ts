import { ApolloServer, gql } from 'apollo-server';
import ThingAPI from './datasources/thing';
import resolvers from './resolvers';
import typeDefs from './schema';

const server = new ApolloServer({
  context: async ({ req }) => ({ token: req.headers.authorization }),
  typeDefs,
  resolvers,
  dataSources: () => ({ thingAPI: new ThingAPI() }),
});

server.listen().then(({ url }) => {
  // tslint:disable-next-line
  console.log(`🚀  Server ready at ${url}`);
});
