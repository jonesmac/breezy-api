const Sequelize = require('sequelize');

module.exports = (sequelize, dataTypes) => { 
  const Model = Sequelize.Model;
  class Location extends Model {}
  Location.init({
    zipcode: {
      type: Sequelize.STRING,
      allowNull:false,
      validate: {
        notEmpty: true,
        isNumeric: true
      }
    },
    label: {
      type: Sequelize.STRING,
      allowNull:false,
      validate: {
        notEmpty: true
      }
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
    Location.addScope('forUser', (user, id) => ({
      include: [{
        // belongsToMany Relationship
        model: User,
        // alias
        as: 'users',
        // user field to match
        where: { id: user.id },
        // do not include any user attributes
        attributes: []
       }],
       where: id ? { id } : null
    }))
  };
  Location.sync();
  return Location;
};