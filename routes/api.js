const express = require('express');
const router = express.Router();
const keys = require('../config/keys');
const stripe = require('stripe')(keys.stripeSecretKey);
const requireLogin = require('../middlewares/requireLogin');

router.get('/current_user', (req, res) => {
  console.log(req.user);
  res.send(req.user);
});

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

router.post('/stripe', requireLogin, async (req, res) => {
  const charge = await stripe.charges.create({
    amount: 500,
    currency: 'usd',
    description: '$5 for 5 surveys',
    source: req.body.id
  });

  req.user.credits += 5;
  const user = await req.user.save();
  res.send(user);
});

module.exports = router;
