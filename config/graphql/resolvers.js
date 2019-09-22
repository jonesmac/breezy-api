const user = require('../../components/users');
const location = require('../../components/locations')

module.exports = {
  resolvers: {
    Query: {
      myLocations(parent, args, context, info) {
        return user.locations(context.user);
      },
      myLocation(parent, args, context, info) {
        return user.location(context.user, args.id);
      }
    },
    Mutation: {
      createLocation(parent, args, context, info) {
        return location.save({ location: args.location, user: context.user });
      },
      deleteLocation(parent, args, context, info) {
        return location.delete({ locationId: args.id, user: context.user})
      }
    }
  }
};