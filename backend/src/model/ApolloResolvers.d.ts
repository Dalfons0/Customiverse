import { PopularResponse, Thing } from '.';

export interface ApolloResolvers {
  Query: Query;
  Mutation: Mutation;
}

export interface Query {
  popular: (source?: object, args?: any, context?: any) => Promise<PopularResponse>;
  thing: (source?: object, args?: any, context?: any) => Promise<Thing>;
}

export interface Mutation {
  login: () => Promise<string>;
}
