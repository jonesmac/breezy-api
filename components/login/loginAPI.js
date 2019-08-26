const router = require('express').Router();
const passport = require('passport');

/* POST create login session */
router.post('/', (req, res, next) => {
  console.log('Inside POST /login callback')
  passport.authenticate('local', (err, user, info) => {
    console.log('Inside authenticate');
    // handles errors from the Strategy
    if (info) { return res.status(404).send(info.message) }

    // handle internal errors
    if (err) { return next(err); }

    // handle case were we somehow got an empty user
    if (!user) { return res.status(404).send({ error: 'Invalid Credentials' }); }
    
    req.login(user, (err) => {
      console.log('Inside login');
      if (err) { return next(err); }
      res.send({ success: `Successfully authenticated ${user.email}` });
    })
  })(req, res, next)
})

module.exports = router;