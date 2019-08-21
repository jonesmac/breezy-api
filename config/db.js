const Sequelize = require('sequelize');

module.exports = function connect () {
  const sequelize = new Sequelize(process.env.MYSQL_DB_NAME, process.env.MYSQL_USER, process.env.MYSQL_PASSWORD, {
    host: process.env.MYSQL_HOST,
    dialect: 'mariadb',
    dialectOptions: {
      timezone: process.env.db_timezone
    },
    port: process.env.MYSQL_PORT,
    pool: {
      min: Number(process.env.CONNECTION_POOL_MIN),
      max: Number(process.env.CONNECTION_POOL_MAX),
      idle: 10000
    },
    define: {
      timestamps: true
    },
    benchmark: false,
    logging: false
  });

  sequelize
    .authenticate()
    .then(() => {
      console.log('Connection has been established successfully.');
    })
    .catch(err => {
      console.error('Unable to connect to the database:', err);
    });
}