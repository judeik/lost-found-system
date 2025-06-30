// backend/controller/contactController.js
const Contact = require('../models/contactModel');
const Newsletter = require('../models/newsletterModel');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendContact = async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  try {
    // Save to DB
    const newMessage = await Contact.create({ name, email, message });

    // Send Email
    await transporter.sendMail({
      from: `"${name}" <${email}>`,
      to: process.env.EMAIL_RECEIVER || process.env.EMAIL_USER,
      subject: 'New Contact Message',
      html: `
        <h3>New Message from ${name}</h3>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong><br/>${message}</p>
      `
    });

    res.status(200).json({ message: 'Message received successfully.' });
  } catch (err) {
    console.error('Contact form error:', err.message);
    res.status(500).json({ error: 'Server error. Please try again later.' });
  }
};

const subscribeNewsletter = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: 'Email is required.' });
  }

  try {
    const exists = await Newsletter.findOne({ email });
    if (exists) {
      return res.status(400).json({ error: 'Already subscribed.' });
    }

    const subscription = await Newsletter.create({ email });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_RECEIVER || process.env.EMAIL_USER,
      subject: 'New Newsletter Subscription',
      html: `<p>New subscriber: <strong>${email}</strong></p>`
    });

    res.status(200).json({ message: 'Subscribed successfully.' });
  } catch (err) {
    console.error('Newsletter subscription error:', err.message);
    res.status(500).json({ error: 'Server error. Please try again later.' });
  }
};

module.exports = { sendContact, subscribeNewsletter };
