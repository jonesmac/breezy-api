const { ApolloServer } = require('apollo-server-express');
const resolvers = require('./resolvers').resolvers;
const typeDefs = require('./typeDefs');
const store = require('../session').store
const User = require('../../components/users');

const graphQLPath = '/graphql';
const playgroundHeaderName = 'playground-session';
const defaultQuery = `query MyLocations {
  myLocations {
    zipcode
    label
    id
  }
}

query MyLocation($id: ID!) {
  myLocation(id: $id) {
    zipcode
    label
    id
  }
}`

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req, res, next }) => {
    /**
     * In development, check for a header that has the session key we
     * want to use to test in playground
    */
    if (process.env.NODE_ENV !== 'production') {
      const playgroundHeader = req.headers[playgroundHeaderName];
      if (playgroundHeader) {
        try {
          const storedSession = await store.get(playgroundHeader);
          const user = await User.find(storedSession.passport.user);
          return { user };
        } catch(e) {
          throw new Error(`Unable to find user session from playground-session header ${playgroundHeader}`);
        }
      }
    }
    if (req.user === 'object') {
      return { user: req.user };
    } else {
      throw new Error('Unable to find user session')
    }
  },
  playground: {
    settings: {
      'request.credentials': 'include'
    },
    tabs: [
      {
        endpoint: graphQLPath,
        query: defaultQuery,
        variables: JSON.stringify({ id: 1 }),
        headers: {
          [playgroundHeaderName]: ''
        }
      },
    ],
  }
});

module.exports = function(app) {
  server.applyMiddleware({ app, path: graphQLPath });
}
