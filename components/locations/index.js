const { Location } = require('../../models');
const { sequelize } = require('../../config/db');

module.exports = {
  save: ({location, user}) => {
    return sequelize.transaction(t => {
      return Location.create(
        location,
        { transaction: t }
      )
      .then(savedLocation => user.addLocation(savedLocation, { transaction: t }))
      .then((userLocation) => {
        return Location.findByPk(userLocation[0].LocationId, { transaction: t })
      })
    })
  }
}