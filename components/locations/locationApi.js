const locations = require('express').Router();
const User = require('../users');
const Location = require('../locations');
const { AppError } = require('../../util/errors/appError');
const { commonErrors, commonHTTPErrors } = require('../../constants/errors');

/* GET user locations */
locations.get('/', async (req, res, err) => {
  const user = req.user;
  try {
    const locations = await User.locations(user);
    res.status(200).send({ locations });
  } catch (error) {
    console.log(error)
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
  // TODO - check params
  const context = {
    location: req.body.location,
    user: req.user
  }
  try {
    const location = await Location.save(context);
    if (location) {
      res.status(200).send({ location })
    } else {
      res.status(commonHTTPErrors.internalError).send('failed');
    }
  } catch (e) {
    console.log(e)
    res.status(commonHTTPErrors.internalError).send('Location Creation Failed');
  }
});

module.exports = locations;
