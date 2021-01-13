import passport from 'passport';
import localStrategy from './strategies/local.strategy.js';

localStrategy();

function passportConfig(app) {
  app.use(passport.initialize());
  app.use(passport.session());

  // Stores suer in session
  passport.serializeUser((user, done) => {
    done(null, user);
  });

  // Retrieves user from session
  passport.deserializeUser((user, done) => {
    done(null, user);
  });
}

export { passportConfig as default };
