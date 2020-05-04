const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const keys = require('../config/keys');
const stripe = require('stripe')(keys.stripeSecretKey);
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');

const Survey = mongoose.model('surveys');

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

router.post('/surveys', requireLogin, requireCredits, async (req, res) => {
  const { title, subject, body, recipients } = req.body;

  const survey = new Survey({
    title,
    subject,
    body,
    recipients: recipients.split(',').map(email => ({ email: email.trim() })),
    _user: req.user.id,
    dateSent: Date.now()
  });

  const mailer = new Mailer(survey, surveyTemplate(survey));

  try {
    const response = await mailer.send();

    await survey.save();

    req.user.credits -= 1;
    const user = await req.user.save();

    res.send(user);
  } catch (error) {
    res.status(422).send(err);
  }
});

router.get('/surveys/thanks', (req, res) => {
  res.send('Thanks for voting!');
});

module.exports = router;
