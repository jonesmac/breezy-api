'use strict';
const models = require('../models');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const user = await models.User.findByPk(1);
    const location = await models.Location.findByPk(1);
    return user.setLocations([location]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('UserLocations', null, {});
  }
};
