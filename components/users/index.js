const { User, Location } = require('../../models');

module.exports = {
  find: (id) => {
    return User.findByPk(id);
  },
  findByEmail: (email) => {
    return User.findOne({ where: { email } });
  },
  locations: (user) => {
    return Location.scope({ method: ['forUser', user]}).findAll();
  },
  location: (user, id) => {
    return Location.scope({ method: ['forUser', user, id]}).findOne();
  }
}