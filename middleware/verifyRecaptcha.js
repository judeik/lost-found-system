// middleware/verifyRecaptcha.js
const axios = require('axios');

const verifyRecaptcha = async (req, res, next) => {
  const token = req.body.recaptchaToken;
  if (!token) return res.status(400).json({ error: 'reCAPTCHA token missing' });

  try {
    const response = await axios.post(
      'https://www.google.com/recaptcha/api/siteverify',
      new URLSearchParams({
        secret: process.env.RECAPTCHA_SECRET,
        response: token
      }).toString(),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    );

    const { success, score } = response.data;

    if (!success || score < 0.5) {
      return res.status(403).json({ error: 'Failed reCAPTCHA verification' });
    }

    next();
  } catch (err) {
    console.error('reCAPTCHA error:', err.message);
    return res.status(500).json({ error: 'reCAPTCHA server error' });
  }
};

module.exports = verifyRecaptcha;
