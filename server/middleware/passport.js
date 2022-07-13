const GoogleStrategy = require("passport-google-oauth20").Strategy;
const GithubStrategy = require("passport-github2").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const passport = require("passport");
const User = require("../models/User");

module.exports = async (passport) => {
  await passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "/auth/google/callback",
      },
      async (accessToken, refreshToken, profile, done) => {
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
              isAdmin: profile.id == "101992761898538917962" ? true : false,
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
              isAdmin: profile.id == "101992761898538917962" || "94215047" ? true : false,
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
    new FacebookStrategy(
      {
        clientID: process.env.FACEBOOK_CLIENT_ID,
        clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
        callbackURL: "/auth/facebook/callback",
      },
      async (accessToken, refreshToken, profile, done) => {
        const account = await User.findOne({ googleId: profile.id });
        try {
          if (account) {
            return done(null, account);
          } else {
            const user = new User({
              fullName: profile.displayName,
              firstName: profile.displayName,
              lastName: profile.displayName,
              googleId: profile.id,
              avatar: "/uploads/user.png" || profile.photos[0].value,
              isAdmin: profile.id == "101992761898538917962" || "94215047" || "144115834895719" ? true : false,
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

  passport.serializeUser((user, done) => {
    done(null, user);
  });

  passport.deserializeUser((user, done) => {
    done(null, user);
  });
};
