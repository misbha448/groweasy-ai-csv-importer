const { GoogleGenAI } = require('@google/genai');
const env = require('./env');

const client = new GoogleGenAI({
  apiKey: env.GEMINI_API_KEY
});

const getClient = () => client;
const getModel = () => client;

module.exports = {
  client,
  getClient,
  getModel
};
