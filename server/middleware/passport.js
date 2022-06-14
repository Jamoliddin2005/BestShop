const GoogleStrategy = require("passport-google-oauth20").Strategy;
const passport = require("passport");
const User = require("../models/User");


module.exports = async (passport) => {
  await passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback",
  },
    async (accessToken, refreshToken, profile, done) => {
      // console.log(profile);
      const account = await User.findOne({ googleId: profile.id })
      try {
        if (account) {
          return done(null, account)
        } else {
          const user = new User({
            fullName: profile.displayName,
            firstName: profile.name.givenName,
            lastName: profile.name.familyName,
            googleId: profile.id,
            avatar: profile.photos[0].value,
            isAdmin: profile.id == "101992761898538917962" ? true : false
          })

          await user.save()
          // console.log(profile.displayName);
          // console.log(profile.name.givenName);
          // console.log(profile.name.familyName);
          // console.log(profile.id);
          // console.log(profile.photos[0].value);
          // console.log(profile.id == "101992761898538917962" ? true : false);

          return done(null, user)
        }
      } catch (error) {
        console.log(error);
      }
    }
  ));
  passport.serializeUser((user, done) => {
    done(null, user);
  });

  passport.deserializeUser((user, done) => {
    done(null, user);
  });

}
