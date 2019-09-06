module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Locations', 'userLocationId');
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Locations', 'userLocationId', { type: Sequelize.INTEGER });
  }
};
