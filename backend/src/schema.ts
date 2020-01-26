import { gql } from 'apollo-server';

const typeDefs = gql`
  type Query {
    popular: [Thing]
    thing(id: ID!): Thing
  }

  type Thing {
    id: ID!
    name: String
    thumbnail: String
    creator: Creator
    is_private: Boolean!
    is_purchased: Boolean!
    is_published: Boolean!
  }

  type Creator {
    id: ID!
    name: String
    thumbnail: String
  }
`;

export default typeDefs;
