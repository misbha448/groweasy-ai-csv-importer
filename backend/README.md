# Backend Setup Guide

## Overview

Production-ready Express backend for the AI-powered CSV CRM Importer using Gemini AI.

## Installation

```bash
# Navigate to backend folder
cd backend

# Install dependencies
npm install
```

## Configuration

### 1. Get Your Gemini API Key

- Visit [Google AI Studio](https://aistudio.google.com/app/apikeys)
- Create a new API key
- Copy the key

### 2. Create `.env` File

```bash
cp .env.example .env
```

### 3. Paste Your API Key

Edit `.env` and replace `your_gemini_api_key_here` with your actual Gemini API key:

```env
GEMINI_API_KEY=AIza... (your actual key)
PORT=3001
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

## Running the Backend

### Development Mode

```bash
npm run dev
```

The server starts with hot reload via nodemon.

### Production Mode

```bash
npm start
```

## API Endpoints

### Health Check

```http
GET /api/health
```

Returns server status and uptime.

### Upload and Process CSV

```http
POST /api/upload
Content-Type: multipart/form-data

Body:
- file: <CSV file>
```

**Response:**

```json
{
  "success": true,
  "summary": {
    "total": 100,
    "processed": 98,
    "imported": 95,
    "skipped": 5,
    "processingTime": 5234
  },
  "records": ["...CRM records..."],
  "skippedRecords": []
}
```

## Project Structure

```text
backend/
|-- config/
|   |-- env.js              # Environment configuration
|   `-- gemini.js           # Gemini API setup
|-- constants/
|   |-- api.js              # HTTP codes and error codes
|   `-- crm.js              # CRM field definitions
|-- controllers/
|   `-- uploadController.js # Upload handler
|-- middlewares/
|   |-- errorHandler.js     # Error handling
|   |-- uploadMiddleware.js # File upload and validation
|   `-- rateLimiter.js      # Rate limiting
|-- prompts/
|   `-- geminiPrompt.js     # Gemini instruction prompt
|-- routes/
|   |-- uploadRoutes.js     # Upload endpoint
|   `-- healthRoutes.js     # Health check endpoint
|-- services/
|   |-- csvParser.js        # CSV parsing with PapaParse
|   |-- geminiService.js    # Gemini AI processing
|   `-- crmMapper.js        # Map and enrich CRM fields
|-- utils/
|   |-- logger.js           # Structured logging
|   |-- phoneParser.js      # Phone extraction
|   |-- emailParser.js      # Email extraction
|   |-- countryParser.js    # Country code mapping
|   `-- dateFormatter.js    # Date formatting
|-- validators/
|   |-- csvValidator.js     # CSV validation
|   `-- crmValidator.js     # CRM record validation
|-- server.js               # Express app entry point
|-- package.json            # Dependencies
|-- .env.example            # Environment template
`-- .env                    # Your actual configuration (gitignored)
```

## Features

- **CSV Parsing** - Robust PapaParse integration with quoted value support
- **Gemini Integration** - Intelligent field mapping with AI
- **Batch Processing** - 20 records per batch with retry logic
- **Error Handling** - Comprehensive error codes and messages
- **Rate Limiting** - Built-in request rate limiting
- **Security** - Helmet, CORS, file validation, and sanitization
- **Logging** - Structured JSON logging
- **Stateless** - No database required

## CRM Fields

- `created_at` - Record creation date
- `name` - Contact name
- `email` - Primary email
- `country_code` - Country code, such as 91, 1, or 44
- `mobile_without_country_code` - Phone without country code
- `company` - Company name
- `city` - City
- `state` - State or province
- `country` - Country
- `lead_owner` - Assigned owner
- `crm_status` - Status (`GOOD_LEAD_FOLLOW_UP`, `DID_NOT_CONNECT`, `BAD_LEAD`, `SALE_DONE`)
- `crm_note` - Additional notes
- `data_source` - Lead source
- `possession_time` - Possession date
- `description` - Description

## Processing Flow

```text
1. Receive CSV File
   |
2. Validate File (type, size)
   |
3. Parse CSV (PapaParse)
   |
4. Filter Records (email OR mobile required)
   |
5. Split into Batches (20 records each)
   |
6. Send to Gemini AI
   |
7. Parse JSON Response
   |
8. Map to CRM Fields
   |
9. Enrich Records (handle multiple phones/emails)
   |
10. Return Results
```

## Troubleshooting

### "GEMINI_API_KEY is missing"

- Make sure the `.env` file exists in the backend folder
- Verify the Gemini API key is pasted correctly
- Restart the server after updating `.env`

### "Port 3001 already in use"

- Change `PORT` in `.env` to another value, such as `3002`
- Or stop the process using port `3001`

### CSV not parsing

- Ensure the CSV is UTF-8 encoded
- Check that the file has headers
- Verify records have at least an email or mobile value

### Gemini API errors

- Check your API key quota on [Google Cloud Console](https://console.cloud.google.com/)
- Ensure the API is enabled for your project
- Check rate limits, such as 60 requests per minute on some free tiers

## Development Tips

### Adding New CRM Fields

1. Update `constants/crm.js` and add the field to `CRM_FIELDS`
2. Update `services/crmMapper.js` and add the field to `mapToCRM`
3. Update `prompts/geminiPrompt.js` and add the field to the instructions

### Customizing Gemini Prompt

Edit `prompts/geminiPrompt.js` to change how AI maps fields.

### Debugging

Set `NODE_ENV=development` to see debug logs:

```env
NODE_ENV=development
```

## Performance Notes

- Batch size: 20 records by default, adjustable via the `BATCH_SIZE` env var
- Processing time per batch: approximately 2-3 seconds
- For 1000 records: approximately 150-180 seconds, or about 3 minutes
- Rate limit: 100 requests per 15 minutes by default

## Security Checklist

- Helmet enabled for security headers
- CORS restricted to the frontend URL
- Rate limiting active
- File type validation
- File size limit of 20 MB by default
- No eval or dangerous functions
- Environment secrets stored in `.env`, not in code
- Error messages do not leak sensitive data

## Production Deployment

### Before Deploying

1. Set `NODE_ENV=production`
2. Update `FRONTEND_URL` to your domain
3. Generate a new Gemini API key for production
4. Increase `RATE_LIMIT_MAX_REQUESTS` if needed
5. Monitor logs in production

### Deploy Commands

```bash
# Build/verify
npm install

# Run
npm start
```

### Environment Variables for Production

```env
GEMINI_API_KEY=your_production_key
PORT=3001
NODE_ENV=production
FRONTEND_URL=https://yourdomain.com
RATE_LIMIT_MAX_REQUESTS=1000
```

## License

ISC

## Support

For issues or questions, check the main project README.
