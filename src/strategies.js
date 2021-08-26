/* eslint-disable one-var */
const LocalStrategy = require('passport-local').Strategy,
  bcrypt = require('bcrypt'),
  UserModel = require('agradon/mongoose').model('User');

const localStrategy = new LocalStrategy(
  {
    usernameField: 'email',
    passwordField: 'password'
  },
  function(email, password, cb) {
    // Assume there is a DB module pproviding a global UserModel
    return UserModel.findOne({ email })
      .then(user => {
        if (!user) {
          return cb(null, false, { message: 'Incorrect email.' });
        }

        if (!bcrypt.compareSync(password, user.password)) {
          return cb(null, false, { message: 'Incorrect password.' });
        }

        return cb(null, user, {
          message: 'Logged In Successfully'
        });
      })
      .catch(err => {
        return cb(err);
      });
  }
);

module.exports = [localStrategy];
