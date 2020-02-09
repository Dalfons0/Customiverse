import { gql } from 'apollo-server';

const typeDefs = gql`
  type Query {
    popular(page: Int, perPage: Int): PaginatedThings
    thing(id: ID!): Thing
  }

  type Mutation {
    login(code: String): String # login token
  }

  type PaginatedThings {
    page: Int!
    perPage: Int!
    result: [Thing]
    hasMore: Boolean!
  }

  type Thing {
    id: ID!
    name: String
    thumbnail: String
    creator: Creator
    is_private: Boolean!
    is_purchased: Boolean!
    is_published: Boolean!
    like_count: Int
    collect_count: Int
    added: String
    description: String
  }

  type Creator {
    id: ID!
    name: String
    thumbnail: String
  }
`;

export default typeDefs;
