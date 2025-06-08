const summarizeService = require('../services/summarizeService');
const responseMessages = require('../constants/responseMessages');

exports.summarizeText = async (req, res) => {
  const { text, level = 'medium' } = req.body;
  
  if (!text) {
    return res.status(400).json({ error: responseMessages.TEXT_REQUIRED });
  }

  // Validate summarization level
  const validLevels = ['light', 'medium', 'extreme'];
  if (!validLevels.includes(level)) {
    return res.status(400).json({ 
      error: 'Invalid summarization level. Must be one of: light, medium, extreme' 
    });
  }

  const result = await summarizeService.summarizeText(text, level);
  res.json(result);
}; 