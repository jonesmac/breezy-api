const { User, Location } = require('../../models');

module.exports = {
  get: (id) => {
    return User.findByPk(id);
  },
  locations: (user) => {
    return user.myLocations(user, Location);
  }
}