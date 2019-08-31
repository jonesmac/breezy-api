'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    const fields = [{
      zipCode: 44122,
      label: 'Shaker Heights',
      userLocationId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }];
    return queryInterface.bulkInsert('Locations', fields, { validate: true });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Locations', null, {});
  }
};
