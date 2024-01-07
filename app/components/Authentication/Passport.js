const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const User = require('../../model/UserSchema'); // Đảm bảo đường dẫn đúng

passport.use(new LocalStrategy(
  {
    usernameField: 'email',
    passwordField: 'password',
  },
  (email, password, done) => {
    User.findOne({ email: email }).exec()
      .then(user => {
        if (!user) {
          return done(null, false, { message: 'Incorrect email.' });
        }
        if (!user.verifyPassword(password)) {
          return done(null, false, { message: 'Incorrect password.' });
        }
        return done(null, user);
      })
      .catch(err => {
        return done(err);
      });
  }
));

passport.use(new FacebookStrategy({
  clientID: process.env.FACEBOOK_APP_ID,
  clientSecret: process.env.FACEBOOK_APP_SECRET,
  callbackURL: "http://localhost:3000/authen/facebook/callback",
  profileFields: ['id', 'displayName', 'name', 'email']
},
async function(accessToken, refreshToken, profile, done) {
  try {
    const user = await User.findOne({ 'facebookId': profile.id });

    if (user) {
      console.log("Đã đăng nhập bằng Facebook rồi");
      return done(null, user, { redirectTo: '/shop' });
    } else {
      const newUser = new User({
        facebookId: profile.id,
        first_name: profile.name.givenName,
        last_name: profile.name.familyName,
        email: `${Math.floor(100000 + Math.random() * 900000).toString()}@gmail.com` ,
        password: profile.id,
        // Bạn có thể thêm các trường khác tùy ý
      });

      await newUser.save();
      return done(null, newUser);
    }
  } catch (err) {
    console.error(err);
    return done(err);
  }
}));

module.exports = passport;
