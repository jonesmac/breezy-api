const locations = require('express').Router({ mergeParams: true });

const { Location, User } = require('../../models');

/* GET user locations */
locations.get('/', async (req, res, err) => {
  const user = req.user;
  const locations = await Location.findAll({
    model: user,
        through: {
          attributes: []
        }
  })
  res.status(200).send({ locations })
});

module.exports = locations;
