const passport = require('passport');
const { Strategy: GoogleStrategy } = require('passport-google-oauth20');
const { Strategy: FacebookStrategy } = require('passport-facebook');
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('users');

passport.serializeUser((user, done) => {
    done(null, user.id); // mongoose modal user_id in mongoDB
});
//Encodes user_id mongo with cookie
//Passport takes that user id and stores it internally on req.session.passport i.e req.session.passport.user = {id: 'xyz'}

passport.deserializeUser(async (id, done) => {
    const user = await User.findById(id);
    done(null, user);
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
    }, async (accessToken, refreshToken, profile, done) => {
        const existingUser = await User.findOne({ googleID: profile.id });

        if (existingUser) {
            return done(null, existingUser);
        }

        const user = await new User({ googleID: profile.id }).save();

        done(null, user);
    })
);

passport.use(
    new FacebookStrategy({
        clientID: keys.facebookClientID,
        clientSecret: keys.facebookClientSecret,
        callbackURL: '/auth/facebook/callback',
        proxy: true
    }, async (accessToken, refreshToken, profile, done) => {
        const existingUser = await User.findOne({ facebookID: profile.id });

        if (existingUser) {
            done(null, existingUser);
        }

        const user = await new User({ facebookID: profile.id }).save();

        done(null, user);
    })
);