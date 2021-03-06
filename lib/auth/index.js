const User = require('../models/user.model');
const authStrategies = {
  local : require('../auth/local'),
  signup : require('../auth/signup')
};

module.exports = function (passport) {
  // serialize sessions
  passport.serializeUser((user, done)=>{
    done(null, user.id)
  });

  passport.deserializeUser((id, done)=>{
    User.findById(id, (err, user)=>{
      done(err, user)
    })
  });

 // use these strategies
 authStrategies.local(User, passport);
 authStrategies.signup(User, passport);
};