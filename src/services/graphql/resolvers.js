import request from "request-promise";

module.exports = app => {
  const Users = app.service("users");
  const Post = app.service("post");
  const PubSub = app.get("pubsub");

  const localRequest = request.defaults({
    baseUrl: `http://${app.get("host")}:${app.get("port")}`,
    json: true
  });

  return {
    User: {
      fullName(user, args, context) {
        return `${user.firstName} ${user.lastName}`;
      },
      posts(user, args, context) {
        return Post.find({ query: { userId: user._id } }).then(r => r.data);
      }
    },
    Post: {
      author(post, args, context) {
        return Users.get(post.userId);
      }
    },
    Authorized: {
      user(auth, args, context) {
        return auth.user;
      }
    },
    RootQuery: {
      me(root, args, context) {
        return Users.find(context).then(r => {
          return r.data[0];
        });
      },
      posts(root, { category }, context) {
        return Post.find({ query: { category } }).then(r => r.data);
      }
    },
    RootMutation: {
      signUp(root, args, context) {
        return Users.create(args);
      },
      login(root, { email, password }, context) {
        return localRequest({
          uri: "/authentication",
          method: "POST",
          body: {
            strategy: "local",
            email: email,
            password: password
          }
        });
      },
      createPost(root, { post }, context) {
        return Post.create(post, context).then(post => {
          PubSub.publish("postCreated", post);
          return post;
        });
      }
    },
    RootSubscription: {
      postCreated: {
        resolve: payload => payload,
        subscribe: () => PubSub.asyncIterator(["postCreated"])
      }
    }
  };
};
