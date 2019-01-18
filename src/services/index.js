import user from "./user/users.service";
import post from "./post/post.service";
import graphql from "./graphql/graphql.service";

module.exports = app => {
  app.configure(user);
  app.configure(post);
  app.configure(graphql);
};
