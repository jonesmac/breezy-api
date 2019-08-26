const router = require('express').Router();
const passport = require('passport');

/* POST create login session */
router.post('/', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    // handles errors from the Strategy
    if (info) { return res.status(404).send(info.message) }

    // handle internal errors
    if (err) { return next(err); }

    // handle case were we somehow got an empty user
    if (!user) { return res.status(404).send({ error: 'Invalid Credentials' }); }

    req.login(user, (err) => {
      if (err) { return next(err); }
      res.send({ success: `Successfully authenticated ${user.email}` });
    })
  })(req, res, next)
})

module.exports = router;