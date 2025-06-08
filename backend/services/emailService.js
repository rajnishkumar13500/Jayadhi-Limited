const geminiService = require('./geminiService');

const EMAIL_TYPES = {
  formal: {
    tone: 'professional and formal',
    structure: 'traditional business email format',
    salutation: 'formal greeting',
    closing: 'formal closing'
  },
  informal: {
    tone: 'casual and friendly',
    structure: 'relaxed format',
    salutation: 'casual greeting',
    closing: 'casual closing'
  },
  urgent: {
    tone: 'direct and time-sensitive',
    structure: 'concise format',
    salutation: 'brief greeting',
    closing: 'brief closing'
  }
};

const EMAIL_INSTRUCTIONS = {
  format: 'Generate a complete email with proper formatting and structure.',
  constraints: [
    'Include all necessary email components (greeting, body, closing)',
    'Maintain appropriate tone throughout',
    'Use proper email formatting',
    'Include signature if provided',
    'Keep the content clear and concise',
    'Ensure proper spacing and paragraph breaks'
  ]
};

exports.generateEmail = async ({
  subject,
  body,
  sender,
  receiver,
  type = 'formal',
  signature = '',
  priority = 'normal',
  attachments = []
}) => {
  // Validate email type
  if (!EMAIL_TYPES[type]) {
    throw new Error(`Invalid email type. Must be one of: ${Object.keys(EMAIL_TYPES).join(', ')}`);
  }

  const emailType = EMAIL_TYPES[type];
  const prompt = `You are a professional email writer. Generate a ${type} email with the following specifications:

${EMAIL_INSTRUCTIONS.format}

Email Type: ${type}
Tone: ${emailType.tone}
Structure: ${emailType.structure}

Constraints:
${EMAIL_INSTRUCTIONS.constraints.map(constraint => `- ${constraint}`).join('\n')}

Email Details:
- Subject: ${subject}
- From: ${sender}
- To: ${receiver}
- Priority: ${priority}
${attachments.length ? `- Attachments: ${attachments.join(', ')}` : ''}
${signature ? `- Signature: ${signature}` : ''}

Body Content: ${body}

Generate a complete email that follows these specifications. Include all necessary components while maintaining the specified tone and structure.`;

  return await geminiService.callGeminiAPI(prompt);
}; 