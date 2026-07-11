const { parsePhone } = require('../utils/phoneParser');
const { extractFirstEmail, extractRemainingEmails } = require('../utils/emailParser');
const { parseCountry } = require('../utils/countryParser');
const { formatDate } = require('../utils/dateFormatter');
const { CRM_STATUS_OPTIONS, ALLOWED_DATA_SOURCES } = require('../constants/crm');

const mapToCRM = (record) => {
  if (!record || typeof record !== 'object') {
    return null;
  }

  const crmRecord = {
    created_at: formatDate(record.created_at) || '',
    name: record.name ? String(record.name).trim() : '',
    email: record.email ? String(record.email).toLowerCase().trim() : '',
    country_code: record.country_code ? String(record.country_code).trim() : '',
    mobile_without_country_code: record.mobile_without_country_code ? String(record.mobile_without_country_code).trim() : '',
    company: record.company ? String(record.company).trim() : '',
    city: record.city ? String(record.city).trim() : '',
    state: record.state ? String(record.state).trim() : '',
    country: record.country ? parseCountry(record.country) : '',
    lead_owner: record.lead_owner ? String(record.lead_owner).trim() : '',
    crm_status: record.crm_status && CRM_STATUS_OPTIONS.includes(String(record.crm_status).trim()) ? String(record.crm_status).trim() : '',
    crm_note: record.crm_note ? String(record.crm_note).trim() : '',
    data_source: record.data_source && ALLOWED_DATA_SOURCES.includes(String(record.data_source).trim()) ? String(record.data_source).trim() : '',
    possession_time: formatDate(record.possession_time) || '',
    description: record.description ? String(record.description).trim() : ''
  };

  return crmRecord;
};

const enrichRecord = (crmRecord) => {
  if (!crmRecord) return null;

  const enriched = { ...crmRecord };

  // Handle multiple phones (extract first, store rest in note)
  if (enriched.mobile_without_country_code && enriched.mobile_without_country_code.includes(',')) {
    const phones = enriched.mobile_without_country_code.split(',').map(p => p.trim());
    if (phones.length > 0) {
      enriched.mobile_without_country_code = phones[0];
      if (phones.length > 1) {
        const otherPhones = phones.slice(1).join(', ');
        enriched.crm_note = enriched.crm_note ? `${enriched.crm_note}; Other phones: ${otherPhones}` : `Other phones: ${otherPhones}`;
      }
    }
  }

  // Handle multiple emails (extract first, store rest in note)
  if (enriched.email && enriched.email.includes(',')) {
    const emails = enriched.email.split(',').map(e => e.trim());
    if (emails.length > 0) {
      enriched.email = emails[0];
      if (emails.length > 1) {
        const otherEmails = emails.slice(1).join(', ');
        enriched.crm_note = enriched.crm_note ? `${enriched.crm_note}; Other emails: ${otherEmails}` : `Other emails: ${otherEmails}`;
      }
    }
  }

  // Ensure created_at has a value
  if (!enriched.created_at) {
    enriched.created_at = new Date().toISOString().split('T')[0];
  }

  return enriched;
};

module.exports = {
  mapToCRM,
  enrichRecord
};
