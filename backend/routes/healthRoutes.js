const express = require('express');

const router = express.Router();

const startTime = Date.now();

router.get('/health', (req, res) => {
  const uptime = Date.now() - startTime;
  res.json({
    status: 'ok',
    uptime,
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

module.exports = router;
