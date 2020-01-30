import ThingAPI from '../datasources/thing';

export interface ApolloContext {
  dataSources: {
    thingAPI: ThingAPI;
  }
}