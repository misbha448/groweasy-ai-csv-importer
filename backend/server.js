require('dotenv').config();

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan');

const env = require('./config/env');
const logger = require('./utils/logger');
const uploadRoutes = require('./routes/uploadRoutes');
const healthRoutes = require('./routes/healthRoutes');
const chatRoutes = require('./routes/chatRoutes');
const rateLimiter = require('./middlewares/rateLimiter');
const errorHandler = require('./middlewares/errorHandler');

// Validate environment
try {
  env.validateEnv();
} catch (error) {
  logger.error('Environment validation failed', { message: error.message });
  process.exit(1);
}

const app = express();

// Security
app.use(helmet());

// Compression
app.use(compression());

// CORS
app.use(cors({
  origin: env.FRONTEND_URL,
  credentials: true
}));

// Logging
app.use(morgan('combined', {
  stream: {
    write: (message) => {
      logger.info('HTTP Request', { message: message.trim() });
    }
  }
}));

// Body parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// Rate limiting
app.use('/api/', rateLimiter);

// Routes
app.use('/api', healthRoutes);
app.use('/api', uploadRoutes);
app.use('/api', chatRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: {
      code: 'NOT_FOUND',
      message: 'Endpoint not found'
    }
  });
});

// Error handler (must be last)
app.use(errorHandler);

// Start server
const PORT = env.PORT || 3001;

app.listen(PORT, () => {
  logger.info(`🚀 Backend server running on port ${PORT}`, {
    environment: env.NODE_ENV,
    timestamp: new Date().toISOString()
  });
});

// Graceful shutdown
process.on('SIGTERM', () => {
  logger.info('SIGTERM received, shutting down gracefully...');
  process.exit(0);
});

process.on('SIGINT', () => {
  logger.info('SIGINT received, shutting down gracefully...');
  process.exit(0);
});

// Unhandled promise rejection
process.on('unhandledRejection', (reason, promise) => {
  logger.error('Unhandled Promise Rejection', {
    reason: String(reason),
    promise: String(promise)
  });
});

// Uncaught exception
process.on('uncaughtException', (error) => {
  logger.error('Uncaught Exception', { message: error.message, stack: error.stack });
  process.exit(1);
});

module.exports = app;
