const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { User } = require('../../models');

module.exports = {
  setupPassport: function () {
    passport.use(new LocalStrategy(
      { usernameField: 'email' },
      async (email, password, done) => {
        try {
          const currentUser = await User.findOne({ where: { email } })
          const passwordMatch = await currentUser.verifyPassword(password);
          return passwordMatch ? 
            done(null, currentUser) :
            done(null, false, { message: 'Invalid credentials.\n' });
        } catch {
          return done(null, false, { message: 'Invalid credentials.\n' });
        }
      }
    ));

    passport.serializeUser((user, done) => {
      done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
      const user = User.findOne({ where: { id } });
      user
        .then(currentUser => done(null, currentUser))
        .catch(err => done(null, false, { message: 'User not found' }))
    });
  },
  addPassport: function (app) {    
    app.use(passport.initialize());
    app.use(passport.session());
  }
};