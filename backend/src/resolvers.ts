import { IResolvers } from 'apollo-server';

const resolvers: IResolvers = {
  Query: {
    popular: async (_, { page = 1, perPage = 15 }, { dataSources }) => {
      const things: any[] = await dataSources.thingAPI.getPopularThings({page, perPage});
      
      return { page, perPage, result: things.slice(0, perPage), hasMore: things!.length > perPage};
    },
    thing: async (_, { id }, { dataSources }) => dataSources.thingAPI.getThingById({ thingId: id }),
  },
};

export default resolvers;
