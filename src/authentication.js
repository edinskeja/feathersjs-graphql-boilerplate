import {
  AuthenticationService,
  JWTStrategy,
  authenticate,
} from "@feathersjs/authentication";
const { LocalStrategy } = require("@feathersjs/authentication-local");

module.exports = (app) => {
  const authentication = new AuthenticationService(app);

  authentication.register("jwt", new JWTStrategy());
  authentication.register("local", new LocalStrategy());

  // Set up authentication with the secret
  app.use("/authentication", authentication);
};
