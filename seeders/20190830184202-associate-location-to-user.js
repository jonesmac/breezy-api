const { sequelize } = require('../config/db');
const { User, Location } = require('../models');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const user = await User.findByPk(1);
    const location = await Location.findByPk(1);
    return sequelize.transaction(t => {
      return user.addLocation(location, { transaction: t })
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('UserLocations', null, {});
  }
};
