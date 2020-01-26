import { ApolloServer, gql } from 'apollo-server';
import typeDefs from './schema';
import resolvers from './resolvers';
import ThingAPI from './datasources/thing';

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
  context: async ({ req }) => ({ token: req.headers.authorization }),
  typeDefs,
  resolvers,
  dataSources: () => ({ thingAPI: new ThingAPI() }),
});

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
