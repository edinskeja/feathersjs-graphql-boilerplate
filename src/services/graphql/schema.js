module.exports = `
  enum Category {
    RANDOM
    TECH
    SPORTS
    OTHER
  }

  type User {
    _id: String!
    email: String
    firstName: String
    lastName: String
    fullName: String
    posts: [Post]
  }

  type Post {
    _id: String!
    title: String
    category: String
    summary: String
    content: String!
    createdAt: String
    author: User
  }

  type Authorized {
    accessToken: String
    user: User
  }

  input postInput {
    title: String!
    content: String!
    summary: String
    category: Category
  }

  type RootQuery {
    me: User
    posts(category: Category): [Post]
  }

  type RootMutation {
    createPost(post: postInput): Post
    signUp(email: String!, password: String!): User
    login(email: String!, password: String!): Authorized
  }

  type RootSubscription {
    postCreated: Post
  }

  schema {
    query: RootQuery
    mutation: RootMutation
    subscription: RootSubscription
  }
`;
