const users = require('express').Router();

/* GET users listing. */
users.get('/', (req, res, next) => {
  console.log('Inside the GET Users route');
  console.log(req.sessionID);
  res.status(200).send({ message: 'Here should be users' });
});

/* POST user create */
users.post('/', (req, res, next) => {
  // TODO - implement User Creation
  res.status(201).send({ success: 'User Successfully Created'});
});

module.exports = users;
