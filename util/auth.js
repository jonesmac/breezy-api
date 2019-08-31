module.exports = (req, res, next) => {
  if(req.isAuthenticated()) {
    next()
  } else {
    throw new Error('Not Authenticated');
  }
}