const formatDate = (dateInput) => {
  if (!dateInput) return '';
  
  try {
    const date = new Date(dateInput);
    if (isNaN(date.getTime())) return '';
    
    return date.toISOString().split('T')[0]; // YYYY-MM-DD
  } catch {
    return '';
  }
};

const getCurrentDate = () => {
  return new Date().toISOString().split('T')[0];
};

module.exports = {
  formatDate,
  getCurrentDate
};
