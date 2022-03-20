import { gql } from "apollo-server";

const schema = gql`
  scalar Date

  type User {
    id: ID!
    username: String!
  }

  type UserSession {
    createdAt: Date!
    expiresAt: Date!
    id: ID!
    user: User!
  }

  type Mutation {
    createUser(password: String!, username: String!): User!
    createUserSession(password: String!, username: String!): UserSession!
    deleteUserSession(me: Boolean!): Boolean!
  }

  type Query {
    userSession(me: Boolean!): UserSession
  }
`;

// ! in graphql means data is non nullable. 
// by default data is nullable.

export default schema;