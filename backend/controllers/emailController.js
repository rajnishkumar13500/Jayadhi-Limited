const emailService = require('../services/emailService');
const responseMessages = require('../constants/responseMessages');

exports.generateEmail = async (req, res) => {
  const {
    subject,
    body,
    sender,
    receiver,
    type,
    signature,
    priority,
    attachments
  } = req.body;

  // Validate required fields
  if (!subject || !body || !sender || !receiver) {
    return res.status(400).json({
      error: 'Missing required fields. Subject, body, sender, and receiver are required.'
    });
  }

  try {
    const result = await emailService.generateEmail({
      subject,
      body,
      sender,
      receiver,
      type,
      signature,
      priority,
      attachments
    });
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}; 