const Sequelize = require('sequelize');

module.exports = (sequelize, dataTypes) => { 
  const Model = Sequelize.Model;
  class Location extends Model {}
  Location.init({
    zipcode: {
      type: Sequelize.STRING,
      allowNull:false,
      validate: {
        notEmpty: true
      }
    },
    label: {
      type: Sequelize.STRING,
      allowNull:false,
      validate: {
        notEmpty: true
      }
    },
    userLocationId: {
      type: Sequelize.INTEGER
    }
  }, {
    sequelize,
    modelName: 'Location'
  });
  Location.associate = ({ User, UserLocation}) => {
    Location.belongsToMany(
      User,
      {
        through: UserLocation,
        as: 'users'
      }
    );
  };
  Location.sync();
  return Location;
};