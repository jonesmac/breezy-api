const Locations = 'Locations';
const userLocationId = 'userLocationId';
const getLocationTable = async (queryInterface) => {
  return await queryInterface.describeTable(Locations);
}

module.exports = {
  up: (queryInterface, Sequelize) => {
    if (getLocationTable(queryInterface)[userLocationId]) {
      return queryInterface.removeColumn(Locations, userLocationId);
    } else {
      return Promise.resolve();
    }
  },

  down: (queryInterface, Sequelize) => {
    if (!getLocationTable(queryInterface)[userLocationId]) {
      return queryInterface.addColumn('Locations', 'userLocationId', { type: Sequelize.INTEGER });
    } else {
      return Promise.resolve();
    }
  }
};
