const parsePhone = (phoneStr) => {
  if (!phoneStr || typeof phoneStr !== 'string') {
    return { countryCode: '', mobile: '' };
  }

  const cleaned = phoneStr.replace(/\D/g, '');
  if (cleaned.length === 0) return { countryCode: '', mobile: '' };

  // Common country code patterns
  // +91 (India), +1 (US/Canada), +44 (UK), etc.
  let countryCode = '';
  let mobile = '';

  if (cleaned.startsWith('91')) {
    countryCode = '91';
    mobile = cleaned.slice(2);
  } else if (cleaned.startsWith('1') && cleaned.length > 10) {
    countryCode = '1';
    mobile = cleaned.slice(1);
  } else if (cleaned.startsWith('44') && cleaned.length > 10) {
    countryCode = '44';
    mobile = cleaned.slice(2);
  } else {
    // Default: assume last 10 digits as mobile
    mobile = cleaned.slice(-10);
    if (cleaned.length > 10) {
      countryCode = cleaned.slice(0, -10);
    }
  }

  return {
    countryCode: countryCode || '',
    mobile: mobile || cleaned
  };
};

const extractFirstPhone = (phones) => {
  if (!phones) return null;
  if (Array.isArray(phones) && phones.length > 0) {
    return phones[0];
  }
  if (typeof phones === 'string') {
    return phones;
  }
  return null;
};

const extractRemainingPhones = (phones) => {
  if (!phones || !Array.isArray(phones) || phones.length <= 1) {
    return [];
  }
  return phones.slice(1);
};

module.exports = {
  parsePhone,
  extractFirstPhone,
  extractRemainingPhones
};
