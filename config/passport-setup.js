const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20");
const User = require("../models/User");
const { clientID, clientSecret } = require("./keys").google;

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

passport.use(
  new GoogleStrategy(
    {
      callbackURL: "/auth/google/redirect",
      clientID,
      clientSecret,
    },
    async (accessToken, refreshToken, profile, done) => {
      // Passport callback function
      const user = await User.findOne({ googleId: profile.id });
      if (user) {
        done(null, user);
      } else {
        try {
          const newUser = await User.create({
            googleId: profile.id,
            name: profile.displayName,
            email: profile._json.email,
          });
          done(null, newUser);
        } catch (err) {
          console.log(err);
        }
      }
    }
  )
);
