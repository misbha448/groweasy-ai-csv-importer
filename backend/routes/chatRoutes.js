const express = require('express');
const { chatWithAssistant } = require('../controllers/chatController');

const router = express.Router();

router.post('/chat', chatWithAssistant);

module.exports = router;
