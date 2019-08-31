const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const inflection = require('inflection');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config.js')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

const componentDir = `${__dirname }/../components/`;

/* 
 * Loop through components directories and match the model 
 * file as a singularized string of the folder and import to sequelize
*/
fs.readdirSync(componentDir)
  .filter(folder => {
    return fs.readdirSync(componentDir + folder)
      .forEach(file => {
        if (file === `${inflection.singularize(folder)}.js`) {
          const modelPath = path.join(componentDir, folder, file);
          const model = sequelize['import'](modelPath);
          db[model.name] = model;
        }
      });
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

module.exports = db;