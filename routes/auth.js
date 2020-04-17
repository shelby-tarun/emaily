const express = require('express');
const router = express.Router();

const passport = require('passport');

router.get(
    '/google',
    passport.authenticate('google', {
        scope: ['profile', 'email']
    })
);
router.get('/google/callback', passport.authenticate('google'));

router.get('/facebook', passport.authenticate('facebook'));
router.get('/facebook/callback', passport.authenticate('facebook'));


module.exports = router;
