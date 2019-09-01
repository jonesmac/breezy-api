const { User, Location } = require('../../models');

module.exports = {
  find: (id) => {
    return User.findByPk(id);
  },
  findByEmail: (email) => {
    console.log(email)
    return User.findOne({ where: { email } });
  },
  locations: (user) => {
    return user.myLocations(user, Location);
  }
}