const geminiService = require('./geminiService');

const TRANSLATION_INSTRUCTIONS = {
  format: 'Provide ONLY the translated text without any additional content, explanations, or formatting.',
  constraints: [
    'Do not include the original text',
    'Do not add any notes or explanations',
    'Do not include any markers or labels',
    'Do not add any context or commentary',
    'Maintain the original tone and formality',
    'Preserve any proper nouns or names',
    'Keep any numbers or special characters as is',
    'Maintain any formatting (like line breaks) if present'
  ]
};

exports.translateText = async (text, language) => {
  const prompt = `You are a precise translator. Your task is to translate the following text to ${language}.

${TRANSLATION_INSTRUCTIONS.format}

Constraints:
${TRANSLATION_INSTRUCTIONS.constraints.map(constraint => `- ${constraint}`).join('\n')}

Text to translate: ${text}

Translation:`;

  return await geminiService.callGeminiAPI(prompt);
}; 