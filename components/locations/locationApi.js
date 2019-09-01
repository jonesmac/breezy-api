const locations = require('express').Router({ mergeParams: true });
const User = require('../users');
const { AppError } = require('../../util/errors/appError');
const { commonErrors, commonHTTPErrors } = require('../../constants/errors');

/* GET user locations */
locations.get('/', async (req, res, err) => {
  const user = req.user;
  try {
    const locations = await User.locations(user);
    res.status(200).send({ locations });
  } catch (error) {
    const errMessage = 'Failed when fetching locations';
    res.status(commonHTTPErrors.internalError).send(errMessage)
    throw new AppError(
      commonErrors.internalError,
      commonHTTPErrors.internalError,
      errMessage,
      false
    );
  }
});

/* POST user locations */
locations.post('/', async (req, res, err) => {
  // TODO
});

module.exports = locations;
