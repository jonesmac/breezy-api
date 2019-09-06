const Op = require('Sequelize').Op;
const { Location, UserLocation } = require('../../models');
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
  },
  delete: ({locationId, user}) => {
    return sequelize.transaction(t => {
      return Location.destroy({ where: { id: locationId } }, { transaction: t })
      .then(() => UserLocation.destroy({ where: {
        [Op.and]: {
          userId: user.id,
          locationId
        }
      }}), { transaction: t })
    }) 
  }
}