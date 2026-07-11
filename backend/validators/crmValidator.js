const { CRM_FIELDS } = require('../constants/crm');

const validateCRMRecord = (record) => {
  if (typeof record !== 'object' || record === null) {
    return { valid: false };
  }

  const hasRequiredFields = CRM_FIELDS.some(field => record[field] !== undefined && record[field] !== null);
  
  return { valid: hasRequiredFields };
};

const sanitizeCRMRecord = (record) => {
  const sanitized = {};

  CRM_FIELDS.forEach(field => {
    const value = record[field];
    if (value !== undefined && value !== null) {
      sanitized[field] = String(value).trim();
    } else {
      sanitized[field] = '';
    }
  });

  return sanitized;
};

module.exports = {
  validateCRMRecord,
  sanitizeCRMRecord
};
