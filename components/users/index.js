const { User, Location } = require('../../models');

module.exports = {
  find: (id) => {
    return User.findByPk(id);
  },
  findByEmail: (email) => {
    return User.findOne({ where: { email } });
  },
  locations: (user) => {
    /**
     * Here we are finding all Locations and including the
     * relationship to Users as 'users' since the model defines
     * the relationship that way and only including results where 
     * the user's id matched what we passed in and finally not 
     * including any of the user's attributes for clean output.
     */
    return Location.findAll({
      include: [{
        model: User,
        as: 'users',
        where: { id: user.id },
        attributes: []
       }]
    });
  }
}