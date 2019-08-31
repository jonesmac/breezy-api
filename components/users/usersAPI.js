const users = require('express').Router();
const locations = require('../locations/locationApi')

/* GET users listing. */
users.get('/', (req, res, next) => {
  console.log('Inside the GET Users route');
  console.log(req.sessionID);
  res.status(200).send({ message: 'Here should be users' });
});

/* POST user create */
users.post('/', (req, res, next) => {
  res.status(201).send({ success: 'User Successfully Created'});
});

users.use('/:userId/locations', locations);

module.exports = users;
