const Sequelize = require('sequelize');
const bcrypt = require('bcrypt');

module.exports = (sequelize) => {
  const Model = Sequelize.Model;
  class User extends Model {
    verifyPassword(password) {
      return bcrypt.compare(password, this.password);
    }
    myLocations(user) {
      return user.getLocations()
    }
  }
  User.init({
    firstName: Sequelize.STRING,
    lastName: Sequelize.STRING,
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
        notEmpty: true    
      }
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        isAtLeastFiveCharacters: (value) => {
          if (value.length < 5) {
            throw new Error('Password must be at least 5 characters long');
          }
        }
      }
    }
  }, {
    sequelize,
    modelName: 'User'
  });
  User.associate = ({ Location, UserLocation }) => {
    User.belongsToMany(
      Location,
      { through: UserLocation, as: 'locations' }
    );
  }
  User.sync();
  return User;
};