var config        = require('./config'),
    User          = require('../models/user'),
    JwtStrategy   = require('passport-jwt').Strategy,
    ExtractJwt    = require('passport-jwt').ExtractJwt;

module.exports = function (passport) {
    var opts = {
        jwtFromRequest: ExtractJwt.fromAuthHeader(),
        secretOrKey: config.secret
    };

    passport.use(new JwtStrategy(opts, function(jwt_payload, done) {

        User.findOne( {_id: jwt_payload.id}, function(err, user) {

            if (err) { return done( err, false); }

            if (user) {
                done( null, {id: user._id, name: user.name, email: user.email});
            } else {
                done( null, false );
            }
        });
    }));
};