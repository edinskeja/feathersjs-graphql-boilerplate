import authentication from "@feathersjs/authentication";
import jwt from "@feathersjs/authentication-jwt";
import local from "@feathersjs/authentication-local";

module.exports = app => {
  const config = app.get("authentication");

  // Set up authentication with the secret
  app.configure(authentication(config));
  app.configure(jwt());
  app.configure(local());

  // This hook customizes your payload.
  const customizeJWTPayload = () => hook => {
    hook.result.user = hook.params.user;
    return Promise.resolve(hook);
  };

  app.service("authentication").hooks({
    before: {
      create: [authentication.hooks.authenticate(config.strategies)],
      remove: [authentication.hooks.authenticate("jwt")]
    },
    after: {
      create: [customizeJWTPayload()]
    }
  });
};
