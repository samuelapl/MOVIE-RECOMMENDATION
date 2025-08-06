import { gql } from 'apollo-server-express';

const typeDefs = gql`
  # Based on your Movie.model.js
  type Genre {
    id: Int
    name: String
  }

  type Movie {
    _id: ID! # MongoDB ID
    id: Int # TMDB ID
    title: String!
    poster_path: String
    overview: String
    release_date: String
    runtime: Int
    vote_average: Float
    genres: [Genre]
  }

  # Based on your User.js
  type User {
    _id: ID!
    username: String!
    email: String!
    favorites: [Movie!]!
    # Other fields can be added here as needed
  }

  # The root Query type for fetching data
  type Query {
    getFavorites: User!
  }

  # The root Mutation type for modifying data
  type Mutation {
    addToFavorites(movieId: Int!): User!
    removeFromFavorites(movieId: Int!): User!
  }
`;

export default typeDefs;