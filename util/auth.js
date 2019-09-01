const { commonErrors, commonHTTPErrors } = require('../constants/errors');

module.exports = (req, res, next) => {
  if(req.isAuthenticated()) {
    next()
  } else {
    res.status(commonHTTPErrors.notFound).send(commonErrors.loginRequired)
  }
}