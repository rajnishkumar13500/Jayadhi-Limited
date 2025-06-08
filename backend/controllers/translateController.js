const translateService = require('../services/translateService');
const responseMessages = require('../constants/responseMessages');

exports.translateText = async (req, res) => {
  const { text, language } = req.body;
  if (!text || !language) {
    return res.status(400).json({ error: responseMessages.TEXT_AND_LANGUAGE_REQUIRED });
  }
  const result = await translateService.translateText(text, language);
  res.json(result);
}; 