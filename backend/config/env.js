require('dotenv').config();

const requiredVars = ['GEMINI_API_KEY', 'PORT', 'NODE_ENV', 'FRONTEND_URL'];

const validateEnv = () => {
  const missing = requiredVars.filter(v => !process.env[v]);
  if (missing.length > 0) {
    throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
  }
};

module.exports = {
  GEMINI_API_KEY: process.env.GEMINI_API_KEY,
  PORT: process.env.PORT || 3001,
  NODE_ENV: process.env.NODE_ENV || 'development',
  FRONTEND_URL: process.env.FRONTEND_URL || 'http://localhost:3000',
  MAX_FILE_SIZE: process.env.MAX_FILE_SIZE || 20 * 1024 * 1024,
  BATCH_SIZE: parseInt(process.env.BATCH_SIZE) || 20,
  BATCH_TIMEOUT: parseInt(process.env.BATCH_TIMEOUT) || 30000,
  MAX_RETRIES: parseInt(process.env.MAX_RETRIES) || 2,
  RATE_LIMIT_WINDOW: parseInt(process.env.RATE_LIMIT_WINDOW) || 15 * 60 * 1000,
  RATE_LIMIT_MAX_REQUESTS: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100,
  validateEnv
};
