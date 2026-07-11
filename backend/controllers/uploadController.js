const logger = require('../utils/logger');
const { validateFile, validateCSVData, validateRequiredFields } = require('../validators/csvValidator');
const { validateCRMRecord, sanitizeCRMRecord } = require('../validators/crmValidator');
const { parseCSV } = require('../services/csvParser');
const { processBatches } = require('../services/geminiService');
const { mapToCRM, enrichRecord } = require('../services/crmMapper');
const { HTTP_STATUS, ERROR_CODES } = require('../constants/api');

const uploadCSV = async (req, res, next) => {
  try {
    const startTime = Date.now();
    const file = req.file;

    // Validate file
    const fileValidation = validateFile(file);
    if (!fileValidation.valid) {
      const error = new Error(fileValidation.message);
      error.code = fileValidation.error;
      error.statusCode = HTTP_STATUS.BAD_REQUEST;
      throw error;
    }

    // Parse CSV
    let csvData;
    try {
      csvData = await parseCSV(file.buffer);
    } catch (error) {
      const err = new Error(`Failed to parse CSV: ${error.message}`);
      err.code = ERROR_CODES.CSV_PARSE_ERROR;
      err.statusCode = HTTP_STATUS.BAD_REQUEST;
      throw err;
    }

    // Validate CSV data
    const csvValidation = validateCSVData(csvData.records);
    if (!csvValidation.valid) {
      const error = new Error(csvValidation.message);
      error.code = csvValidation.error;
      error.statusCode = HTTP_STATUS.BAD_REQUEST;
      throw error;
    }

    logger.info('CSV parsed successfully', {
      fileName: file.originalname,
      recordCount: csvData.records.length,
      columnCount: csvData.columnNames.length
    });

    logger.info(`Processing ${csvData.records.length} records with AI mapping`, {
      headers: csvData.columnNames
    });

    // Process batches with Gemini
    const batchResults = await processBatches(csvData.records);

    // Map to CRM fields and enrich
    const mappedCandidates = batchResults.processedRecords
      .map(mapToCRM)
      .map(enrichRecord)
      .filter(Boolean);

    const mappedRecords = [];
    const skippedRecords = [];

    mappedCandidates.forEach((record, index) => {
      const sanitizedRecord = sanitizeCRMRecord(record);
      const validation = validateRequiredFields(sanitizedRecord);

      if (validation.valid) {
        mappedRecords.push(sanitizedRecord);
        return;
      }

      skippedRecords.push({
        originalData: csvData.records[index] || record,
        mappedData: sanitizedRecord,
        reason: validation.reason || 'Missing required fields after AI mapping'
      });
    });

    // Build skipped records list
    batchResults.skippedBatches.forEach(batch => {
      batch.records.forEach(record => {
        skippedRecords.push({
          originalData: record,
          reason: `Batch processing failed: ${batch.error}`
        });
      });
    });

    const processingTime = Date.now() - startTime;

    logger.info('Processing complete', {
      total: csvData.records.length,
      imported: mappedRecords.length,
      skipped: skippedRecords.length,
      processingTime
    });

    res.json({
      success: true,
      summary: {
        totalRows: csvData.records.length,
        processedRows: batchResults.processedRecords.length,
        importedRows: mappedRecords.length,
        skippedRows: skippedRecords.length,
        total: csvData.records.length,
        processed: batchResults.processedRecords.length,
        imported: mappedRecords.length,
        skipped: skippedRecords.length,
        processingTime
      },
      records: mappedRecords,
      skippedRecords
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  uploadCSV
};
