const { generateChatResponse } = require('../services/geminiService');
const { HTTP_STATUS } = require('../constants/api');

const CHAT_ERROR_STATUS = {
  GEMINI_AUTH_ERROR: HTTP_STATUS.SERVICE_UNAVAILABLE,
  GEMINI_RATE_LIMITED: 429,
  GEMINI_TIMEOUT: HTTP_STATUS.SERVICE_UNAVAILABLE,
  GEMINI_ERROR: HTTP_STATUS.SERVICE_UNAVAILABLE
};

const chatWithAssistant = async (req, res) => {
  const message = typeof req.body?.message === 'string' ? req.body.message.trim() : '';

  if (!message) {
    return res.status(HTTP_STATUS.BAD_REQUEST).json({
      success: false,
      error: {
        code: 'EMPTY_MESSAGE',
        message: 'Please enter a message before sending.'
      }
    });
  }

  try {
    const reply = await generateChatResponse(message);

    return res.json({
      success: true,
      reply
    });
  } catch (error) {
    const statusCode = CHAT_ERROR_STATUS[error.code] || HTTP_STATUS.SERVICE_UNAVAILABLE;

    return res.status(statusCode).json({
      success: false,
      error: {
        code: error.code || 'GEMINI_ERROR',
        message: error.message || "Sorry, I'm unable to reach Gemini right now. Please try again in a moment."
      }
    });
  }
};

module.exports = {
  chatWithAssistant
};
