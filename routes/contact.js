// backend/routes/contact.js
const express = require('express');
const router = express.Router();
const { sendContact } = require('../controllers/contactController');
const verifyRecaptcha = require('../middleware/verifyRecaptcha');

router.post('/', verifyRecaptcha, sendContact);

module.exports = router;