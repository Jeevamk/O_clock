const passport = require("passport");
const userCollection = require("../model/user_model");
const GoogleStrategy = require("passport-google-oauth2").Strategy;
const dotenv = require("dotenv").config({ path: "config.env" });

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "https://oclock.digital/auth/google/callback",
      passReqToCallback: true,
    },
    async (request, accessToken, refreshToken, profile, done) => {
      console.log('profile', profile)
      const userExist = await userCollection.findOne({
        // googleId: profile.id,
        email : profile.emails[0].value
      });
      console.log("userexist",userExist);
      if (userExist) {
        return done(null, userExist);
      }

      const userData = new userCollection({
        name: profile.displayName,
        googleId: profile.id,
        email: profile.emails[0].value,
        status: "Active",
      });
      

      await userData.save();

       done(null, userData);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});


