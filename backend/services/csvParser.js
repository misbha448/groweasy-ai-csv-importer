const Papa = require('papaparse');
const logger = require('../utils/logger');
const { ERROR_CODES } = require('../constants/api');

const parseCSV = async (fileBuffer) => {
  return new Promise((resolve, reject) => {
    try {
      const csvText = fileBuffer.toString('utf-8');

      Papa.parse(csvText, {
        header: true,
        skipEmptyLines: true,
        dynamicTyping: false,
        transformHeader: (header) => header.replace(/^\uFEFF/, ''),
        complete: (results) => {
          if (results.errors && results.errors.length > 0) {
            logger.warn('CSV parse errors', { errors: results.errors });
            reject(new Error(results.errors[0].message || 'Invalid CSV file'));
            return;
          }

          const records = (results.data || []).filter((row) => (
            row && Object.values(row).some((value) => String(value ?? '').trim() !== '')
          ));

          resolve({
            records,
            columnNames: results.meta.fields || [],
            metadata: {
              rowCount: records.length,
              columnCount: results.meta.fields?.length || 0,
              delimiter: results.meta.delimiter || ',',
              truncated: Boolean(results.meta.truncated)
            }
          });
        },
        error: (error) => {
          reject(error);
        }
      });
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  parseCSV
};
