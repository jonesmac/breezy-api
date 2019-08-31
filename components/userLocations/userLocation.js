const Sequelize = require('sequelize');

module.exports = (sequelize) => {
  const Model = Sequelize.Model;
  class UserLocation extends Model {}
  UserLocation.init({
    userId: Sequelize.INTEGER,
    locationId: Sequelize.INTEGER
  }, {
    sequelize,
    modelName: 'UserLocation'
  });
  UserLocation.sync();
  return UserLocation;
};