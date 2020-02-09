import { IResolvers } from 'apollo-server';
import { Thing } from './model';

const resolvers: IResolvers = {
  Query: {
    popular: async (_, { page = 1, perPage = 12 }, { dataSources }) => {
      const things: Thing[] = await dataSources.thingAPI.getPopularThings({ page, perPage });

      return { page, perPage, result: things.slice(0, perPage), hasMore: things!.length > perPage };
    },
    thing: async (_, { id }, { dataSources }) => dataSources.thingAPI.getThingById({ thingId: id }),
  },
  Mutation: {
    login: async (_, { code }, { dataSources }) => dataSources.authAPI.getAccessToken(code),
  },
};

export default resolvers;
