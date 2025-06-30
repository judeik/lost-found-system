// backend/routes/newsletter.js
const express = require('express');
const router = express.Router();
const { subscribeNewsletter } = require('../controllers/contactController');
const verifyRecaptcha = require('../middleware/verifyRecaptcha');

router.post('/', verifyRecaptcha, subscribeNewsletter);

module.exports = router;