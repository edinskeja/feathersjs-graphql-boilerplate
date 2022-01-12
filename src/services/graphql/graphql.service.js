import { ApolloServer } from "apollo-server-express";
import { formatError } from "apollo-errors";
import { PubSub } from "graphql-subscriptions";

import Resolvers from "./resolvers";
import Schema from "./schema";

const isDev = process.env.NODE_ENV === "production" ? false : true;
const pubsub = new PubSub();

module.exports = (app) => {
  app.set("pubsub", pubsub);

  const server = new ApolloServer({
    tracing: isDev,
    introspection: isDev,
    playground: isDev,
    allowBatchedHttpRequests: isDev,
    typeDefs: Schema,
    resolvers: Resolvers(app),
    context: ({ req, connection }) => {
      if (connection) {
        // check connection for metadata
        return connection.context;
      }
      return {
        provider: req.feathers.provider,
        headers: {
          authorization: req.feathers.headers.authorization || "",
        },
      };
    },
    subscriptions: {
      onConnect: (connectionParams, webSocket, context) => {
        console.log("Connected!");
      },
      onDisconnect: (webSocket, context) => {
        console.log("Disconnected!");
      },
      path: "/subscriptions",
    },
    formatError,
  });

  server.applyMiddleware({ app });
  app.set("apollo", server);
};
