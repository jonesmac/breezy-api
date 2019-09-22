const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    id: Int!
    firstName: String
    lastName: String
    email: String!
    locations: [Location]!
  }

  type Location {
    id: Int!
    zipcode: Int!
    label: String!
  }

  type Query {
    myLocations: [Location]!
    myLocation(id: ID!): Location
  }

  input LocationInput {
    zipcode: Int!
    label: String!
  }

  type Mutation {
    createLocation(location: LocationInput!): Location
    deleteLocation(id: ID!): Boolean!
  }
`;

module.exports = typeDefs;