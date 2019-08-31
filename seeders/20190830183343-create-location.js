const { Location } = require('../models');

module.exports = {
  up: (queryInterface, Sequelize) => {
    const defaults = {
      zipCode: 44122,
      label: 'Shaker Heights',
      userLocationId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    return Location.findOrCreate({
      where: { zipCode: 44122 },
      defaults
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Locations', null, {});
  }
};
