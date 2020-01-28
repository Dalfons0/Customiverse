import { IResolvers } from 'apollo-server';

const resolvers: IResolvers = {
  Query: {
    popular: async (_, { page = 1, perPage = 12 }, { dataSources }) => {
      const things: any[] = await dataSources.thingAPI.getPopularThings({ page, perPage });

      return { page, perPage, result: things.slice(0, perPage), hasMore: things!.length > perPage };
    },
    thing: async (_, { id }, { dataSources }) => dataSources.thingAPI.getThingById({ thingId: id }),
  },
  Mutation: {
    login: async (_, __, { dataSources }) => process.env.ACCESS_TOKEN || 'missing_token',
  },
};

export default resolvers;
