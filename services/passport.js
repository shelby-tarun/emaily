const passport = require('passport');
const { Strategy: GoogleStrategy } = require('passport-google-oauth20');
const { Strategy: FacebookStrategy } = require('passport-facebook');
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('users');

passport.serializeUser((user, done) => {
    console.log('SerializeUser');
    done(null, user.id); // mongoose modal user_id in mongoDB
});
//Encodes user_id mongo with cookie
//Passport takes that user id and stores it internally on req.session.passport i.e req.session.passport.user = {id: 'xyz'}

passport.deserializeUser((id, done) => {
    console.log('DeSerializeUser');
    User.findById(id)
        .then((user) => {
            done(null, user);
        });
    //user_id to mongoose modal
});
/**
 * Deserialize user takes mongo user id and then searches it in DB
 * then if found return the user profile and assign it to req.user.
 * Then flow goes back to login callback
 */

passport.use(
    new GoogleStrategy({
        clientID: keys.googleClientID,
        clientSecret: keys.googleClientSecret,
        callbackURL: '/auth/google/callback',
        proxy: true
    }, (accessToken, refreshToken, profile, done) => {
        console.log('In middleware googleStrategy');
        User.findOne({ googleID: profile.id })
            .then((existingUser) => {
                if (!existingUser) {
                    new User({ googleID: profile.id }).save().then(user => done(null, user));
                } else {
                    done(null, existingUser);
                }
            });
    })
);

passport.use(
    new FacebookStrategy({
        clientID: keys.facebookClientID,
        clientSecret: keys.facebookClientSecret,
        callbackURL: '/auth/facebook/callback'
    }, (accessToken, refreshToken, profile, done) => {
        User.findOne({ facebookID: profile.id })
            .then((existingUser) => {
                if (!existingUser) {
                    new User({ facebookID: profile.id }).save().then(user => done(null, user));
                } else {
                    done(null, existingUser);
                }
            })
    })
);