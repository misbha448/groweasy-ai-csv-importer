const { CRM_STATUS_OPTIONS, ALLOWED_DATA_SOURCES, CRM_FIELDS } = require('../constants/crm');

const generateGeminiPrompt = (csvRecords) => {
  const recordsJson = JSON.stringify(csvRecords.slice(0, 20), null, 2);

  return `You are a CSV data extraction and CRM field mapping expert.

Your task is to intelligently extract and map CSV data into CRM fields. The CSV may have arbitrary column names that you must interpret intelligently.

INPUT CSV Records (sample):
${recordsJson}

TARGET CRM FIELDS:
${CRM_FIELDS.join(', ')}

ALLOWED CRM STATUS VALUES:
${CRM_STATUS_OPTIONS.join(', ')}

ALLOWED DATA SOURCES:
${ALLOWED_DATA_SOURCES.join(', ')}
(If source is not in the list, leave data_source blank)

INSTRUCTIONS:
1. Analyze the CSV structure and column names
2. Map each record intelligently to CRM fields
3. Never hallucinate values - only extract what exists in the source data
4. For unmapped or unknown fields, leave them blank (empty string)
5. Handle multiple emails/phones by keeping first and storing rest in crm_note
6. Validate CRM status values - only use allowed values
7. Return ONLY valid JSON array with no markdown, no explanation, no wrapping
8. Each object must have all CRM fields (use empty string for missing values)
9. Ensure JSON is parseable - no syntax errors

EXAMPLE OUTPUT FORMAT:
[
  {
    "created_at": "2024-01-15",
    "name": "John Doe",
    "email": "john@example.com",
    "country_code": "91",
    "mobile_without_country_code": "9876543210",
    "company": "Tech Corp",
    "city": "New York",
    "state": "NY",
    "country": "US",
    "lead_owner": "sales_team",
    "crm_status": "GOOD_LEAD_FOLLOW_UP",
    "crm_note": "Additional notes",
    "data_source": "leads_on_demand",
    "possession_time": "2024-01-15",
    "description": "Lead description"
  }
]

Now process the CSV records and return the mapped CRM data as JSON:`;
};

module.exports = {
  generateGeminiPrompt
};
