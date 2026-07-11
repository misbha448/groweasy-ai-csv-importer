/**
 * API Client
 * Centralized API communication layer
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

function getApiBase(baseURL) {
  if (!baseURL) {
    throw new Error('NEXT_PUBLIC_API_URL is not configured.');
  }

  const normalizedBase = baseURL.replace(/\/$/, '');
  return normalizedBase.endsWith('/api') ? normalizedBase : `${normalizedBase}/api`;
}

class APIClient {
  constructor(baseURL = API_BASE_URL) {
    this.baseURL = getApiBase(baseURL);
    this.timeout = 30000;
  }

  /**
   * Get authorization token
   * @returns {string|null}
   */
  getAuthToken() {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('authToken');
    }
    return null;
  }

  /**
   * Make HTTP request
   * @param {string} endpoint - API endpoint
   * @param {Object} options - Request options
   * @returns {Promise}
   */
  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const token = this.getAuthToken();

    const headers = {
      'Content-Type': 'application/json',
      ...options.headers
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const config = {
      ...options,
      headers,
      signal: AbortSignal.timeout(this.timeout)
    };

    try {
      const response = await fetch(url, config);

      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error(`API Request Failed: ${error.message}`);
      throw error;
    }
  }

  /**
   * GET request
   * @param {string} endpoint - API endpoint
   * @param {Object} options - Request options
   * @returns {Promise}
   */
  get(endpoint, options = {}) {
    return this.request(endpoint, {
      method: 'GET',
      ...options
    });
  }

  /**
   * POST request
   * @param {string} endpoint - API endpoint
   * @param {Object} data - Request body
   * @param {Object} options - Request options
   * @returns {Promise}
   */
  post(endpoint, data, options = {}) {
    return this.request(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
      ...options
    });
  }

  /**
   * PUT request
   * @param {string} endpoint - API endpoint
   * @param {Object} data - Request body
   * @param {Object} options - Request options
   * @returns {Promise}
   */
  put(endpoint, data, options = {}) {
    return this.request(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
      ...options
    });
  }

  /**
   * DELETE request
   * @param {string} endpoint - API endpoint
   * @param {Object} options - Request options
   * @returns {Promise}
   */
  delete(endpoint, options = {}) {
    return this.request(endpoint, {
      method: 'DELETE',
      ...options
    });
  }

  /**
   * Upload file
   * @param {string} endpoint - API endpoint
   * @param {File} file - File to upload
   * @param {Object} options - Request options
   * @returns {Promise}
   */
  async uploadFile(endpoint, file, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const token = this.getAuthToken();

    const formData = new FormData();
    formData.append('file', file);

    const headers = { ...options.headers };
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers,
        body: formData,
        signal: AbortSignal.timeout(this.timeout),
        ...options
      });

      if (!response.ok) {
        throw new Error(`Upload failed: ${response.status} ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error(`Upload failed: ${error.message}`);
      throw error;
    }
  }
}

// Export singleton instance
export const apiClient = new APIClient();

export default APIClient;
