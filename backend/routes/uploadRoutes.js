const express = require('express');
const { uploadCSV } = require('../controllers/uploadController');
const { uploadMiddleware, uploadErrorHandler } = require('../middlewares/uploadMiddleware');

const router = express.Router();

router.post(['/upload', '/csv/upload'], uploadMiddleware, uploadErrorHandler, uploadCSV);

module.exports = router;
