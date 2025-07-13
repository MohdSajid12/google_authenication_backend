const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/User"); 

console.log("Google callback URL:", process.env.GOOGLE_CALLBACK_URL);


passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Check if user exists
        const existingUser = await User.findOne({ googleId: profile.id });
        if (existingUser) return done(null, existingUser);

        // Creating new user
        const newUser = new User({
          googleId: profile.id,
          displayName: profile.displayName,
          email: profile.emails && profile.emails[0] ? profile.emails[0].value : "no-email@example.com",
        });

        await newUser.save();
        done(null, newUser);
      } catch (err) {
        console.error("Error:", err);
        done(err, null); 
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    console.error("Error :", err);
    done(err, null);
  }
});
