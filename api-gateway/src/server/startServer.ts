import { ApolloServer } from "apollo-server-express";
import {
  ApolloServerPluginLandingPageGraphQLPlayground
} from "apollo-server-core";
import express, { Request, Response, NextFunction } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import config from "config";

import resolvers from "#root/graphql/resolvers";
import schema from "#root/graphql/schema";

import formatGraphQLErrors from "./formatGraphQLErrors";
import injectSession from "./middleware/injectSession";

const PORT = <number>config.get("PORT");

const startServer = async () => {
  const apolloServer = new ApolloServer({
    context: (a) => a,
    formatError: formatGraphQLErrors,
    resolvers,
    typeDefs: schema,
    plugins: [
      ApolloServerPluginLandingPageGraphQLPlayground
    ]
  });

  const app = express();

  app.use(cookieParser());

  app.use(
    cors({
      credentials: true,
      origin: (origin, cb) => cb(null, true),
    })
  );

  app.use(injectSession);

  await apolloServer.start();

  apolloServer.applyMiddleware({ app, cors: false, path: "/graphql" });

  app.listen(PORT, "0.0.0.0", () => {
    console.info(`API gateway listening on ${PORT}`);
  });
};

export default startServer;