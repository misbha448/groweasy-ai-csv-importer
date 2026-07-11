const env = require('../config/env');

const LOG_LEVELS = {
  ERROR: 'ERROR',
  WARN: 'WARN',
  INFO: 'INFO',
  DEBUG: 'DEBUG'
};

const shouldLog = (level) => {
  const levels = ['DEBUG', 'INFO', 'WARN', 'ERROR'];
  const currentLevel = env.NODE_ENV === 'production' ? 'INFO' : 'DEBUG';
  return levels.indexOf(level) >= levels.indexOf(currentLevel);
};

const formatLog = (level, message, data = {}) => {
  const timestamp = new Date().toISOString();
  return {
    timestamp,
    level,
    message,
    ...data
  };
};

const logger = {
  error: (message, data = {}) => {
    if (shouldLog(LOG_LEVELS.ERROR)) {
      console.error(JSON.stringify(formatLog(LOG_LEVELS.ERROR, message, data)));
    }
  },
  warn: (message, data = {}) => {
    if (shouldLog(LOG_LEVELS.WARN)) {
      console.warn(JSON.stringify(formatLog(LOG_LEVELS.WARN, message, data)));
    }
  },
  info: (message, data = {}) => {
    if (shouldLog(LOG_LEVELS.INFO)) {
      console.log(JSON.stringify(formatLog(LOG_LEVELS.INFO, message, data)));
    }
  },
  debug: (message, data = {}) => {
    if (shouldLog(LOG_LEVELS.DEBUG)) {
      console.log(JSON.stringify(formatLog(LOG_LEVELS.DEBUG, message, data)));
    }
  }
};

module.exports = logger;
