const bycrypt = require('bcrypt');

const LocalStratergy = require('passport-local').Strategy

function initialize(passport) {
    passport.use(new LocalStratergy({ usernameField: 'email'}),authenticateUser)
}


// module.exports = initialize;