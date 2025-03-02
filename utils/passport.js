const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth2").Strategy;


passport.use(new GoogleStrategy({
    clientID: process.env.CLIENTID,
    clientSecret: process.env.CLIENTSECRET,
    callbackURL: "http://localhost:1000/shop",
    passReqToCallback: true
  },
  async function(request, accessToken, refreshToken, profile, done) {
    return done(null,profile)
  }
));
 
passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user,done)=>{
    done(null,user)
});

module.exports = passport;