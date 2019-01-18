import logger from "./logger";
import app from "./app";

const port = app.get("port");
const apollo = app.get("apollo");
const server = app.listen(port);

// Subscription init
apollo.installSubscriptionHandlers(server);

process.on("unhandledRejection", (reason, p) =>
  logger.error("Unhandled Rejection at: Promise ", p, reason)
);

server.on("listening", () => {
  logger.info("🚀 Server ready at http://%s:%d", app.get("host"), port);
  logger.info(
    "🚀 Graphql ready at http://%s:%d/graphql",
    app.get("host"),
    port
  );
});
