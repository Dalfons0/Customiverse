import { IResolvers } from 'apollo-server';

const resolvers: IResolvers = {
  Query: {
    popular: async (_, __, { dataSources }) => dataSources.thingAPI.getPopularThings(),
    thing: async (_, { id }, { dataSources }) => dataSources.thingAPI.getThingById({ thingId: id }),
  },
};

export default resolvers;
