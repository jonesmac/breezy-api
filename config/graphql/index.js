const { ApolloServer } = require('apollo-server-express');
const resolvers = require('./resolvers').resolvers;
const typeDefs = require('./typeDefs');
const User = require('../../components/users');
const graphQLPath = '/graphql';

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req, res, next }) => {
    const user = await User.find(1);
    req.user = user;
    return { user };
  },
  playground: {
    settings: {
      'request.credentials': 'same-origin'
    },
    tabs: [
      {
        endpoint: '/graphql'
      },
    ],
  }
});

module.exports = function(app) {
  server.applyMiddleware({ app, path: graphQLPath });
}
