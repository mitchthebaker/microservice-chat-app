import { gql } from "apollo-server";

const schema = gql`
  scalar Date

  type User {
    username: ID!
  }

  type UserSession {
    createdAt: Date!
    expiresAt: Date!
    user: User!
  }

  type Chat {
    id: ID!
    createdAt: Date!
    message: String!
    username: String!
  }

  type Mutation {
    createUser(password: String!, username: String!): User!
    createUserSession(password: String!, username: String!): UserSession!
    deleteUserSession(me: Boolean!): Boolean!
    createChat(username: String!, message: String!): Chat!
  }

  type Query {
    userSession(me: Boolean!): UserSession
    getChats(username: String!): [Chat!]!
  }
`;

// ! in graphql means data is non nullable. 
// by default data is nullable.

export default schema;