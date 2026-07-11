const COUNTRY_MAP = {
  'united states': 'US',
  'usa': 'US',
  'us': 'US',
  'india': 'IN',
  'united kingdom': 'UK',
  'uk': 'UK',
  'canada': 'CA',
  'australia': 'AU',
  'germany': 'DE',
  'france': 'FR',
  'japan': 'JP',
  'china': 'CN',
  'brazil': 'BR',
  'mexico': 'MX'
};

const parseCountry = (countryStr) => {
  if (!countryStr || typeof countryStr !== 'string') return '';
  
  const lower = countryStr.toLowerCase().trim();
  return COUNTRY_MAP[lower] || countryStr.trim();
};

module.exports = {
  parseCountry
};
