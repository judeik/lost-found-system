const axios = require('axios');

const verifyRecaptcha = async (req, res, next) => {
  const token = req.body.recaptchaToken;
  if (!token) return res.status(400).json({ error: 'reCAPTCHA token missing' });

  try {
    const response = await axios.post(
      `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET}&response=${token}`
    );

    const score = response.data.score;
    const success = response.data.success;

    if (!success || score < 0.5) {
      return res.status(403).json({ error: 'Failed reCAPTCHA verification' });
    }

    next();
  } catch (err) {
    return res.status(500).json({ error: 'reCAPTCHA server error' });
  }
};

module.exports = verifyRecaptcha;
