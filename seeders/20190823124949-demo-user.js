const bcrypt = require('bcrypt');

module.exports = {
  up: (queryInterface, Sequelize) => {
    const fields = [{
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@gmail.com',
      password: bcrypt.hashSync('password', 10),
      createdAt: new Date(),
      updatedAt: new Date()
    }];
    return queryInterface.bulkInsert('Users', fields, { validate: true })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
