const GoogleStrategy = require("passport-google-oauth20").Strategy;
const GithubStrategy = require("passport-github2").Strategy;
const User = require("../models/User");
const token = require('../controllers/token')

module.exports = async (passport) => {
  await passport.use(
    new GoogleStrategy({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    }, async (accessToken, refreshToken, profile, done) => {
      const account = await User.findOne({ googleId: profile.id });

      try {
        if (account) {
          return done(null, account);
        } else {
          const user = new User({
            fullName: profile.displayName,
            firstName: profile.name.givenName,
            lastName: profile.name.familyName,
            googleId: profile.id,
            avatar: profile.photos[0].value,
            isAdmin: profile.id == process.env.ADMIN_GOOGLE_ID ? true : false,
          });
          await user.save();
          return done(null, user);
        }
      } catch (error) {
        console.log(error);
      }
    }
    )
  );
  await passport.use(
    new GithubStrategy(
      {
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: "/auth/github/callback",
      },
      async (accessToken, refreshToken, profile, done) => {
        const account = await User.findOne({ googleId: profile.id });
        try {
          if (account) {
            return done(null, account);
          } else {
            const user = new User({
              fullName: profile.displayName,
              firstName: profile.username,
              lastName: profile.displayName,
              googleId: profile.id,
              avatar: profile.photos[0].value,
              isAdmin: profile.id == process.env.ADMINGITHUBID || process.env.ADMINID ? true : false,
            });

            await user.save();
            return done(null, user);
          }
        } catch (error) {
          console.log(error);
          req.session.authorization = false;
        }
      }
    )
  );
  passport.serializeUser((user, done) => {
    done(null, user);
  });
  passport.deserializeUser((user, done) => {
    done(null, user);
  });
};
