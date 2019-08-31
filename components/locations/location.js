const Sequelize = require('sequelize');

module.exports = (sequelize, dataTypes) => { 
  const Model = Sequelize.Model;
  class Location extends Model {}
  Location.init({
    zipcode: Sequelize.STRING,
    label: Sequelize.STRING,
    userLocationId: Sequelize.INTEGER
  }, {
    sequelize,
    modelName: 'Location'
  });
  Location.associations = (models) => {
    Location.belongsToMany(
      models.User,
      {
        through: models.UserLocation,
      }
    );
  };
  Location.sync();
  return Location;
};