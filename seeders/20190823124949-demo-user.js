const bcrypt = require('bcrypt');
const User = require('../components/users');

module.exports = {
  up: (queryInterface, Sequelize) => {
    const fields = {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@gmail.com',
      password: bcrypt.hashSync('password', 10),
      createdAt: new Date(),
      updatedAt: new Date()
    };
    return User.findOrCreate({ 
      where: { email: 'john.doe@gmail.com' },
      defaults: fields
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
