// Initializes the `users` service on path `/users`
import createService from "feathers-nedb";
import createModel from "../../models/post.model";
import hooks from "./post.hooks";

module.exports = app => {
  const Model = createModel(app);
  const paginate = app.get("paginate");

  const options = {
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use("/post", createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service("post");

  service.hooks(hooks);
};
