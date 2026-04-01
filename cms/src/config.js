// Central API configuration - change REACT_APP_API_URL in .env to update everywhere
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001';
export const API = `${API_BASE_URL}/api`;
export const IMAGE_BASE_URL = API_BASE_URL;
export default API;
