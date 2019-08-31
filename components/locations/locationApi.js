const locations = require('express').Router({ mergeParams: true });

const { Location } = require('../../models');

/* GET user locations */
locations.get('/', async (req, res, err) => {
  const user = req.user;
  const locations = await user.myLocations({ Location, user });
  res.status(200).send({ locations })
});

module.exports = locations;
