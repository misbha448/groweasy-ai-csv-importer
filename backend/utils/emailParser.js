const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const isValidEmail = (email) => {
  if (!email || typeof email !== 'string') return false;
  return emailRegex.test(email.toLowerCase().trim());
};

const extractFirstEmail = (emails) => {
  if (!emails) return null;
  if (Array.isArray(emails)) {
    const validEmail = emails.find(e => isValidEmail(e));
    return validEmail || null;
  }
  if (typeof emails === 'string' && isValidEmail(emails)) {
    return emails;
  }
  return null;
};

const extractRemainingEmails = (emails) => {
  if (!emails || !Array.isArray(emails) || emails.length <= 1) {
    return [];
  }
  return emails.slice(1).filter(e => isValidEmail(e));
};

module.exports = {
  isValidEmail,
  extractFirstEmail,
  extractRemainingEmails
};
