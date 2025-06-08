const geminiService = require('./geminiService');

const SUMMARIZATION_LEVELS = {
  light: {
    description: 'light summary',
    instruction: 'Provide a light summary that captures the main points while keeping most details. The summary should be about 70% of the original length.',
    maxTokens: 1024
  },
  medium: {
    description: 'balanced summary',
    instruction: 'Provide a balanced summary that captures the key points and important details. The summary should be about 50% of the original length.',
    maxTokens: 768
  },
  extreme: {
    description: 'extremely concise summary',
    instruction: 'Provide an extremely concise summary that captures only the most essential points. The summary should be about 30% of the original length.',
    maxTokens: 512
  }
};

exports.summarizeText = async (text, level = 'medium') => {
  const levelConfig = SUMMARIZATION_LEVELS[level];
  
  if (!levelConfig) {
    throw new Error(`Invalid summarization level: ${level}`);
  }

  const prompt = `You are a precise text summarizer. Your task is to provide ONLY a ${levelConfig.description} of the following text. 
${levelConfig.instruction}
Do not include any explanations, introductions, or additional context. Provide ONLY the summary.
Do not include any markers, labels, or formatting. The response should be ONLY the summary text.

Text to summarize: ${text}

Summary:`;

  return await geminiService.callGeminiAPI(prompt);
}; 