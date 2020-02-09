import { ApolloServer } from 'apollo-server';
import AuthAPI from './datasources/authentication';
import ThingAPI from './datasources/thing';
import resolvers from './resolvers';
import typeDefs from './schema';

const server = new ApolloServer({
  context: async ({ req }) => ({ token: req.headers.authorization }),
  typeDefs,
  resolvers,
  dataSources: () => ({ thingAPI: new ThingAPI(), authAPI: new AuthAPI() }),
});

server.listen().then(({ url }) => {
  // tslint:disable-next-line
  console.log(`🚀  Server ready at ${url}`);
});
