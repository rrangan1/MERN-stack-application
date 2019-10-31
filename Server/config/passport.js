const passport = require('passport');
const path = require('path');
const secretKey = require(path.join(__dirname,'..','/routes/api/auth_keys','keys.js'));
const jwtStrategy = require('passport-jwt').Strategy;
const Extractjwt = require('passport-jwt').ExtractJwt;
const mongoose = require('mongoose');
const User = require(path.join(__dirname,'..','/model','User.js'));
const opts = {};
opts.jwtFromRequest = Extractjwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = secretKey.key ;
passport.use(new jwtStrategy(opts,(jwt_payload,done) => {
    console.log(jwt_payload);
    User.findOne({user_id:jwt_payload.user_id})
        .then((result) => {
            if(result){
                return done(null,result);
            }
            else {
                return done(null,false,{message:'Bad username and password combination they do  not match'});
            }
        })
        .catch((err) => {
            console.log(err);
        });
}));

module.exports = passport ;